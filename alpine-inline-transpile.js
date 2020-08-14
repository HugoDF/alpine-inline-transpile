const {transformSync} = require('@swc/core');

const isXAttr = (attr) => {
  return attr.startsWith(':') || attr.startsWith('@') || attr.startsWith('x-');
};

module.exports = function (options) {
  const config = options || {};

  const buildConfig = {
    isModule: false,
    minify: config.minify || false,
    jsc: {
      target: config.target || 'es5'
    }
  };

  return (tree) => {
    tree.walk((node) => {
      const {attrs} = node;
      const newAttrs = {...attrs};
      if (attrs) {
        Object.entries(attrs).forEach(([attr, attrValue]) => {
          if (!isXAttr(attr)) return;
          if (attr === 'x-data') {
            // Need to hack to hack around the fact that "{ foo: 'bar' }" looks
            // like a statement and Babel tries to put a `;` after the property.
            const jsString = `__alpine=${attrValue}`;
            const outputJs = transformSync(
              jsString,
              buildConfig
            ).code.trimEnd();
            newAttrs[attr] = outputJs.replace(/(__alpine)\s*=\s*/, '');
          } else {
            newAttrs[attr] = transformSync(
              attrValue,
              buildConfig
            ).code.trimEnd();
          }
        });
        node.attrs = newAttrs;
      }

      return node;
    });
  };
};
