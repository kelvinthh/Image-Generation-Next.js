export const dynamic = "force-dynamic";
const fetchImages = () =>
  fetch("/api/getImages", {
    // cache: "no-store",
    next: { revalidate: 0 },
  }).then((res) => res.json());

export default fetchImages;
