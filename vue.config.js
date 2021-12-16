module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias.set("vue", "@vue/compat");

    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => {
        return {
          ...options,
          compilerOptions: {
            compatConfig: {
              MODE: 2,
            },
          },
        };
      });
  },
  configureWebpack: {
    devtool: "source-map",
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8888", // target host
        ws: true, // proxy websockets
        changeOrigin: true, // needed for virtual hosted sites
      },
    },
  },
};
