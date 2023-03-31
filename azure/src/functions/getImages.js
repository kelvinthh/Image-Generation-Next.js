const { app } = require("@azure/functions");
const {
    BlobServiceClient,
    StorageSharedKeyCredential,
  } = require("@azure/storage-blob");
  
  const accountName = process.env.ACCOUNT_NAME;
  const accountKey = process.env.ACCOUNT_KEY;

  const containerName = "images"
  
  const sharedKeyCredential = new StorageSharedKeyCredential(
    accountName,
    accountKey
  );
  
  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    sharedKeyCredential
  );

  app.http("getImages", {
    methods: ["GET"],
    authLevel: "anonymous",
    handler: async (request, context) => {

    },
  });