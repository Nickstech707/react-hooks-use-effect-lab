import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    let timer;

    // Function to decrement the time remaining by 1 every second
    const countdown = () => {
      setTimeRemaining((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          setTimeRemaining(10);
          onAnswered(false);
          clearInterval(timer);
          return prevTime;
        }
      });
    };

    // Start the timer using setInterval
    timer = setInterval(countdown, 1000);

    // Cleanup function to stop the timer when the onAnswered prop changes
    return () => {
      clearInterval(timer);
    };
  }, [onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
