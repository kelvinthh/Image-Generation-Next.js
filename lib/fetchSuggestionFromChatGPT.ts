export const dynamic = 'force-dynamic';
const fetchSuggestionFromChatGPT = () =>
  fetch("/api/suggestion", {
    // cache: "no-store",
    next: { revalidate: 5 }
  }).then((res) => res.json());

export default fetchSuggestionFromChatGPT;
