import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string;
  email: string;
  walletAddress: string;
  title: string[]; // Defining the type of title array as a string array
  token: string;
}

const initialState: UserState = {
  username: '',
  email: '',
  walletAddress: '',
  title: [],  // List of text
  token: '',  // Token as a string
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setWalletAddress: (state, action: PayloadAction<string>) => {
      state.walletAddress = action.payload;
    },
    setTitle: (state, action: PayloadAction<string[]>) => {
      state.title = action.payload; // Directly setting a list of titles (array of strings)
    },
    addTitle: (state, action: PayloadAction<string>) => {
      state.title.push(action.payload); // Adding a title (string) to the list
    },
    removeTitle: (state, action: PayloadAction<number>) => {
      state.title = state.title.filter((_, index) => index !== action.payload); // Removing a title by index
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload; // Setting the token
    },
    clearToken: (state) => {
      state.token = ''; // Clearing the token
    },
  },
});

export const {
  setUsername,
  setEmail,
  setWalletAddress,
  setTitle,
  addTitle,
  removeTitle,
  setToken,
  clearToken,
} = userSlice.actions;

export default userSlice.reducer;
