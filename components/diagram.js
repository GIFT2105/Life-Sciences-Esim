import React, { useState } from 'react';
import questionsData from '../public/diagrams.json';
import Link from 'next/link';

const QuizComponent = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const currentQuestion = questionsData[currentQuestionIndex];

  const handleAnswerChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const checkAnswer = () => {
    if (userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
      alert('Correct Answer!');
    } else {
      alert('Wrong Answer. Please try again.');
    }
  };


  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setUserAnswer('');
    setShowResult(false);
  };

  return (
    <div className='flex flex-col  items-center justify-center text-center h-screen w-screen' > 
    <div className='bg-teal-500 h-screen w-1/2 items-center text-center justify-center flex flex-col mt-24   '>
     <h1 className='text-center font-sans text-2xl mb-10  text-black' >Diagrammatical Answers</h1>  
    <img src={currentQuestion.diagramURL} alt="Biological Diagram" />
    <p className='text-center items-center mt-9 mb-5 font-serif'   >{currentQuestion.statement}</p>
      <input placeholder='Type answer' className='w-96 text-center  ' type="text" value={userAnswer} onChange={handleAnswerChange} />
      <button className='bg-white w-56 mt-6 rounded-full' onClick={checkAnswer}>Submit Answer</button>
      {showResult && (
        <button className='bg-white text-white w-56 mt-6 rounded-full' onClick={handleNextQuestion}>Next Question</button>
      )}
      <Link className=' mr-96 mt-10 text-white   ' href={"/dashboard"}>Go back to dashboard</Link>
    
    </div>
    </div>
  );
};

export default QuizComponent;
