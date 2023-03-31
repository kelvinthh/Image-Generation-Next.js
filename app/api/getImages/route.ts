export async function GET(request: Request) {
  const response = await fetch("http://127.0.0.1:7071/api/getImages", {
    cache: "no-store",
  });
  const blob = await response.blob();
  const textData = await blob.text();

  const data = JSON.parse(textData);

  return new Response(JSON.stringify(data), {
    status: 200,
  });
}
