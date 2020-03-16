const Footer = () => (
  <div className="mt-8 border-t border-gray-600 bg-white">
    <div className="container mx-auto py-2 text-xs text-center">
      <div class="mx-4 sm:mx-auto">
        <p>
          Made with 💖 by{" "}
          <a
            className="text-blue-500"
            href="https://mauricekleine.com"
            target="_blank"
          >
            Maurice Kleine
          </a>{" "}
          using{" "}
          <a
            className="text-blue-500"
            href="https://nextjs.com"
            target="_blank"
          >
            Next.js
          </a>{" "}
          and{" "}
          <a
            className="text-blue-500"
            href="https://tailwindcss.com/"
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
