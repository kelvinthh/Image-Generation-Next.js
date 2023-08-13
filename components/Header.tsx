import Image from "next/image";
import Link from "next/link";
import gitHubIcon from "../public/img/25231.png";

function Header() {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:justify-between p-4 sticky bg-white top-0 z-50 shadow-md">
      {/* Left */}
      <div className="flex space-x-0 sm:space-x-2 items-center">
        <Image
          src="/img/image_FILL0_wght400_GRAD0_opsz48.svg"
          alt="logo"
          width={30}
          height={30}
          className='invisible sm:visible'
        />
        <div className='flex flex-col items-center sm:items-start'>
          <h1 className="font-bold">
            Image Generator by{" "}
            <a href={`${process.env.WEBSITE_URL}`} target="_blank">
              <span className="text-blue-600 hover:underline">Kelvin Tam</span>
            </a>
          </h1>
          <h2 className="text-xs">Powered by Open AI</h2>
        </div>
      </div>
      {/* Right */}
      <div className="flex flex-row text-sm sm:text-base items-center text-center">
        <Link
          className="px-2 font-light"
          href={"https://github.com/kelvinthh/Image-Generation-Next.js"}
        >
          <Image
            src={gitHubIcon}
            alt={"GitHub Repository"}
            width={25}
            height={25}
          />
        </Link>
        <Link className="px-2 font-light" href={"https://openai.com"}>
          OpenAI
        </Link>
        <Link className="px-2 font-light" href={"https://azure.microsoft.com"}>
          Azure
        </Link>
        <Link className="px-2 font-light" href={"https://nextjs.org/"}>
          Next.js
        </Link>
      </div>
    </header>
  );
}

export default Header;
