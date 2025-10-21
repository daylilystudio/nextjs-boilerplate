export async function getSheets(sheetId: string, tabNames: string[]) {
  const apiUrl = `${process.env.NEXT_PUBLIC_STORE}/api/google-sheets`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sheetId: sheetId,
        tabNames: tabNames,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData.message);
      return { error: `API request failed: ${errorData.message}` };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch Error:', error);
    return { error: 'Failed to connect to the API server.' };
  }
}
