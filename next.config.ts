import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  /* config options here */
};

export default withContentCollections(nextConfig);
