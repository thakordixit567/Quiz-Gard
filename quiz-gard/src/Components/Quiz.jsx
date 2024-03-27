import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Quizheader from "./Quizheader";

const Loading = () => (
  <div className="h-[220px] w-[220px] mx-auto mt-8 flex flex-col justify-center items-center border-2 rounded-tr-[50%] rounded-bl-[50%]">
    <p className="text-xl text-gray-500">Loading...</p>
  </div>
);

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  return formattedTime;
};



const Quiz = () => {
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState({});
  const [showresult, setshowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [timeIntervalId, settimeIntervalId] = useState("");
  const [status, setstatus] = useState("");
  const Navigate = useNavigate();

  useEffect(() => {
    fetch("/quiz.json")
      .then((res) => res.json())
      .then((data) => {
        //console.log(data)
        setQuestion(data);
      });
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    settimeIntervalId(intervalId);
    return () => {
      clearInterval(intervalId);
      if (timer === 0) {
        alert("Time Is Out!");
      }
    };
  }, [timer]);

  const handleAnswerSelect = (questionId, selectedOption) => {
    //console.log(selectedOption);
    const updatedAnswers = { ...answer, [questionId]: selectedOption };
    //console.log(updatedAnswers)
    setAnswer(updatedAnswers);
  };

  const handleSubmit = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setLoading(true);

    clearInterval(timeIntervalId);

    setTimeout(()=> {
      const quizScore = calculateScore(answer);
      setScore(quizScore);
      const percentage = (quizScore /question.length) * 100;
      console.log(percentage);
      const newStatus = percentage >= 50 ? "Passed" : "Failed";
      setstatus(newStatus);
      setshowResult(true);
      setLoading(false);
    },5000)
  };

  const calculateScore = (userAnswers) => {
    const correctAnswers = question.map((question) => question.answer);
    let score = 0;
    for (const questionId in userAnswers) {
      if(userAnswers[questionId] === correctAnswers[questionId - 1]){
        score++;
      }
    }
    return score;
  }

    //Restart Quiz Button
    const restartQuiz = () => {
      setAnswer({});
      setScore(0);
      setshowResult(false);
      setLoading(false);
      setTimer(60);
      Navigate("/quiz")
    }
    
  return (
    <section>
    <Quizheader timer={timer}/>
      <div className="md:w-9/12 w-[90%] mx-auto mb-8 flex flex-col sm:flex-row justify-between items-start">
        <div className="md:w-[70%] w-full">
          {question.map((question, index) => (
            <div
              key={question.id}
              className="m-3 py-3 px-4 shadow-sm border border-gray-300
              rounded"
            >
              <p className="flex items-center rounded text-xs p-2 cursor-pointer">
                <span
                  className="h-8 w-8 bg-primary rounded-full flex items-center justify-center
                text-green-800 mr-3"
                >
                  {index + 1}{" "}
                </span>
                <span className="text-base block">{question.question}</span>
              </p>

              {/*Show Options*/}
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mt-5">
                {question.options.map((option, index) => (
                  <div
                    onClick={() => handleAnswerSelect(question.id, option)}
                    key={index}
                    className={`
                        border p-2 border-gray-200 rounded text-sx  cursor-pointer
                        ${
                          answer[question.id] === option
                            ? "bg-gray-300"
                            : ""
                        }`}
                  >
                    <p className="text-[10px] mb-1">Option {index + 1}</p>
                    <p>{option}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button
            className="bg-primary px-6 py-2 text-white rounded"
            onClick={handleSubmit}
          >
            Submit Quiz
          </button>
        </div>

        {/*Show Answer*/}
        <div className="md:w-[30%] w-full p-4">
          {showresult && (
            <div>
              <h3 className="text-2xl font-medium">Your Score:</h3>
              <div className="h-[220px] w-[220px] mx-auto mt-8 flex flex-col justify-center
              items-center border-2 rounded-tr-[50%] rounded-bl-[50%]">
                <h3 className={`text-xl ${status === "Passed" ? "text-green-500" : "text-red-500"}`}>
                {status}
                </h3>
                <h1 className="text-3xl font-bold my-2">{score * 10} 
                <span className="text-slate-800">/60</span>
                </h1>
                <p>Total Time:
                
                <span>
                 {formatTime(60 - timer)}
                 </span>
                <span> sec..</span>
                </p>
              </div>
              <button onClick={restartQuiz} className="bg-primary px-6 py-2 text-white rounded mt-8 w-full">
              Restart
              </button>
            </div>
          )}
          
          {loading && <Loading/>}
        </div>
        
      </div>
    </section>
  );
};

export default Quiz;
