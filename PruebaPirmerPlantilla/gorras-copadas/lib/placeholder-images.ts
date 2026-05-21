type ImageOptions = {
  width?: number;
  height?: number;
  lock: number;
  keyword?: string;
};

export function placeholderImage({
  width = 600,
  height = 600,
  lock,
  keyword = "cap,hat,snapback",
}: ImageOptions): string {
  return `https://loremflickr.com/${width}/${height}/${keyword}?lock=${lock}`;
}

export const CAP_IMAGES = {
  snapback: (lock: number) => placeholderImage({ lock, keyword: "snapback,cap" }),
  dadhat: (lock: number) => placeholderImage({ lock, keyword: "dadhat,cap" }),
  fitted: (lock: number) => placeholderImage({ lock, keyword: "fitted,cap,hat" }),
  skate: (lock: number) => placeholderImage({ lock, keyword: "skateboard,cap" }),
  hero: (lock: number) => placeholderImage({ width: 1200, height: 800, lock, keyword: "gorras,streetwear" }),
};
