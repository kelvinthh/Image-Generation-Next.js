export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  // Connect to MS Azure Function App Endpoint
  const response = await fetch(
    `${process.env.REMOTE_HOST}${process.env.API_GET_SUGGESTIONS}`,
    {
      // cache: "no-store",
      next: { revalidate: 5 }
    }
  );

  const textData = await response.text();

  if (response.status !== 200) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return new Response(JSON.stringify(textData.trim()), {
    status: 200,
  });
}
