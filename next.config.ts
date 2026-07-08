import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

// Rende disponibili i binding di Cloudflare (es. il database D1) durante
// `next dev`, così l'app funziona in locale come su Workers.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
