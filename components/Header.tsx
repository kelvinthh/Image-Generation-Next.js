import Image from 'next/image'

function Header() {
  return <header>
    <div className="flex space-x-2 items-center">
        <Image src="/img/image_FILL0_wght400_GRAD0_opsz48.svg" alt="icon" width={30} height={30}/>
        <div>
          <h1 className="font-bold">
            Image Generator by <span className="text-blue-600">Kelvin Tam</span>
          </h1>
          <h2 className="text-xs">Powered by Open AI</h2>
        </div>
      </div>
  </header>
}

export default Header
