"use client";
import fetchImages from "@/lib/fetchImages";
import fetchSuggestionFromChatGPT from "@/lib/fetchSuggestionFromChatGPT";
import { FormEvent, useState } from "react";
import useSWR from "swr";
import toast from "react-hot-toast";

// Declare this a client-side component

function Prompt() {
  const [input, setInput] = useState("");

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log("Submit clicked!");
    e.preventDefault();
    await submitPrompt();
  };

  const handleUseSuggestion = async () => {
    console.log("Use Suggestion clicked!");
    await submitPrompt(true);
  };

  const submitPrompt = async (useSuggestion?: boolean) => {
    const inputPrompt = input;
    setInput("");

    console.log("Input prompt is: " + inputPrompt);

    const prompt = useSuggestion ? suggestion : inputPrompt;

    const notificationPrompt = prompt;
    const notificationPromptPromptShort = notificationPrompt.slice(0, 20);

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
    const msg = JSON.stringify(data)

    if (data.error || msg.includes("Error processing the prompt")) {
      toast.error(msg, {
        id: notification
      });
    } else {
      toast.success("Your image has been generated!!!", {
        id: notification,
      });
    }

    updateImages();
  };

  return (
    <div className="m-10">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col lg:flex-row lg:divide-x rounded-md shadow-md"
      >
        <textarea
          placeholder={handlePlaceHolder()}
          className="flex-1 p-4 rounded-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className={`p-4 font-bold ${
            input
              ? "bg-violet-700 text-white"
              : "text-gray-300 cursor-not-allowed"
          }`}
          type="submit"
          disabled={!input}
        >
          Generate
        </button>
        <button
          className="p-4 bg-purple-500 text-white border-none transition-colors duration-150 font-bold"
          type="button"
          onClick={mutate}
        >
          Gimme a new suggestion!
        </button>
        <button
          className="p-4 bg-purple-100 text-purple-800 border-none transition-colors duration-150 font-bold"
          type="button"
          onClick={() => handleUseSuggestion()}
        >
          Use Suggestion.
        </button>
      </form>
      {suggestionBlockWhenHasInput()}
    </div>
  );
}

export default Prompt;
