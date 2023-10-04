import React from 'react';
import useFirebase from '../utils/useFirebase';
import '../app/globals.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Snepe from '../public/icon.png';
import Image from 'next/image';
import { getDisplayName } from 'next/dist/shared/lib/utils';
import Quiz from '@/components/Quiz';

import QuizComponent from '../components/diagram';

const QuizPage = () => {
  return (
    <div>
      
      <QuizComponent />
    </div>
  );
};

export default QuizPage;
