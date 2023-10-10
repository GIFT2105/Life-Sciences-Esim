import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { FiInstagram } from 'react-icons/Fi';
import { FaTiktok, FaFacebook } from 'react-icons/Fa';
import Snepe from '../public/icon.png';
import useFirebase from '../utils/useFirebase';
import organism from '../public/icon8.jpg';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail  } from 'firebase/auth';
import '../app/globals.css';

export default function Home() {
  const { auth, firebase } = useFirebase();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Add this line
  const [isSubmitting, setIsSubmitting] = useState(false); // Add this line

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Perform the user login with email and password
      await signInWithEmailAndPassword(auth, email, password);
      // Login successful, redirect to the dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error during login:', error);
      // Handle the error, e.g., show an error message to the user.
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async () => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      alert('Password reset email sent. Please check your email.');
    } catch (error) {
      console.error('Error sending reset email:', error);
      // Handle the error, e.g., show an error message to the user.
    }
  };

  return (
    <div>
    <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-gray-300'>
    <main className='flex flex-col items-center w-full flex-1 px-20 text-center'>
    <h1 className='mt-8  text-3xl font-sans font-extrabold text-white   '><span className='text-teal-500 '>L</span>ife <span className='text-teal-500  '>S</span>ciences <span className='text-teal-500 '>E</span>-Sim</h1>    
    <div className='flex flex-row items-center justify-items-center h-screen'>
         
    <div className='flex flex-row h-4/6 w-full'> 
            <div className='bg-white w-60'>
              <h1 className='font-sans font-bold text-slate-700 '>Login</h1>
              <Image className='w-12 h-12 rounded-full mx-auto mt-10   ' src={organism} alt="Snepe"  width="743" height="773"/>
              
              <form onSubmit={handleLogin} className='items-center justify-center flex flex-col'>
            <input
              className=' mt-3 h-5 w-52 font-sans text-sm  text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-teal-500 shadow-teal-500  '
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            

            <a
                    className='mt-9 mr-28 font-sans text-xs text-black'
                    href='#'
                    onClick={handleForgotPassword}
                  >
                    Forgot password?
                  </a>

              <input
              className='h-5 w-52 mt-1   font-sans  text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-teal-500 shadow-teal-500  '
              type='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
              
            
            <button
            type="submit"
            className="bg-teal-500 mt-3 mr-36   text-xs h-3 w-16  flex items-center justify-center hover:bg-emerald-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={isSubmitting} // Disable the button during form submission
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
              </form>

            <p className='text-xs font-serif text-black mt-8  '>Follow us on our social media platforms</p>
            <div className='flex flex-row mt-7 ml-20       '> 
          <a href='https:www.instagram.com' target='blank'><FiInstagram className='mr-2'  /></a>
            <a href='https:www.tiktok.com' target='blank'><FaTiktok className='mr-2' /></a>
           <a href='https:facebook.com' target='blank' ><FaFacebook />  </a>  
             </div>

            </div>
            <div className='bg-teal-500 w-52 text-center justify-items-center'>
              <h1 className='font-sans  text-white font-extrabold'>Sign Up instead</h1>
              <p className=' font-sans text-white  mt-10 '>
              Don't have an account? <br/>
              No problem!!
              </p>
              <Image className='w-10 h-10 rounded-full mx-auto mt-10 mb-8  ' src={Snepe} alt="Snepe"  width="348" height="451"/>
           
           
    
            
            <Link className='text-white  font-sans ' href="/register" > 
        <p>Create an account </p>
      </Link>
           
           
            </div>
          </div> 
        </div>
      </main>

      <footer className="bg-white w flex  items-center justify-center w-full h-24 border-t mt-3">
      <h1 className='text-center text-sm font-sans text-teal-600  font-extrabold '>
      "Believe in yourself, for you possess the power to turn dreams into reality."-L2KA
        </h1>
      </footer>
    </div>
  </div> 
  );
  }