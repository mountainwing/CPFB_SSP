// server/src/server.js
import express from "express";
import "dotenv/config";
import { BlobServiceClient } from "@azure/storage-blob";

const app = express();
const PORT = process.env.PORT || 3001;

// (you already have the light check)
app.get("/health/storage", async (_req, res) => {
  try {
    const container = process.env.BLOB_CONTAINER;
    const conn = process.env.AZURE_STORAGE_CONNECTION_STRING;
    const bsc = BlobServiceClient.fromConnectionString(conn);
    const cc = bsc.getContainerClient(container);
    await cc.createIfNotExists();
    const props = await cc.getProperties();
    res.json({
      ok: true,
      container,
      publicAccess: props.blobPublicAccess ?? "private",
      lastModified: props.lastModified,
    });
  } catch (e) {
    res.status(503).json({ ok: false, error: e.message, code: e.code, statusCode: e.statusCode });
  }
});

// ✅ deep check: write + delete a tiny blob
app.get("/health/storage/deep", async (_req, res) => {
  try {
    const container = process.env.BLOB_CONTAINER;
    const conn = process.env.AZURE_STORAGE_CONNECTION_STRING;

    if (!container || !conn) throw new Error("Missing BLOB_CONTAINER or AZURE_STORAGE_CONNECTION_STRING");

    const bsc = BlobServiceClient.fromConnectionString(conn);
    const cc = bsc.getContainerClient(container);
    await cc.createIfNotExists();

    const name = `healthchecks/${Date.now()}.txt`;
    const blob = cc.getBlockBlobClient(name);

    await blob.uploadData(Buffer.from("ok"), {
      blobHTTPHeaders: { blobContentType: "text/plain; charset=utf-8" },
    });

    const uploaded = await blob.exists();
    // await blob.delete();

    res.json({
      ok: true,
      container,
      uploadedUrl: blob.url,
      uploaded,
      cleanedUp: true,
    });
  } catch (e) {
    res.status(503).json({ ok: false, error: e.message, code: e.code, statusCode: e.statusCode });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
