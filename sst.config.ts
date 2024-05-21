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
      // npx sst secrets set DATABASE_URL <connection string> --stage production
      const DATABASE_URL = new Config.Secret(stack, "DATABASE_URL");
      const SECRET_VAL = new Config.Secret(stack, "SECRET_VAL");
      const site = new NextjsSite(stack, "site", {
        bind: [DATABASE_URL, SECRET_VAL],
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
