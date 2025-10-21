"use server";
import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { fetchAuthSession, fetchUserAttributes } from "aws-amplify/auth/server";
import { cookies } from "next/headers";

export const { runWithAmplifyServerContext } = createServerRunner({
  config: {
    Auth: {
      Cognito: {
        userPoolId: process.env.COGNITO_USER_POOL_ID!,
        userPoolClientId: process.env.COGNITO_USER_POOL_CLIENT_ID!,
      },
    },
  },
});

// 給 Server-side components 讀取用戶資料的 Amplify API
export async function AuthFetchAuthSession() {
  try {
    const currentUser = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => fetchAuthSession(contextSpec),
    });
    return currentUser;
  } catch (error) {
    console.log('Get Current User:', JSON.parse(JSON.stringify(error)));
  }
}

export async function AuthFetchUserAttributes() {
  try {
    const userAttributes = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => fetchUserAttributes(contextSpec)
    });
    return userAttributes;
  } catch (error) {
    console.log('Fetch User Attributes:', JSON.parse(JSON.stringify(error)));
  }
}
