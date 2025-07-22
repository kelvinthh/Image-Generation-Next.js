const { app } = require("@azure/functions");
const openai = require("../../lib/openai");

app.http("getChatGPTSuggestion", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        messages: [
          {
            role: "system",
            content:
              "Write a random text prompt for AI image generation, you must include details such as the genre and what type of image it is, options include oil painting, watercolor, photo-realistic, 4k, abstract, modern, black and white etc. Do not wrap the answer in quotes.",
          },
        ],
        max_tokens: 100,
        temperature: 0.7,
      });

      context.log(`Http function processed request for url "${request.url}"`);

      const responseText = response.choices[0].message.content;


      return { body: responseText };
    } catch (error) {
      context.log(`Error processing request: ${error.message}`);
      return { status: 500, body: `Error: ${error.message}` };
    }
  },
});
