"use client";
import fetchSuggestionFromChatGPT from "@/lib/fetchSuggestionFromChatGPT";
import { useEffect, useState } from "react";
import useSWR from "swr";

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

  const loading = isLoading || isValidating;

  const HandlePlaceholder = () => {
    if (loading) return "I'm thinking of a prompt for you...";
    if (suggestion) return suggestion;
    else return "Enter a prompt here.";
  };

  const SuggestionBlockWhenHasInput = () => {
    if (input)
      return (
        <p className='italic pt-2 pl-2 font-light text-gray-300'>
          Suggestion: <span className='text-white'>{suggestion}</span>
        </p>
      );
  };

  return (
    <div className="m-10">
      <form className="flex flex-col lg:flex-row lg:divide-x rounded-md shadow-md">
        <textarea
          placeholder={HandlePlaceholder()}
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
        >
          Use Suggestion.
        </button>
      </form>
      {SuggestionBlockWhenHasInput()}
    </div>
  );
}

export default Prompt;
