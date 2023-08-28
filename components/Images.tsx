"use client";
import Image from "next/image";
import useSWR from "swr";
import fetchImages from "../lib/fetchImages";
import { AiOutlineToTop } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { promptInputState } from "@/states/promptInputState";
import { toast } from "react-hot-toast";

type ImageType = {
  name: string;
  url: string;
};

interface ImageItemProp {
  key: string;
  index: number;
  img: ImageType;
  handleUsePromptBtn: (prompt: string) => void;
}

function ImageItem({ index, img, handleUsePromptBtn }: ImageItemProp) {
  const prompt = img.name.split("_").shift()?.toString().split(".").shift();
  return (
    <div
      key={img.name + new Date()}
      className={`relative cursor-help 
  ${index === 0 && "md:col-span-2 md:row-span-2"}
  hover:scale-[103%] hover:-translate-y-2 transition-transform duration-200
  ease-in-out
  `}
    >
      <div className="absolute flex flex-col justify-center items-center w-full h-full bg-white opacity-0 hover:opacity-80 transition-opacity duration-200 z-10 rounded-xl">
        <p className="text-center font-light text-lg p-5">{prompt}</p>
        <button
          onClick={() => handleUsePromptBtn(prompt || "")}
          className="bg-cyan-600 bg-opacity-100 drop-shadow text-white px-4 py-2 rounded-full opacity-100 text-sm hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Use this prompt!
        </button>
      </div>
      <Image
        blurDataURL="/img/loading.svg"
        placeholder="blur"
        src={img.url}
        alt={img.name}
        width={800}
        height={800}
        className="w-full rounded-xl shadow-2xl drop-shadow-lg -z-10"
        unoptimized={index > 1}
      />
    </div>
  );
}

function Images() {
  const [scrollButton, setScrollButton] = useState(false);
  const setInput = useSetRecoilState(promptInputState);

  // Keep track of the scroll pos
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Function to handle the scroll event and set the visibility state
  const toggleVisibility = () => {
    if (window.scrollY > 500) {
      setScrollButton(true);
    } else {
      setScrollButton(false);
    }
  };

  const {
    data: images,
    isLoading,
    mutate: refreshImages,
    isValidating,
  } = useSWR("/api/getImages", fetchImages, {
    revalidateOnFocus: false,
  });

  const handleUsePromptBtn = (prompt: string) => {
    setInput(prompt);
    toast.success("Prompt copied!");
  };

  return (
    <div className="p-8 lg:p-0">
      {/* Scroll to top button */}
      <button
        className={`fixed bottom-24 right-10 p-4 rounded-full bg-cyan-500 z-50 drop-shadow opacity-70 transition-all duration-500 hover:opacity-100 hover:scale-110 ${
          !scrollButton && `cursor-default hidden`
        }`}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <AiOutlineToTop size="1.75em" color="white" />
      </button>

      {/* Refresh Images button */}
      <button
        onClick={() => refreshImages(images)}
        className="fixed bottom-10 right-10 bg-green-400/90 text-white px-5 py-3 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-violet-400 font-bold z-20"
      >
        <span className="drop-shadow-sm">
          {!isLoading && isValidating ? "Refreshing..." : "Refresh Images"}
        </span>
      </button>
      {isLoading && (
        <p className="animate-bounce text-center text-slate-100 pb-7 font-normal text-xl mt-48 sm:mt-80 drop-shadow-sm">
          Loading{" "}
          <span className="font-bold bg-clip-text bg-gradient-to-r from-zinc-200 via-orange-400 to-red-300 text-transparent">
            AI
          </span>{" "}
          images from the secret storage room...
        </p>
      )}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 px-0 md:px-10">
        {images?.imageUrls.map((img: ImageType, i: number) => (
          <ImageItem
            index={i}
            key={img.name}
            img={img}
            handleUsePromptBtn={handleUsePromptBtn}
          />
        ))}
      </div>
    </div>
  );
}

export default Images;
