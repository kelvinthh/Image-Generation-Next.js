import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  organization: process.env.OPEN_AI_ORG,
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(config);

export default openai;
