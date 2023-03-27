const { app } = require("@azure/functions");
const openai = require("../../lib/openai");

app.http("getChatGPTSuggestion", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    // const response = "";
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        "Write a random text prompt for AI image generation, you must include details such as the genre and what ype of image it is, options include oil painting, watercolor, photo-realistic, 4k, abstract, modern, black and white etc. Do not wrap the answer in quotes.",
      max_tokens: 100,
      temperature: 0.7,
    });

    context.log(`Http function processed request for url "${request.url}"`);

    const responseText = response.data.choices[0].text;
    
    return { body: responseText };
  },
});
