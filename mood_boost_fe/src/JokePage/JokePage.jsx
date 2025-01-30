import FloatingCircles from '../HomePage/FloatingCircles';
import './JokePage.css';
import { useState, useEffect } from 'react';

function JokePage({ joke, user, logUserActivity }) {
  const [currentJoke, setJoke] = useState(null);
  const [error, setError] = useState(null);

  function handleClick() {
    logUserActivity(user, 22);
  }

  useEffect(() => {
    getjoke();
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
      .catch((error) =>
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
      <FloatingCircles className="floating-circles" />
      <h1 id="joke-title">Laugh It Up: Your Daily Dose of Chuckles</h1>
      <p id="joke-description">
        Welcome to the joke page, where bad puns, dad jokes, and
        knee-slappers come to find their forever home! Whether you're
        looking for a laugh-out-loud moment or just an eye-roll-worthy
        groan, we’ve got you covered.
      </p>
      <div className="joke-container">
        <section className="joke-area">
          <h2 className="current-joke">{currentJoke}</h2>
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
    </div>
  );
  
}

export default JokePage;
