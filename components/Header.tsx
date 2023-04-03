import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="flex p-5 sticky justify-between bg-white top-0 z-50 shadow-md">
      {/* Left */}
      <div className="flex space-x-2 items-center">
        <Image
          src="/img/image_FILL0_wght400_GRAD0_opsz48.svg"
          alt="logo"
          width={30}
          height={30}
        />
        <div>
          <h1 className="font-bold">
            Image Generator by <span className="text-blue-600">Kelvin Tam</span>
          </h1>
          <h2 className="text-xs">Powered by Open AI</h2>
          <div></div>
        </div>
      </div>
      {/* Right */}
      <div className="flex flex-col sm:flex-row text-xs md:text-base items-center ">
        <Link className="px-2 font-light" href={"https://github.com/kelvinthh/Image-Generaton-Next.js"}>GitHub</Link>
        <Link className="px-2 font-light" href={"https://openai.com"}>OpenAI</Link>
        <Link className="px-2 font-light" href={"https://azure.microsoft.com"}>Azure</Link>
      </div>
    </header>
  );
}

export default Header;
