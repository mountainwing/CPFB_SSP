import { BlobServiceClient } from "@azure/storage-blob";
import { blob } from "stream/consumers";

let blobServiceClient;

//initialize blob service client with managed identity
export function setupBlobServiceClient() {
    blobServiceClient =  BlobServiceClient.fromConnectionString(
        process.env.AZURE_STORAGE_CONNECTION_STRING
    )
}

// function to upload file to azure blob storage using streams
export async function uploadFiletoBlob(fileStream, fileName, userEmail) {
    try {
        //init blob client
        if (!blobServiceClient) setupBlobServiceClient();

        // azure blob service container
        const containerClient = blobServiceClient.getContainerClient(process.env.BLOB_CONTAINER);
        const destinationPath = `user_folder/${userEmail}/in/${fileName}`;
        const destinationBlobClient = containerClient.getBlockBlobClient(destinationPath);

        const bufferSize = 4 * 1024 * 1024; // 4MB buffer size
        const maxConcurrency = 5;

        // check if blob exists, if yes, delete it
        if (await destinationBlobClient.exists()) {
            console.log(`Blob ${destinationPath} already exists. Deleting before re-uploading...`);
            await destinationBlobClient.delete();
        } 

        // uploading stream to blob
        console.log(`Uploading to blob path: ${destinationPath}`);
        try {
            await destinationBlobClient.uploadStream(fileStream, bufferSize, maxConcurrency, {
                blobHTTPHeaders: { blobContentType: "application/octet-stream" } // set content type
            });            
        } catch (err) {
            throw new Error(`Error uploading file to blob: ${err.message}`);
        }
        console.log(`Upload of ${fileName} to ${destinationPath} successful.`);
    } catch (error) {
        console.error("Error in uploadFiletoBlob:", error.message);
        throw error;
    }  
}
