// useFirebase.js
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import app from '../utils/firebase'; // Import the Firebase app instance

const useFirebase = () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const authInstance = getAuth(app);
    setAuth(authInstance);

    // Optional: Perform any other Firebase-related setup here

    // Cleanup on unmount
    return () => {
      // Add any necessary cleanup logic here if needed
    };
  }, []);

  return { auth, firebase: app };
};

export default useFirebase;