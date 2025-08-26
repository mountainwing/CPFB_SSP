import { BlobServiceClient } from "@azure/storage-blob";

let _bsc;

//initialize blob service client with managed identity
export function getBlobServiceClient() {
  if (_bsc) return _bsc;

  const cs = process.env.AZURE_STORAGE_CONNECTION_STRING;
  if (cs) {
    if (cs.includes("DefaultEndpointsProtocol=https://")) {
      throw new Error("Invalid connection string: use 'https' (no ://) for DefaultEndpointsProtocol");
    }
    _bsc = BlobServiceClient.fromConnectionString(cs);
    return _bsc;
  }
}

export async function uploadFileToBlob({
    containerName, 
    data, 
    contentType = "application/octet-stream", 
    userEmail = "anonymous", 
    subfolder = "in", 
    fileName = `${Date.now()}.bin`,
    }) {

    //if container and data does not exist, throw error
    if (!containerName) throw new Error("Missing env BLOB_CONTAINER");
    if (data == null) throw new Error("data is required");

    const bsc = await getBlobServiceClient();
    const cc = bsc.getContainerClient(containerName);
    await cc.createIfNotExists();

    // sanitize path parts
    const safeEmail = String(userEmail).replace(/[^\w.@-]/g, "_");
    const safeSub   = String(subfolder).replace(/[^\w.\-]/g, "_");
    const safeName  = String(fileName).replace(/[^\w.\-]/g, "_");

    // create blob path
    const blobPath = `user_folder/${safeEmail}/${safeSub}/${safeName}`;
    const blob = cc.getBlockBlobClient(blobPath);

    console.log(`Uploading to blob path: ${blob}`);

    // choose stream vs buffer upload
    const isStream = typeof data?.pipe === "function";

    try {
        if (isStream) {
            const bufferSize = 4 * 1024 * 1024; // 4MB
            const maxConcurrency = 5;               // parallel buffers
            await blob.uploadStream(data, bufferSize, maxConcurrency, {
                blobHTTPHeaders: { blobContentType: contentType },
                metadata: { uploadedBy: safeEmail },
            });
        } else {
            const buf = Buffer.isBuffer(data) ? data : Buffer.from(String(data));
            await blob.uploadData(buf, {
                blobHTTPHeaders: { blobContentType: contentType },
                metadata: { uploadedBy: safeEmail },
            });
        }
        console.log(`Uploaded to : ${blob.url}`);
        return { ok: true, url: blob.url, path: blobPath };
    } catch (e) {
        console.error("Upload failed:", e.message);
        throw e;
    }
}
