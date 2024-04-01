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

    try {
      const image = await openai.images.generate({
        model: "dall-e-2",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      });

      image_url = image.data[0].url;

      // Download the image as an ArrayBuffer
      const res = await axios.get(image_url, { responseType: "arraybuffer" });

      const arrayBuffer = res.data;

      sasToken = await generateSASToken();

      const blobServiceClient = new BlobServiceClient(
        `https://${accountName}.blob.core.windows.net?${sasToken}`
      );

      const containerClient =
        blobServiceClient.getContainerClient(containerName);

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
      return { body: "Successfully generated and uploaded an image." };
    } catch (error) {
      return { status: 500, body: error };
    }
  },
});
