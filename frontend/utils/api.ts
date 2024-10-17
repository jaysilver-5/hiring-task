// /utils/api.ts

export interface AuthRequestBody {
    email: string;
    password: string;
    username?: string; // Optional for login
  }
  
  export interface AuthResponse {
    token: string;
  }
  
  export const postRequest = async (
    endpoint: string,
    body: AuthRequestBody
  ): Promise<AuthResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data = await response.json();
    return data;
  };
  