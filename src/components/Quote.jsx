import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRandomQuote } from '../features/quote/quoteSlice';
import styles from './Quote.module.css';

const Quote = () => {
  const dispatch = useDispatch();
  const { text, author, status, error } = useSelector((state) => state.quote);

  useEffect(() => {
    dispatch(fetchRandomQuote());
  }, [dispatch]);

  const handleNewQuote = () => {
    dispatch(fetchRandomQuote());
  };

  return (
    <div className={styles.quoteContainer}>
      <h1 className={styles.title}>Random Quote Generator</h1>
      {status === 'loading' && <p className={styles.loading}>Загрузка...</p>}
      {status === 'failed' && <p className={styles.error}>Ошибка: {error}</p>}
      {status === 'succeeded' && (
        <>
          <p className={styles.text}>&quot;{text}&quot;</p>
          <p className={styles.author}>- {author}</p>
        </>
      )}
      <button className={styles.button} onClick={handleNewQuote} disabled={status === 'loading'}>
        Новая цитата
      </button>
    </div>
  );
};

export default Quote;
