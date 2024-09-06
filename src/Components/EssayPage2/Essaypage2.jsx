import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar'; // Adjust the path as needed
import { FaBook } from 'react-icons/fa'; // Using react-icons for the content icon
import { useNavigate } from 'react-router-dom';
import Timer from './Timer'; // Adjust the path as needed
import axios from 'axios';
import NavigatePage from '../NavigatePage/NavigatePage';
import BASE_URL from '../../../localhost';
const EssayPage2 = () => {
  const navigate = useNavigate();
  const [ended,setEnded]=useState(false)
  const [essayContent, setEssayContent] = useState("Loading...");
  const  getQuestion1=async() =>{
    const token = sessionStorage.getItem("token");
    let headers = { Authorization: `Bearer ${token}` };
    const result = await axios.get(`${BASE_URL}/user/getQuestion2`, { headers });
    return result;
  }
  
  useEffect(() => {

    getQuestion1().then(result=>{
      if(result.data.question)
      {
        setEssayContent(result.data.question)
      }
      else
      {
        // Set Error
      }
    })
    
    }

  , [setEssayContent,setEnded]);
  if(ended)
    {
      return (
  
        <NavigatePage title="Question 1 already submitted!"
              message="It seems that you have submitted question 1 already. If not please contanct admin."
              goToPath="/summary"
              buttonText="End test"></NavigatePage>
          )
  
    }

  const handleTimeUp = () => {
    navigate("/essay-audio-2")
  };

  const handleNext = () => {
    const result = window.confirm("Are you sure you want to start writing your answer?");
    if(result)
    {
      navigate("/essay-audio-2")
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="p-4 flex-grow flex">
        {/* First Column */}
        <div className="w-1/2 p-4 border-r border-gray-300 overflow-y-auto bg-yellow-100">
          <div className="flex items-center mb-4">
            <FaBook className="text-2xl text-brown-300 mr-2" />
            <h1 className="text-3xl font-bold">Essay Content</h1>
          </div>
          {essayContent.trim().split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Second Column */}
        <div className="w-1/2 p-4 flex flex-col items-center justify-start">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">Give yourself 3 minutes to read this essay.</h2>
            <Timer initialTime={180} onTimeUp={handleTimeUp} />
            <button
              onClick={handleNext}
              className="bg-yellow-300 text-brown-600 p-3 rounded-lg"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EssayPage2;
