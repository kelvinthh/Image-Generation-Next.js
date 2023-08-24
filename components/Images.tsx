"use client";
import Image from "next/image";
import useSWR from "swr";
import fetchImages from "../lib/fetchImages";

type ImageType = {
  name: string;
  url: string;
};

function Images() {
  const {
    data: images,
    isLoading,
    mutate: refreshImages,
    isValidating,
  } = useSWR("/api/getImages", fetchImages, {
    revalidateOnFocus: false,
  });

  return (
    <div className="p-8 lg:p-0">
      <button
        onClick={() => refreshImages(images)}
        className="fixed bottom-10 right-10 bg-green-400/90 text-white px-5 py-3 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-violet-400 font-bold z-20"
      >
        {!isLoading && isValidating ? "Refreshing..." : "Refresh Images"}
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
          <div
            key={img.name}
            className={`relative cursor-help 
          ${i === 0 && "md:col-span-2 md:row-span-2"}
          hover:scale-[103%] hover:-translate-y-2 transition-transform duration-200
          ease-in-out
          `}
          >
            <div className="absolute flex justify-center items-center w-full h-full bg-white opacity-0 hover:opacity-80 transition-opacity duration-200 z-10 rounded-xl">
              <p className="text-center font-light text-lg p-5">
                {img.name.split("_").shift()?.toString().split(".").shift()}
              </p>
            </div>
            <Image
              blurDataURL="/img/loading.svg"
              placeholder="blur"
              src={img.url}
              alt={img.name}
              width={800}
              height={800}
              className="w-full rounded-xl shadow-2xl drop-shadow-lg -z-10"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Images;
