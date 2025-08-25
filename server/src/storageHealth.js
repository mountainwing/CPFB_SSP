// backend/src/storageHealth.js
import { BlobServiceClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";

// Returns a BlobServiceClient using either a connection string or Managed Identity
export async function getBlobServiceClient() {
  if (process.env.AZURE_STORAGE_CONNECTION_STRING) {
    return BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
  }
  const account = process.env.AZURE_STORAGE_ACCOUNT_NAME; // for Managed Identity
  if (!account) {
    throw new Error("Set AZURE_STORAGE_CONNECTION_STRING or AZURE_STORAGE_ACCOUNT_NAME for MI");
  }
  return new BlobServiceClient(`https://${account}.blob.core.windows.net`, new DefaultAzureCredential());
}

// Light or deep check against a specific container
export async function checkStorage(containerName, { deep = false } = {}) {
  if (!containerName) throw new Error("Missing env BLOB_CONTAINER");
  const bsc = await getBlobServiceClient();
  const cc = bsc.getContainerClient(containerName);

  // Reach container (create if missing)
  await cc.createIfNotExists();
  const props = await cc.getProperties();

  const result = {
    ok: true,
    container: containerName,
    publicAccess: props.blobPublicAccess ?? "private",
    lastModified: props.lastModified,
  };

  if (deep) {
    const name = `healthchecks/${Date.now()}.txt`;
    const blob = cc.getBlockBlobClient(name);
    await blob.uploadData(Buffer.from("ok"), {
      blobHTTPHeaders: { blobContentType: "text/plain; charset=utf-8" },
    });
    result.uploadedUrl = blob.url;
    result.uploaded = await blob.exists();
    await blob.delete();
    result.cleanedUp = true;
  }
  return result;
}
