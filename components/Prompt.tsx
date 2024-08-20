"use client";
import fetchImages from "@/lib/fetchImages";
import fetchSuggestionFromChatGPT from "@/lib/fetchSuggestionFromChatGPT";
import { FormEvent, useState, useCallback, use } from "react";
import useSWR from "swr";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { promptInputState } from "@/states/promptInputState";

// Declare this a client-side component

function Prompt() {
  const [input, setInput] = useRecoilState(promptInputState);
  // const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const GENERATE_COOLDOWN = 10;

  const {
    data: suggestion,
    isLoading,
    mutate: updateSuggestion,
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
        <p className="animate-flip-down pt-2 pl-2 font-bold text-white drop-shadow-md animate-normal animate-duration-500 animate-once animate-ease-in-out">
          ✨ Suggestion:{" "}
          <span className="select-all font-light">{suggestion}</span>
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
        `You can only generate an image every ${GENERATE_COOLDOWN} seconds.`,
      );
      return;
    }
    await submitPrompt();
  };

  const handleNewSuggestion = () => {
    try {
      updateSuggestion();
    } catch (error) {
      console.log("Update Suggestion Err", error);
    }
  };

  const handleUseSuggestion = async () => {
    // console.log("Use Suggestion clicked!");
    if (!canGenerateImage()) {
      toast.error(
        `You can only generate an image every ${GENERATE_COOLDOWN} seconds.`,
      );
      return;
    }
    await submitPrompt(true);
  };

  const submitPrompt = async (useSuggestion?: boolean) => {
    setIsGenerating(true);
    const inputPrompt = input;
    setInput("");

    const prompt = useSuggestion ? suggestion : inputPrompt;

    const notificationPrompt = prompt;
    const notificationPromptPromptShort = notificationPrompt.slice(0, 40);

    const notification = toast.loading(
      `DALL‧E is creating: ${notificationPromptPromptShort}...`,
    );

    try {
      const res = await fetch("/api/generateImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt }),
      });

      // WORKAROUND: Handle 504 Gateway Timeout
      // This occurs on Vercel's hobby plan due to the 5-second execution limit
      // We assume the image generation is still processing on the server
      if (res.status === 504) {
        toast.success(
          "Your image is being generated. The page will refresh shortly.",
          {
            id: notification,
            duration: 5000, // Show for 5 seconds
          },
        );

        // Schedule a page refresh after 2 seconds
        setTimeout(() => {
          setIsGenerating(false);
          updateImages();
          updateLastGenerated();
        }, 2000);

        return; // Exit the function early
      }

      const data = await res.json();
      const msg = JSON.stringify(data);

      if (
        data.error ||
        msg.includes("Error processing the prompt") ||
        msg.includes("Request failed")
      ) {
        throw new Error(data.error || "Unable to process the request.");
      }

      toast.success("Your image has been generated!!!", {
        id: notification,
      });
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error(
        error instanceof Error ? error.message : "An error occurred",
        {
          id: notification,
        },
      );
    } finally {
      setIsGenerating(false);
      updateImages();
      updateLastGenerated();
    }
  };

  return (
    <div className="mx-8 mt-4 animate-fade-up animate-delay-[200ms] animate-duration-1000 animate-once animate-ease-in-out lg:mx-10 lg:mb-8">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col space-y-2 rounded-md lg:flex-row lg:space-x-4 lg:space-y-0 lg:divide-x"
      >
        <textarea
          placeholder={handlePlaceHolder()}
          className="flex-1 rounded-lg p-4 shadow-lg outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          className={`rounded-xl border-none bg-blue-700 p-4 font-bold text-white opacity-100 drop-shadow transition-all ${
            !input || isGenerating
              ? `cursor-not-allowed opacity-50 shadow-lg`
              : `animate-pulse hover:-translate-y-1 hover:scale-105 hover:animate-none`
          }`}
          type="submit"
          disabled={!input || isGenerating}
        >
          Generate
        </button>

        <button
          className="rounded-xl border-none bg-green-500 p-4 font-bold text-white shadow-lg transition-all duration-150 hover:-translate-y-1 hover:scale-105"
          type="button"
          onClick={handleNewSuggestion}
        >
          Gimme a new suggestion!
        </button>

        <button
          className={`p-4 transition-transform ${
            isGenerating
              ? "bg-cyan-50 bg-transparent text-cyan-300"
              : "bg-cyan-100 text-cyan-800 hover:-translate-y-1 hover:scale-105"
          } rounded-xl border-none font-bold shadow-lg transition-colors duration-150`}
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
