/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "radio4ebchinese-org",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "cloudflare",
    };
  },
  async run() {
    new sst.cloudflare.StaticSiteV2("Site", {
      build: {
        command: "pnpm build",
        output: "out",
      },
      notFound: "404",
      domain:
        $app.stage === "production"
          ? { name: "www.radio4ebchinese.org", redirects: ["radio4ebchinese.org"] }
          : undefined,
    });
  },
});
