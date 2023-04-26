module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport-z8": {
      unitToConvert: "px",
      viewportWidth: 750,
      unitPrecision: 3,
      propList: ["*"],
      viewportUnit: "vw",
      fontViewportUnit: "vw",
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: undefined,
      include: undefined,
      landscape: false
    }
  }
};
