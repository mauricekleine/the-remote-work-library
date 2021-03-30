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
        <source data-srcset={`/${fileName}.webp`} type="image/webp" />
      )}

      {!shouldFallback && (
        <source data-src={`/${fileName}.png`} type="image/png" />
      )}

      <img
        alt={alt}
        data-sizes="auto"
        data-src={fallback}
        className="lazyload"
        onError={() => setShouldFallback(true)}
        src="/logo.png"
      />
    </picture>
  );
};

export default Logo;
