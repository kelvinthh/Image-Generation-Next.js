const { app } = require("@azure/functions");
const openai = require("../../lib/openai");
const axios = require("axios");
const generateSASToken = require("../../lib/generateSASToken");

const { BlobServiceClient } = require("@azure/storage-blob");

const accountName = process.env.ACCOUNT_NAME;
const containerName = "images";

app.http("generateImage", {
  method: ["POST"],
  authLevel: "anonymous",
  handler: async (request) => {
    const { prompt } = await request.json();

    console.log(`Prompt: ${prompt}`);

    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    image_url = response.data.data[0].url;
    console.log("Image URL: " + image_url);

    // Download the image as an ArrayBuffer
    const res = await axios.get(image_url, { responseType: "arraybuffer" });

    const arrayBuffer = res.data;

    sasToken = await generateSASToken();

    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net?${sasToken}`
    );

    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Generate current timestamp
    const timestamp = new Date().getTime();
    const file_name = `${prompt}_${timestamp}.png`;

    const blockBlobClient = containerClient.getBlockBlobClient(file_name);

    try {
      await blockBlobClient.uploadData(arrayBuffer);
      console.log("File has been successfully uploaded.");
    } catch (e) {
      console.error("Failed to upload:", e.message);
    }
  },
});
