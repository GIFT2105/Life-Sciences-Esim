import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const Quiz = ({ data }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [userSelection, setUserSelection] = useState(null);
  const [usedQuestionIndices, setUsedQuestionIndices] = useState([]);


  const fetchQuestionsFromChatGPT = async () => {
    try {
      const response = await fetch('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', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any necessary headers, such as API keys
        },
        body: JSON.stringify({
          prompt: 'Generate quiz questions', // Customize the prompt as needed
          max_tokens: 150, // Adjust the number of tokens based on your requirement
          n: 10, // Number of questions you want to generate
        }),
      });
  
      const data = await response.json();
      return data.choices.map(choice => choice.text.trim()); // Extract questions from API response
    } catch (error) {
      console.error('Error fetching questions from ChatGPT:', error);
      return [];
    }
  };




  useEffect(() => {
    // Reset usedQuestionIndices when the quiz is restarted
    if (currentQuestionIndex === 0) {
      setUsedQuestionIndices([]);
    }

    // Get the next question index when the component mounts or currentQuestionIndex changes
    const nextQuestionIndex = getNextQuestionIndex();
    if (nextQuestionIndex !== null) {
      setUsedQuestionIndices([...usedQuestionIndices, nextQuestionIndex]);
    }
  }, [currentQuestionIndex]);

  const handleAnswerClick = (selectedOption) => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return; // Exit if the currentQuestion is undefined
    const isCorrect = currentQuestion.correctAnswer === selectedOption;
    setUserAnswers([...userAnswers, { question: currentQuestion.question, isCorrect }]);
    setUserSelection(isCorrect ? 'correct' : 'incorrect');
    if (currentQuestionIndex === 9) {
      setShowResult(true);
    } else {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setUserSelection(null);
      }, 1500); // Delay for 1.5 seconds before showing the next question
    }
  };

  const getCurrentQuestion = () => {
    const currentQuestionIdx = usedQuestionIndices[currentQuestionIndex];
    return data.questions[currentQuestionIdx];
  };

  const getRandomQuestionIndex = () => {
    const availableIndices = data.questions.map((_, index) => index)
      .filter(index => !usedQuestionIndices.includes(index));
    if (availableIndices.length === 0) return null; // No more available questions
    const randomIndex = Math.floor(Math.random() * availableIndices.length);
    return availableIndices[randomIndex];
  };

  const getNextQuestionIndex = () => {
    return getRandomQuestionIndex();
  };

  if (showResult) {
    const score = userAnswers.filter(answer => answer.isCorrect).length;
    return (
      <div>
        <h2>Your Final Score: {score}/10</h2>
<link href='/dashboard'>Back to Dashboard</link>
        <ul>
          {userAnswers.map((answer, index) => (
            <li key={index}>
              {answer.question} - {answer.isCorrect ? 'Correct' : 'Wrong'}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const currentQuestion = getCurrentQuestion();
  if (!currentQuestion) {
    // Handle case when there are no more available questions
    return (
      <div>
        <h2>No more questions available</h2>
        <p>Please restart the quiz.</p>
      </div>
    );
  }

  return (
    <div>
    <div className='flex flex-col  items-center justify-center text-center h-screen w-full' > 
    <div className='bg-teal-500 h-1/2 w-1/2 items-center text-center justify-center flex flex-col mt-24   '> 
    <h2 className='text-center font-sans text-m text-black' >{currentQuestion.question}</h2>
      <ul className='text-center items-center mt-9 font-serif'>
        {currentQuestion.options.map((option, optionIndex) => (
          <li
            key={optionIndex}
            onClick={() => handleAnswerClick(option)}
            style={{ cursor: 'pointer' }}
          >
            {option}
          </li>
        ))}
      </ul>
      {userSelection && (
        <h1 className='font-extrabold text-xl '>{userSelection === 'correct' ? 'Correct!' : 'Incorrect!'}</h1>
      )}

      <Link className=' mr-96 mt-10 text-white   ' href={"/dashboard"}>Go back to dashboard</Link>
    
    </div>

    
    </div>
    </div> 
  );
};

export default Quiz;
