import express from 'express';
import multer from 'multer';
import { uploadFileToBlob } from '../services/uploadFileToBlob.js';

const router = express.Router();
const upload = multer();

router.post(
  "/upload/text",
  [express.json({ limit: "1mb" }), express.text({ type: "text/*", limit: "1mb" })],
  async (req, res) => {
    try {
      const payloadString =
        typeof req.body === "string" ? req.body : JSON.stringify(req.body ?? {}, null, 2);

      const out = await uploadFileToBlob({
        containerName: process.env.BLOB_CONTAINER,
        data: payloadString,
        contentType: req.get("content-type") || "text/plain; charset=utf-8",
        userEmail: req.get("user-email") || "guest@local",
        subfolder: "in",
        fileName:
          req.is("application/json")
            ? `payload-${Date.now()}.json`
            : `payload-${Date.now()}.txt`,
      });

      res.json(out);
    } catch (e) {
      res.status(503).json({ ok: false, error: e.message });
    }
  }
);

export default router;