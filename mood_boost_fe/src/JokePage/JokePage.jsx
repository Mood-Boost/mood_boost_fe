import './JokePage.css';
import { useState, useEffect, useRef } from 'react';

function JokePage({ joke, user, logUserActivity }) {
  const [currentJoke, setJoke] = useState(null);
  const [error, setError] = useState(null);
  const fetchCalled = useRef(false); 

  function handleClick() {
    logUserActivity(user, 4);
  }

  useEffect(() => {
    console.log('useEffect triggered');
    if (!fetchCalled.current) {
      console.log('Fetching joke...');
      getjoke(); 
      fetchCalled.current = true;
    }
  }, []);

  function getjoke() {
    fetch(
      `https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Spooky?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch Jokes. Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.type === 'single') {
          setJoke(data.joke);
        } else {
          setJoke(`${data.setup} - ${data.delivery}`);
        }
      })
      .catch(() =>
        setError(
          'Something went wrong. There was an issue coming up with something humorous to say. Please try again in a few minutes.'
        )
      );
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="joke-page">
      <h1>Joke Page</h1>
      <section className="joke-area">
        <h3>{currentJoke}</h3>
      </section>
      <button
        className="get-joke"
        aria-label="get a joke"
        onClick={() => {
          getjoke();
          handleClick();
        }}
      >
        Tell Me A Joke
      </button>
    </div>
  );
}

export default JokePage;