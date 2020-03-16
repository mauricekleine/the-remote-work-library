import Link from "next/link";

const Navigation = () => (
  <div className="mb-8 border-b border-gray-600 bg-white">
    <nav className="container mx-auto py-6">
      <div class="mx-8 sm:mx-auto">
        <Link href="/">
          <a>
            <div className="flex items-center cursor-pointer">
              <img
                className="w-6 mr-2"
                src="/favicon-32x32.png"
                alt="The Remote Work Library"
              />

              <span className="font-bold text-xl text-black">
                The Remote Work Library
              </span>
            </div>
          </a>
        </Link>
      </div>
    </nav>
  </div>
);

export default Navigation;
