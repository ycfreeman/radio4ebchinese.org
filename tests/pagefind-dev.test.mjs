import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import pagefindDevServer from "../src/lib/pagefind-dev.mjs";

async function request(handler, url) {
  const res = {
    headers: {},
    setHeader: (k, v) => (res.headers[k] = v),
    end: (b) => (res.body = b),
  };
  let nextCalled = false;
  await handler({ url }, res, () => (nextCalled = true));
  return { res, nextCalled };
}

test("dev server serves the built Pagefind bundle and nothing outside it", async () => {
  const dir = await mkdtemp(join(tmpdir(), "pagefind-dev-"));
  await mkdir(join(dir, "pagefind"));
  await writeFile(join(dir, "pagefind", "pagefind-component-ui.css"), "a{}");
  await writeFile(join(dir, "secret.txt"), "no");
  let handler;
  pagefindDevServer(join(dir, "pagefind")).configureServer({
    middlewares: { use: (_, h) => (handler = h) },
  });

  const css = await request(handler, "/pagefind-component-ui.css?v=1");
  assert.equal(css.res.body.toString(), "a{}");
  assert.equal(css.res.headers["Content-Type"], "text/css");

  assert.equal((await request(handler, "/../secret.txt")).nextCalled, true);
  assert.equal((await request(handler, "/%2e%2e/secret.txt")).nextCalled, true);
  assert.equal((await request(handler, "/missing.js")).nextCalled, true);
});
