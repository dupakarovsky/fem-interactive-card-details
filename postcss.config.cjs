const postcssJitProps = require("postcss-jit-props");
const OpenProps = require("open-props");
const autoprefixer = require("autoprefixer");
const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
   plugins: [
      postcssJitProps(OpenProps),
      autoprefixer,
      postcssPresetEnv({ stage: 0, features: { "nesting-rules": true } }),
   ],
};
