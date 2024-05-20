import { SSTConfig } from "sst";
import { Config, NextjsSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "neon-next-aws",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      // Must create a secret (parameter store) first, such as:
      // npx sst secrets set SECRET_VAL something_hidden --stage production
      const SECRET_VAL = new Config.Secret(stack, "SECRET_VAL");
      const site = new NextjsSite(stack, "site", {
        bind: [SECRET_VAL],
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
