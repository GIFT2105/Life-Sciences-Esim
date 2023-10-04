import React from 'react';
import useFirebase from '../utils/useFirebase';
import '../app/globals.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Snepe from '../public/icon.png';
import Image from 'next/image';
import { getDisplayName } from 'next/dist/shared/lib/utils';
import Quizterms from '@/components/terminology';




const preMatric = ({questions}) => {
  const { auth } = useFirebase();
  const displayName = auth?.currentUser?.displayName || ''; // Access displayName using auth.currentUser
 
    return (
      <div>
        <Quizterms questions={questions} />
      </div>
    );
  };
  export async function getStaticProps() {
    const questions = require('../public/terminology.json');
    return {
      props: {
        questions,
      },
    };
  }


  export default preMatric;