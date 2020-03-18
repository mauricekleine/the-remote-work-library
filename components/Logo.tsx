import { useState } from "react";

type Props = {
  alt: string;
  fallback: string;
  fileName: string;
};

const Logo = ({ alt, fallback, fileName }: Props) => {
  const [shouldFallback, setShouldFallback] = useState(false);

  return (
    <picture className="w-4 h-4 mr-2">
      {!shouldFallback && (
        <source
          className="lazyload"
          data-srcset={`/${fileName}.webp`}
          srcSet="/logo.webp"
          type="image/webp"
        />
      )}

      {!shouldFallback && (
        <source
          className="lazyload"
          data-src={`/${fileName}.png`}
          src="/logo.png"
          style={{
            display: shouldFallback ? "none" : "inherit"
          }}
          type="image/png"
        />
      )}

      <img
        alt={alt}
        className="lazyload"
        onError={() => setShouldFallback(true)}
        src={fallback}
      />
    </picture>
  );
};

export default Logo;
