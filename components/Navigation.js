import Link from "next/link";

const Navigation = () => (
  <div className="mb-8 border-b border-gray-600 bg-white">
    <nav className="container mx-4 sm:mx-auto py-6">
      <Link href="/">
        <div className="flex items-center">
          <img
            className="w-6 mr-2"
            src="favicon-32x32.png"
            alt="The Remote Work Library"
          />

          <span className="font-bold text-xl text-black">
            The Remote Work Library
          </span>
        </div>
      </Link>
    </nav>
  </div>
);

export default Navigation;
