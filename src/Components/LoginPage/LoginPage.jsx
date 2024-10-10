import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import Spinner from '../Spinner/Spinner'; // Import the Spinner component
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import BASE_URL from '../../../localhost';
const sharedClasses = {
  border: 'border border-brown-300 dark:border-yellow-700',
  textLight: 'text-yellow-900 dark:text-brown-200',
  textDark: 'text-brown-300 dark:text-yellow-700',
  bgLight: 'bg-brown-300 dark:bg-yellow-700',
  bgDark: 'bg-yellow-700 dark:bg-brown-300',
  p: 'p-2',
  input: 'border border-brown-300 dark:border-yellow-700 p-2 w-full rounded-lg',
  checkbox: 'mr-2',
  button: 'bg-yellow-300 dark:bg-brown-600 text-yellow-900 dark:text-brown-200 p-2 rounded-lg w-full cursor-pointer',
  buttonDisabled: 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed',
  list: 'list-disc pl-5 text-left',
};

const LoginPage = () => {

  const navigate=useNavigate()


  useEffect(()=>{  
    sessionStorage.clear();
  },[])

  const [email, setEmail] = useState('');
  const [quizCode, setQuizCode] = useState('');
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const isFormValid = email && quizCode && agree;

  const validateUser = async (email, quizCode) => {
    setLoading(true);
    setLoginError(''); // Clear previous error message before new request
    try {
      const body = {
        email: email,
        quizCode: quizCode,
      };
      const result = await axios.post(`${BASE_URL}/user/login`, body);
      if (  result&& result.data&&result.data.token) {

        sessionStorage.setItem("token",result.data.token)
        // const ipcRenderer=window.ipcRenderer
        // ipcRenderer.send('sessionStorage',sessionStorage.getItem("token"))

        sessionStorage.setItem("group",result.data.group)
        navigate('/welcome')
      }

    } 
    
    catch (error) {

     
     if(error.response)
     {
      setLoginError(error.response.data.errorMessage)
      setLoading(false);


     }
     else
     {
      setLoginError("An error occured while reaching server, Please contact admin.")
      setLoading(false)
     }

    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    validateUser(email, quizCode);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100 dark:bg-gray-800">
      <Navbar />
      <div className="flex-grow flex">
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center bg-gray-200 border-r border-gray-300 dark:bg-gray-700 dark:border-gray-600">
          <h2 className={`text-2xl font-bold ${sharedClasses.textDark} mb-4`}>Instructions</h2>
          <ul className={`mb-4 ${sharedClasses.list}`}>
            <li>Read the instructions carefully before starting.</li>
            <li>Ensure you have a stable internet connection.</li>
            <li>Make sure your quiz code is correct.</li>
            <li>Do not refresh the page during the quiz.</li>
            <li>Contact support if you face any issues.</li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center bg-gray-100 dark:bg-gray-800">
          <h2 className={`text-2xl font-bold ${sharedClasses.textDark} mb-4`}>Login Form</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className={`block ${sharedClasses.textDark}`} htmlFor="email">Email address</label>
              <input
                className={sharedClasses.input}
                type="email"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className={`block ${sharedClasses.textDark}`} htmlFor="quiz-code">Quiz Code</label>
              <input
                className={sharedClasses.input}
                type="text"
                id="quiz-code"
                placeholder="Enter quiz code"
                value={quizCode}
                onChange={(e) => setQuizCode(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="agree"
                className={sharedClasses.checkbox}
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                required
              />
              <label htmlFor="agree" className={`text-brown-300 dark:text-yellow-700`}>I agree to the terms and conditions</label>
            </div>
            
            {loginError && (
              <p className="text-red-500 mb-4">{loginError}</p> // Display error message if loginError is set
            )}

            <button
              className={`${sharedClasses.button} ${!isFormValid ? sharedClasses.buttonDisabled : ''}`}
              type="submit"
              disabled={!isFormValid || loading}
            >
              <Spinner loading={loading} /> {/* Use the Spinner component */}
              {!loading && 'Login'} {/* Show "Login" text if not loading */}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
