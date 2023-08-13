"use client";
import fetchImages from "@/lib/fetchImages";
import fetchSuggestionFromChatGPT from "@/lib/fetchSuggestionFromChatGPT";
import { FormEvent, useState, useCallback, use } from "react";
import useSWR from "swr";
import toast from "react-hot-toast";

// Declare this a client-side component

function Prompt() {
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const GENERATE_COOLDOWN = 30;

  const {
    data: suggestion,
    isLoading,
    mutate,
    isValidating,
  } = useSWR("/api/suggestion", fetchSuggestionFromChatGPT, {
    revalidateOnFocus: false,
  });

  const { mutate: updateImages } = useSWR("/api/getImages", fetchImages, {
    revalidateOnFocus: false,
  });

  const loading = isLoading || isValidating;

  const handlePlaceHolder = () => {
    if (loading) return "I'm thinking of a prompt for you...";
    if (suggestion) return suggestion;
    else return "Enter a prompt here.";
  };

  const suggestionBlockWhenHasInput = () => {
    if (input)
      return (
        <p className="italic pt-2 pl-2 font-light text-gray-300">
          Suggestion: <span className="text-white">{suggestion}</span>
        </p>
      );
  };

  const canGenerateImage = () => {
    const lastGenerated = localStorage.getItem("lastGenerated");
    if (!lastGenerated) return true;

    const timeSinceLastGenerated = Date.now() - parseInt(lastGenerated, 10);
    return timeSinceLastGenerated >= GENERATE_COOLDOWN * 1000;
  };

  const updateLastGenerated = () => {
    localStorage.setItem("lastGenerated", Date.now().toString());
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // console.log("Submit clicked!");
    e.preventDefault();
    if (!canGenerateImage()) {
      toast.error(
        `You can only generate an image every ${GENERATE_COOLDOWN} seconds.`
      );
      return;
    }
    await submitPrompt();
  };

  const handleUseSuggestion = async () => {
    // console.log("Use Suggestion clicked!");
    if (!canGenerateImage()) {
      toast.error(
        `You can only generate an image every ${GENERATE_COOLDOWN} seconds.`
      );
      return;
    }
    await submitPrompt(true);
  };

  const submitPrompt = async (useSuggestion?: boolean) => {
    setIsGenerating(true);
    const inputPrompt = input;
    setInput("");

    // console.log("Input prompt is: " + inputPrompt);

    const prompt = useSuggestion ? suggestion : inputPrompt;

    const notificationPrompt = prompt;
    const notificationPromptPromptShort = notificationPrompt.slice(0, 40);

    const notification = toast.loading(
      `DALL‧E is creating: ${notificationPromptPromptShort}...`
    );

    const res = await fetch("/api/generateImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    });

    const data = await res.json();
    const msg = JSON.stringify(data);

    // console.log(`${data.error} ${msg}`)

    if (
      data.error ||
      msg.includes("Error processing the prompt") ||
      msg.includes("Request failed")
    ) {
      toast.error("Unable to process the request.", {
        id: notification,
      });
    } else {
      toast.success("Your image has been generated!!!", {
        id: notification,
      });
    }
    setIsGenerating(false);
    updateImages();
    updateLastGenerated();
  };

  return (
    <div className="mx-8 mt-4 lg:mx-10 lg:mb-8">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col lg:flex-row lg:divide-x lg:space-x-4 space-y-2 lg:space-y-0 rounded-md shadow-md lg:shadow-none"
      >
        <textarea
          placeholder={handlePlaceHolder()}
          className="flex-1 p-4 rounded-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          className={`p-4 rounded-xl border-none font-bold opacity-100 bg-blue-700 text-white ${
            (!input || isGenerating) && `opacity-50 cursor-not-allowed`
          }`}
          type="submit"
          disabled={!input || isGenerating}
        >
          Generate
        </button>

        <button
          className="p-4 bg-green-500 text-white border-none transition-colors duration-150 font-bold rounded-xl"
          type="button"
          onClick={mutate}
        >
          Gimme a new suggestion!
        </button>

        <button
          className={`p-4 ${
            isGenerating
              ? "bg-cyan-50 text-cyan-300 bg-transparent"
              : "bg-cyan-100 text-cyan-800"
          } rounded-xl border-none transition-colors duration-150 font-bold`}
          type="button"
          onClick={() => handleUseSuggestion()}
          disabled={isGenerating}
        >
          Use Suggestion.
        </button>
      </form>
      {suggestionBlockWhenHasInput()}
    </div>
  );
}

export default Prompt;
