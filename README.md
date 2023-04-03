# Next.js AI Image Generator with DALL-E and ChatGPT 🎨🤖
## Live version: [https://img-gen-kelvinthh.vercel.app/](https://img-gen-kelvinthh.vercel.app/)

![Preview](https://i.imgur.com/O16R04N.png)

This [Next.js](https://nextjs.org/) single-page web app allows users to generate images based on text prompts, utilizing OpenAI's [DALL-E](https://openai.com/research/dall-e/) and [ChatGPT](https://platform.openai.com/docs/guides/chat/gpt-3) APIs. The app is built using the powerful Next.js framework and styled with the popular [Tailwind CSS](https://tailwindcss.com/) utility-first CSS framework. It features serverless API backends powered by [Microsoft Azure](https://azure.microsoft.com/) Function App with HTTP triggers and a Storage Account for saving generated images in a blob container. Deployed on Azure (for the HTTP triggers) and [Vercel (for the front-end)](https://vercel.com/), this app offers a seamless and modern user experience.



## Features 💡
* Generate images from text prompts using OpenAI's DALL-E
* Receive prompt suggestions from OpenAI's ChatGPT
* Serverless API backends with Microsoft Azure Function App HTTP triggers
* Image storage using Microsoft Azure Storage Account (blob container)
* Deployed on Azure (back-end) and Vercel (front-end)

## Prerequisites 📋
To clone and run this project, you'll need the following:

* An OpenAI account with API key for DALL-E and ChatGPT access
* A Microsoft Azure account for Function App and Storage Account setup
* Your local environment file (.env) configured with the required API keys and credentials
* [Azure Tools extentions for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack)

## Getting Started 🚀
1. Clone this repository:
`git clone https://github.com/kelvinthh/Image-Generaton-Next.js.git`
2. Install dependencies:
`npm install`

3. Make sure you created your Function App on Azure and map it to the project's `azure` folder under the root folder.

4. Configure your local environment file (.env) with the required API keys and credentials:
```
// .env
OPEN_AI_ORG=org-your_open_ai_account  
OPEN_AI_API_KEY=your_open_ai_key  
REMOTE_HOST=your_remote_host_url_or_localhost/127.0.0.1_in_dev
API_GENERATE_IMAGE=your_generateImage_api_endpoint
API_GET_IMAGES=your_getImages_api_endpoint
API_GET_SUGGESTIONS=your_getChatGPTSuggestion_api_endpoint
```
5. In VSCode click `Windows: Control + P / Mac: Command + P` and type `Azure Functions: Download Remote Settings...`

6. Add the lines `OPEN_AI_ORG` & `OPEN_AI_API_KEY` from your project `.env` file to `azure`'s `local.settings.json`

7. Run the development server:
`npm run dev`

8. Run the local Azure Function development server:
`cd azure && npm run start` 

6. Open your browser and navigate to http://localhost:3000 to see the app running.

## Deployment 🌐
### Front-end (Vercel)
To deploy the front-end on Vercel, follow these steps:

1. Sign up or log in to your Vercel account.
2. Connect your GitHub account and import the repository.
3. Deploy your project with terminal command `vercel`.
4. Configure your environment variables in the Vercel dashboard, matching the local .env file.

### Back-end (Azure Functions)
To deploy the back-end on Azure Functions, follow these steps:

1. Sign up or log in to your Microsoft Azure account.
2. Create a new Function App and configure it with your preferred runtime, operating system, and hosting plan.
3. Deploy your Function App using your preferred method (e.g., Git, Visual Studio Code, Azure Functions Core Tools).
4. Configure the required environment variables in the Function App's "Application settings" to match your local .env file.
5. Deploy your Function App using VSCode command line and use `Azure Functions: Deploy to Function App...`

## Acknowledgments 🙌

This project was inspired by following the tutorial [Build an AI Image Generator App using Next.js and OpenAI DALL-E](https://www.youtube.com/watch?v=0qHnVYSxZ4k) by Sonny Sangha. While the tutorial served as an excellent starting point, it is important to note that the code in this project was not directly copied and pasted. Instead, it was adapted and customized to better suit the needs and requirements of this specific implementation. We would like to express our gratitude to Sonny Sangha for sharing his knowledge and providing valuable guidance throughout the development process.
