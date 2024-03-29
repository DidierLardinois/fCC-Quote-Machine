import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect, useCallback } from 'react'; // Import useState, useEffect and useCallback hooks
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import quotes from './quotes.json'; // Import quotes from local JSON file

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

function QuoteMachine() {
  const [remainingIndices, setRemainingIndices] = useState(
    Array.from({ length: quotes.length }, (_, i) => i)
  );
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');


  const fetchQuote = useCallback(() => {
    if (remainingIndices.length === 0) {
      // All quotes have been shown, reset remainingIndices
      setRemainingIndices(Array.from({ length: quotes.length }, (_, i) => i));
    }

    const randomIndex = Math.floor(Math.random() * remainingIndices.length);
    const quoteIndex = remainingIndices[randomIndex];
    const newQuote = quotes[quoteIndex];

    setQuote(newQuote.quote);
    setAuthor(newQuote.author);

    // Remove the shown index from remainingIndices
    setRemainingIndices(remainingIndices.filter(i => i !== quoteIndex));
  }, [remainingIndices, setRemainingIndices, setQuote, setAuthor]);

  useEffect(() => {
    const intervalId = setInterval(fetchQuote, 5000);  // Change quotes every 5 seconds

    return () => {
      clearInterval(intervalId);  // Clean up on unmount
    };
  }, [fetchQuote]);  // Add fetchQuote to the dependencies array

  return (
    <div id="quote-box">
      <p id="text">{quote}</p>
      <p id="author">{author}</p>
      <div id="button-container">
        <button id="new-quote" onClick={fetchQuote}>New quote</button>
        <a id="tweet-quote" href="twitter.com/intent/tweet"><i class="fab fa-twitter"></i></a>
      </div>
    </div>
  );
}

export default QuoteMachine;

