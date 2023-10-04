import React from 'react';
import Quiz from '../components/Quiz';
import '../app/globals.css';
import Link from 'next/link';

const matric = ({ data }) => {
  return (
    <div>
      <Quiz data={data} />
      
    </div>
  );
};

export async function getStaticProps() {
  const data = require('../public/quizData.json');
  return {
    props: {
      data,
    },
  };
}


export default matric;