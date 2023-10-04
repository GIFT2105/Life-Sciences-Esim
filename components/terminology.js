import React, { useState } from 'react';
import '../app/globals.css';
import Link from 'next/link';

const Quizterms = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [result, setResult] = useState('');

  const checkAnswer = () => {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      setResult('Correct!');
    } else {
      setResult(`Wrong! The correct answer is: ${correctAnswer}`);
    }
  };

  const nextQuestion = () => {
    setResult('');
    setUserAnswer('');
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  if (currentQuestionIndex >= questions.length) {
    return <p>Quiz Completed!</p>;
  }

  return (
    <div className='flex flex-col  items-center justify-center text-center h-screen w-full' > 
    <div className='bg-teal-500 h-1/2 w-1/2 items-center text text-center justify-center flex flex-col mt-24   '>
      <h1 className='text-center font-sans text-m text-black'  >Terminology Section</h1>
      <p className='text-center items-center mt-9 font-serif'   >{questions[currentQuestionIndex].question}</p>
      <input className='text-center w-96 items-center mt-9 font-serif'
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Enter your answer"
      />
      <button className='bg-white text-black w-56 mt-6 rounded-full'
      onClick={checkAnswer}
      >Check Answer</button>
      <p>{result}</p>
      <button className='bg-white text-black w-56 mt-4 rounded-full'
       onClick={nextQuestion}
      >Next Question</button>


      <Link className='bg-white text-black w-32 mr-96  mt-6 mb-1 rounded-full' href={"/dashboard"}>Back to dashboard</Link>
      </div>
      
    </div>
  );
};




export default Quizterms;
