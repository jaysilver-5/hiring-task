// hooks/useAuth.ts
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { setToken, setTitle } from '../features/user/userSlice';
import { RootState } from '../store';
import { parseJwt } from '../utils/jwtUtils'; // Move JWT parsing to utils

export const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token, title: titles } = useSelector((state: RootState) => state.user);

  const refreshToken = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setToken(data.accessToken));
      } else {
        router.push('/auth/login');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      router.push('/auth/login');
    }
  };

  const fetchTitles = async () => {
    if (token) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/title`, {
          method: 'GET',
          headers: { Authorization: token },
        });

        if (response.ok) {
          const data = await response.json();
          dispatch(setTitle(data));
        }
      } catch (error) {
        console.error('Error fetching titles:', error);
      }
    }
  };

  const tokenIsValid = () => {
    const decodedToken = parseJwt(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken && decodedToken.exp > currentTime;
  };

  return { token, titles, refreshToken, fetchTitles, tokenIsValid };
};
