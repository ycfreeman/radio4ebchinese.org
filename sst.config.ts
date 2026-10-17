/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "radio4ebchinese-org",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "cloudflare",
      providers: {
        cloudflare: "6.22.1",
      },
    };
  },
  async run() {
    const production = $app.stage === "production";

    new sst.cloudflare.StaticSiteV2("Site", {
      build: {
        command: "pnpm build",
        output: "out",
      },
      notFound: "404",
      domain: production ? "www.radio4ebchinese.org" : undefined,
    });

    if (!production) return;

    // SST's `domain.redirects` uses Page Rules, which reject account-owned API tokens.
    const zone = cloudflare.getZoneOutput({ filter: { name: "radio4ebchinese.org" } });

    new cloudflare.DnsRecord("ApexRecord", {
      zoneId: zone.id,
      name: "radio4ebchinese.org",
      type: "AAAA",
      content: "100::",
      proxied: true,
      ttl: 1,
    });

    new cloudflare.Ruleset("Redirects", {
      zoneId: zone.id,
      name: "Redirects",
      kind: "zone",
      phase: "http_request_dynamic_redirect",
      rules: [
        {
          action: "redirect",
          expression: 'http.host eq "radio4ebchinese.org"',
          actionParameters: {
            fromValue: {
              statusCode: 301,
              targetUrl: {
                expression: 'concat("https://www.radio4ebchinese.org", http.request.uri.path)',
              },
              preserveQueryString: true,
            },
          },
        },
        {
          action: "redirect",
          expression: "not ssl",
          actionParameters: {
            fromValue: {
              statusCode: 301,
              targetUrl: {
                expression: 'concat("https://", http.host, http.request.uri.path)',
              },
              preserveQueryString: true,
            },
          },
        },
      ],
    });
  },
});
