import './JokePage.css';
import { Link } from 'react-router-dom';
import { useState, useEffect }  from 'react';

function JokePage({joke}) {
  const [currentJoke, setJoke] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getjoke()
  }, [])

  function getjoke() {
    fetch(`https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Spooky?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`, {
      method: 'GET', 
      headers: {'Content-Type': 'application/json'}
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
    .catch(error => setError(error.message))
    ;}

    if (error) {
      return <p className="error-message">{error}</p>;
    }
      return (
        <div className="joke-page">
      <h1>Joke Page</h1>
      <section className="joke-area">
        <h3>{currentJoke}</h3>
      </section> 
      <button className='get-joke' aria-label="get a joke" onClick={() => getjoke()}>
          Tell Me A Joke
      </button>
    </div>
    )
  }

export default JokePage;


