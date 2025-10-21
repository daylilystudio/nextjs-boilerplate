'use server';
import { AuthFetchAuthSession } from '@/utils/amplify';

export async function getAuthsMe(include?: string) {
  try {
    const session = await AuthFetchAuthSession();
    const accessToken = session?.tokens?.accessToken;

    if (!accessToken) {
      console.log('getAuthsMe: User is not authenticated.');
      return null;
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auths/me${include ? `?include=${include}` : ''}`;
    console.log(`Calling API: ${apiUrl}`);
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken.toString()}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}): ${errorText}`);
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getMyProfile:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unknown error occurred while fetching user profile.');
  }
}
