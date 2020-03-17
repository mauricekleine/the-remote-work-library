import Link from "next/link";

const Navigation = () => (
  <div className="mb-8 border-b border-gray-600 bg-white">
    <nav className="container mx-auto py-2">
      <div className="mx-8 sm:mx-auto">
        <Link href="/">
          <a>
            <div className="flex items-center cursor-pointer">
              <img
                className="w-10 mr-2"
                src="/android-chrome-192x192.png"
                alt="The Remote Work Library"
              />

              <div className="flex flex-col">
                <p className="font-bold text-xl text-black -mb-1">
                  The Remote Work Library
                </p>

                <h2 className="text-xs text-gray-700">
                  a curated list of remote work resources
                </h2>
              </div>
            </div>
          </a>
        </Link>
      </div>
    </nav>
  </div>
);

export default Navigation;
