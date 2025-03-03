import "./QuotePage.css";
import { useState, useEffect } from 'react';
import FloatingCircles from "../HomePage/FloatingCircles";

function QuotePage({user, logUserActivity}) {
  const [quote, setQuote] = useState(null)

  function handleClick() {
    logUserActivity(user, 23)
  }

  function fetchQuote() {
    fetch('https://api.realinspire.live/v1/quotes/random')
    .then(response=> {
      if (!response.ok) {
        throw new Error("Failed to fetch quote")
      }
      return response.json()
    })
    .then(data => {
      setQuote(data[0])
    })
    .catch(error => {
      console.error("Error fetching quote", error)
    })
  }

  useEffect(() => {
    fetchQuote()
  }, [])

  return (
    <div className="quote-page">
      <FloatingCircles className="quote-circles"/>
      {quote ? (
        <>
          <div className="quote-header">
            <h1 id="quote-h1">Find Your Spark: Daily Inspiration to Boost Your Mood</h1>
            <p id="quote-description">Welcome to your daily dose of inspiration! Here, you'll find uplifting quotes to brighten your day, fuel your motivation, and spark positivity. Whether you're looking for a little encouragement, a fresh perspective, or just a reason to smile, let these words remind you of the strength, hope, and beauty in every moment.</p>
          </div>
          <div className="quote-container">
            <h2 id="speech-bubble">
              <span id="quote-content">{quote.content}</span>
              <span id="quote-author">{quote.author}</span>
            </h2>
            <button className="new-quote" onClick={() => {
              fetchQuote()
              handleClick()
            }}>
            Generate New Quote</button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default QuotePage;