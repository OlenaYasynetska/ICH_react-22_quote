import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Асинхронный thunk для получения случайной цитаты
export const fetchRandomQuote = createAsyncThunk(
  'quote/fetchRandomQuote',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://quotes-random-a5kc.onrender.com/api/quotes/random');
      // Новый API возвращает объект с полями q (quote) и a (author)
      const data = response.data;
      return {
        text: data.q,
        author: data.a,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  text: '',
  author: '',
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomQuote.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchRandomQuote.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.text = action.payload.text;
        state.author = action.payload.author;
      })
      .addCase(fetchRandomQuote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Ошибка загрузки цитаты';
      });
  },
});

export default quoteSlice.reducer;
