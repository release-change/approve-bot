import type { AppConfig } from "./types.js";

import { createServer } from "node:http";
import { env } from "node:process";

import { config, port } from "./config.js";
import { handleWebhook } from "./handler/handle-webhook.js";

createServer(async (request, response) => {
  if (request.method !== "POST" || !request.url?.match(/^\/api\/webhook\/approve(-\d)?$/g)) {
    response.writeHead(404).end();
    return;
  }
  try {
    const chunks: Buffer[] = [];
    for await (const chunk of request) chunks.push(chunk);
    const rawBody = Buffer.concat(chunks).toString("utf-8");
    const headers: Record<string, string | undefined> = {};
    for (const [key, value] of Object.entries(request.headers)) {
      headers[key] = Array.isArray(value) ? value[0] : value;
    }
    const approve2AppId = env.APP_ID_2 ?? "";
    const approve2PrivateKey = env.PRIVATE_KEY_2?.replace(/\\n/g, "\n") ?? "";
    const botConfig: AppConfig =
      request.url === "/api/webhook/approve-2"
        ? { ...config, appId: approve2AppId, privateKey: approve2PrivateKey }
        : config;
    const result = await handleWebhook(botConfig, headers, rawBody);
    response.writeHead(result.status, { "Content-Type": "application/json" });
    response.end(JSON.stringify(result.message));
  } catch (error) {
    const errorReporting = error instanceof Error ? error.message : "Unknown error";
    console.error("Internal server error:", errorReporting);
    response.writeHead(500, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ error: errorReporting }));
  }
}).listen(port, () => {
  console.log(`App ${config.appId} listening on port ${port}`);
});
