// hooks/usePostTitle.ts
import { useDispatch, useSelector } from 'react-redux';
import { setTitle } from '../features/user/userSlice';
import { RootState } from '../store';
import { useAuth } from './useAuth'; // Import token management logic

export const usePostTitle = () => {
  const dispatch = useDispatch();
  const { token, title: titles } = useSelector((state: RootState) => state.user);
  const { tokenIsValid, refreshToken } = useAuth();

  const postTitle = async (newTitle: string) => {
    if (!newTitle || !token) return;

    try {
      if (!tokenIsValid()) {
        await refreshToken();
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/title`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ title: newTitle }),
      });

      if (response.ok) {
        const postedTitle = await response.json();
        dispatch(setTitle([...titles, postedTitle]));
      }
    } catch (error) {
      console.error('Error posting title:', error);
    }
  };

  return { postTitle };
};
