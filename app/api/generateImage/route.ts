import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const prompt = res.prompt;

    const response = await fetch(`${process.env.REMOTE_HOST}${process.env.API_GENERATE_IMAGE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const textData = await response.text();
    return NextResponse.json(textData);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
