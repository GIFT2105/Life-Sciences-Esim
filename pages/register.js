import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import organism from '../public/icon8.jpg';
import Image from 'next/image';
import '../app/globals.css';
import Sky from '../public/skull.jpg'

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Your Firebase config object
    const firebaseConfig = {
      apiKey: "AIzaSyAf59qPlFs0dBE1yioW6A7fZ22-K-yuigM",
      authDomain: "quiz-app-cd3e0.firebaseapp.com",
      projectId: "quiz-app-cd3e0",
      storageBucket: "quiz-app-cd3e0.appspot.com",
      messagingSenderId: "404427265721",
      appId: "1:404427265721:web:34329402474e5097452d68",
      measurementId: "G-DPFE6FDRWX"
    };

    // Initialize Firebase if not already initialized
    try {
      initializeApp(firebaseConfig);
    } catch (err) {
      // Firebase is already initialized
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Get the existing Firebase auth instance
      const auth = getAuth();

  // Perform the user registration with email and password
const userCredential = await createUserWithEmailAndPassword(auth, email, password);

// Set the display name for the user
await updateProfile(auth.currentUser, {
  displayName: `${name} ${surname}`,
});

      // Registration successful. You can redirect to a success page or dashboard here.
      router.push('/dashboard');
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle the error, e.g., show an error message to the user.
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-gray-300'>
      <main className='flex flex-col items-center w-full flex-1 px-20 text-center'>
        <h1 className='mt-8 text-3xl font-sans font-extrabold text-white'>Register</h1>
        <div className='flex flex-row items-center justify-items-center h-screen'>
          <div className='flex flex-row h-4/6 w-full'>
            <div className='bg-white  w-60'>
              <h1 className='font-serif  font-semibold text-2xl text-black mt-20   '>Register</h1>
              <Image className='w-12 h-12 rounded-full mx-auto mt-16        ' src={organism} alt="Snepe" width="743" height="773" />
              
              <form onSubmit={handleRegister}>
              <input 
              className=' mt-3 bg-teal-500 h-5 w-56  font-sans text-sm text  text-black placeholder-white rounded-md py-2 pl-10 ring-1 ring-teal-500 shadow-teal-500  '
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            
            <input
            className=' mt-3 bg-teal-500 h-5 w-56  font-sans text-sm text  text-black placeholder-white rounded-md py-2 pl-10 ring-1 ring-teal-500 shadow-teal-500  '            
              type="text"
              placeholder="Enter your surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />




                <input
                  className=' mt-3 bg-teal-500 h-5 w-56  font-sans text-sm text  text-black placeholder-white rounded-md py-2 pl-10 ring-1 ring-teal-500 shadow-teal-500  '
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  className='h-5 w-56 bg-teal-500    mt-1   font-sans  text-sm leading-6 text-black placeholder-white rounded-md py-2 pl-10 ring-1 ring-teal-500 shadow-teal-500  '
                  type='password'
                  placeholder='Enter your password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />


                <button
                  type="submit"
                  className="bg-teal-500  mt-2 ml-20    font-sans  text-xs h-3 w-16  flex items-center justify-center hover:bg-emerald-200 text-gray-600     font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  disabled={isSubmitting} // Disable the button during form submission
                >
                  {isSubmitting ? 'Registering...' : 'Register'}
                </button>




              </form>
            </div>

            <div className='bg-gray-400  w-52 text-center justify-items-center'>
              <Image className='w-full h-full ' alt='Skull' src={Sky} width={6000} height={6000} />

            </div>


          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;