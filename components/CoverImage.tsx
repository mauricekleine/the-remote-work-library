type Props = {
  alt: string;
  fileName: string;
};

const Image = ({ alt, fileName }: Props) => (
  <picture>
    <source
      className="object-cover rounded-t w-full h-48 lazyload"
      data-srcset={`/${fileName}.webp`}
      srcSet="/cover.webp"
      type="image/webp"
    />

    <img
      alt={alt}
      className="object-cover rounded-t w-full h-48 lazyload"
      data-src={`/${fileName}.png`}
      src="/cover.png"
    />
  </picture>
);

export default Image;
