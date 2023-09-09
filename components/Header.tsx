import Image from "next/image";
import Link from "next/link";
import gitHubIcon from "../public/img/25231.png";

function Header() {
  return (
    <header className="sticky top-0 z-50 flex flex-col items-center justify-center space-y-2 bg-white p-4 shadow-md sm:flex-row sm:justify-between sm:space-y-0">
      {/* Left */}
      <div className="flex items-center space-x-0 sm:space-x-2 animate-fade sm:animate-fade-right animate-once animate-ease-in-out">
        <Image
          src="/img/image_FILL0_wght400_GRAD0_opsz48.svg"
          alt="logo"
          width={30}
          height={30}
          className="hidden sm:block"
        />
        <div className="flex flex-col items-center drop-shadow sm:items-start">
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
      <div className="flex flex-row items-center text-center text-sm sm:text-base animate-fade sm:animate-fade-left animate-once animate-ease-in-out">
        <Link
          className="px-2 transition-all hover:-translate-y-1 hover:scale-105"
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
          className="px-2 font-light transition-all hover:-translate-y-1 hover:scale-105"
          href={"https://openai.com"}
          target="blank"
        >
          OpenAI
        </Link>

        <Link
          className="px-2 font-light transition-all hover:-translate-y-1 hover:scale-105"
          href={"https://azure.microsoft.com"}
          target="blank"
        >
          Azure
        </Link>

        <Link
          className="px-2 font-light transition-all hover:-translate-y-1 hover:scale-105"
          href={"https://nextjs.org/"}
          target="_blank"
        >
          Next.js
        </Link>

        <Link
          className="px-2 font-medium transition-all hover:-translate-y-1 hover:scale-105"
          href={"https://github.com/kelvinthh/Image-Generation-RN"}
          target="_blank"
        >
          Mobile App
        </Link>
      </div>
    </header>
  );
}

export default Header;
