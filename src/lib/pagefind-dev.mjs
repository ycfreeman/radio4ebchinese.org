import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";

const contentTypes = { ".css": "text/css", ".js": "text/javascript", ".json": "application/json" };

// astro dev never runs Pagefind, so serve the bundle from the last build.
export default function pagefindDevServer(dir = "out/pagefind") {
  const root = resolve(dir);
  return {
    name: "pagefind-dev-server",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/pagefind", async (req, res, next) => {
        try {
          const path = resolve(root, `.${decodeURIComponent(req.url.split("?")[0])}`);
          if (!path.startsWith(root + sep)) return next();
          const body = await readFile(path);
          res.setHeader("Content-Type", contentTypes[extname(path)] ?? "application/octet-stream");
          res.end(body);
        } catch {
          next();
        }
      });
    },
  };
}
