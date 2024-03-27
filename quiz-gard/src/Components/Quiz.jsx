import React, { useState } from "react";
import { useEffect } from "react";

const Quiz = () => {
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState({});
  const [showresult, setshowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [timeIntervalId, settimeIntervalId] = useState("");
  const [status, setstatus] = useState("");

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
      const percentage = (quizScore /question.length);
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
  return (
    <section>
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
                        border p-2 border-gray-200 rounded text-sx cursor-pointer
                        ${
                          answer[question.id] === option
                            ? "border-gray-700"
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
              <div>
                <h3 className={`text-xs ${status === "Passes" ? "text-green-800" : "text-red-500"}`}>{status}</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Quiz;
