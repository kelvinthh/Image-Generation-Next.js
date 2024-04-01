export const dynamic = 'force-dynamic';
const fetchSuggestionFromChatGPT = () =>
  fetch("/api/suggestion", {
    // cache: "no-store",
    next: { revalidate: 5 }
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error fetching suggestion:", error);
      throw error; // Rethrow the error to propagate it further
    });

export default fetchSuggestionFromChatGPT;
