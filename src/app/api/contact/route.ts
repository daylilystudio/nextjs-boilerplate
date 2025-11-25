import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, message } = data;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    const formData = new FormData();
    formData.append(process.env.GOOGLE_FORM_NAME!, name);
    formData.append(process.env.GOOGLE_FORM_EMAIL!, email);
    formData.append(process.env.GOOGLE_FORM_MESSAGE!, message);

    await fetch(
      `https://docs.google.com/forms/d/e/${process.env.GOOGLE_FORM_ID}/formResponse`,
      {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
      },
    );

    // Google Forms returns an opaque response with no-cors, but if we get here without error, it likely worked.
    // However, since we are fetching from the server, we might not need no-cors if we want to check status,
    // but Google Forms doesn't return JSON. It returns HTML.
    // So we just assume success if no error was thrown.

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error submitting to Google Forms:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
