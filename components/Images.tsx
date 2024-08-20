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
  transition-transform duration-200 ease-in-out hover:-translate-y-2
  hover:scale-[103%]
  `}
    >
      <div className="absolute z-10 flex h-full w-full flex-col items-center justify-center rounded-xl bg-white opacity-0 transition-opacity duration-200 hover:bg-opacity-50 hover:opacity-100 hover:backdrop-blur">
        <p className="p-5 text-center text-lg font-light">{prompt}</p>
        <button
          onClick={() => handleUsePromptBtn(prompt || "")}
          className="rounded-full bg-cyan-600 bg-opacity-100 px-4 py-2 text-sm text-white opacity-100 drop-shadow transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
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
        className="-z-10 w-full rounded-xl shadow-2xl drop-shadow-lg"
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
        className={`fixed bottom-24 right-10 z-50 rounded-full bg-cyan-500 p-4 opacity-70 drop-shadow transition-all duration-500 hover:scale-110 hover:opacity-100 ${
          !scrollButton && `hidden cursor-default`
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
        className="fixed bottom-10 right-10 z-20 animate-fade rounded-md bg-green-400/90 px-5 py-3 font-bold text-white animate-delay-[800ms] animate-duration-1000 animate-once animate-ease-in-out hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
      >
        <span className="drop-shadow-sm">
          {!isLoading && isValidating ? "Refreshing..." : "Refresh Images"}
        </span>
      </button>
      {isLoading ? (
        <div className="flex animate-fade-up items-center justify-center pb-7 animate-delay-[600ms] animate-duration-1000 animate-ease-in-out">
          <p className="mt-48 animate-bounce rounded-lg bg-black bg-opacity-30 p-4 text-center text-xl font-light text-white drop-shadow-sm sm:mt-80 sm:px-8">
            Loading{" "}
            <span className="bg-gradient-to-r from-zinc-200 via-orange-400 to-red-300 bg-clip-text font-bold text-transparent">
              AI
            </span>{" "}
            images from the secret room... 💾
          </p>
        </div>
      ) : (
        <div className="grid animate-fade-up grid-cols-1 gap-4 px-0 animate-delay-[600ms] animate-duration-1000 animate-ease-in-out md:grid-cols-2 md:px-10 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {images?.imageUrls.map((img: ImageType, i: number) => (
            <ImageItem
              index={i}
              key={img.name}
              img={img}
              handleUsePromptBtn={handleUsePromptBtn}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Images;
