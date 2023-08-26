import Image from "next/image";
import Link from "next/link";
import gitHubIcon from "../public/img/25231.png";

function Header() {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:justify-between p-4 sticky bg-white top-0 z-50 shadow-md">
      {/* Left */}
      <div className="flex space-x-0 sm:space-x-2 items-center">
        <Image
          src="/img/image_FILL0_wght400_GRAD0_opsz48.svg"
          alt="logo"
          width={30}
          height={30}
          className="hidden sm:block"
        />
        <div className="flex flex-col items-center sm:items-start drop-shadow">
          <h1 className="font-bold">
            Image Generator by{" "}
            <a href={`${process.env.WEBSITE_URL}`} target="_blank">
              <span className="text-blue-600 hover:underline">Kelvin Tam</span>
            </a>
          </h1>
          <h2 className="text-xs">Powered by OpenAI</h2>
        </div>
      </div>
      {/* Right */}
      <div className="flex flex-row text-sm sm:text-base items-center text-center">
        <Link
          className="px-2 transition-all hover:scale-105 hover:-translate-y-1"
          href={"https://github.com/kelvinthh/Image-Generation-Next.js"}
        >
          <Image
            src={gitHubIcon}
            alt={"GitHub Repository"}
            width={25}
            height={25}
          />
        </Link>

        <Link
          className="px-2 font-light transition-all hover:scale-105 hover:-translate-y-1"
          href={"https://openai.com"}
          target="blank"
        >
          OpenAI
        </Link>

        <Link
          className="px-2 font-light transition-all hover:scale-105 hover:-translate-y-1"
          href={"https://azure.microsoft.com"}
          target="blank"
        >
          Azure
        </Link>

        <Link
          className="px-2 font-light transition-all hover:scale-105 hover:-translate-y-1"
          href={"https://nextjs.org/"}
          target="_blank"
        >
          Next.js
        </Link>

        <Link
          className="px-2 font-medium transition-all hover:scale-105 hover:-translate-y-1"
          href={"https://github.com/kelvinthh/Image-Generation-RN"}
          target="_blank"
        >
          Mobile Ver.
        </Link>
      </div>
    </header>
  );
}

export default Header;
