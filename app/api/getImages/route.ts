export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  const response = await fetch(
    `${process.env.REMOTE_HOST}${process.env.API_GET_IMAGES}`,
    {
      // cache: "no-store",
      next: { revalidate: 0 },
    }
  );
  const blob = await response.blob();
  const textData = await blob.text();

  const data = JSON.parse(textData);

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}
