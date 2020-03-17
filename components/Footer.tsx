const Footer = () => (
  <div className="mt-8 border-t border-gray-600 bg-white">
    <div className="container mx-auto py-2 text-xs text-center">
      <div className="mx-8 sm:mx-auto">
        <p>
          Made with 💖 by{" "}
          <a
            className="text-gray-700 hover:underline"
            href="https://mauricekleine.com"
            rel="noreferrer"
            target="_blank"
          >
            Maurice Kleine
          </a>{" "}
          using{" "}
          <a
            className="text-gray-700 hover:underline"
            href="https://nextjs.com"
            rel="noreferrer"
            target="_blank"
          >
            Next.js
          </a>{" "}
          and{" "}
          <a
            className="text-gray-700 hover:underline"
            href="https://tailwindcss.com/"
            rel="noreferrer"
            target="_blank"
          >
            Tailwind CSS
          </a>
        </p>
      </div>
    </div>
  </div>
);

export default Footer;
