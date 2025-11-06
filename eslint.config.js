import config from "@christopherjbaker/eslint-config/base-strict"

export default [
  ...config,
  {
    rules: {
      "no-console": "off",
    },
  },
]
