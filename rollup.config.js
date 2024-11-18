import lwc from "@lwc/rollup-plugin";
import replace from "@rollup/plugin-replace";

export default {
  input: "src/main.js",

  output: {
    file: "dist/main.js",
    format: "esm",
  },

  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify('production'),
      preventAssignment: true
    }),
    lwc(),
  ],
};
