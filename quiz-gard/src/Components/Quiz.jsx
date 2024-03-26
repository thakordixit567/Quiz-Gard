import React, { useState } from "react";
import { useEffect } from "react";

const Quiz = () => {
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState({});
  const [showresult, setshowResult] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch("/quiz.json")
      .then((res) => res.json())
      .then((data) => {
        //console.log(data)
        setQuestion(data);
      });
  }, []);
  return (
    <section>
      <div className="md:w-9/12 w-[90%] mx-auto">
        <div className="md:w-[70%] w-full">
          {
            question.map((question, index) => (
              <div key={question.id} className="m-3 py-3 px-4 shadow-sm border border-gray-300
              rounded">
                <p className="flex items-center rounded text-xs p-2 cursor-pointer">
                <span className="h-8 w-8 bg-primary rounded-full flex items-center justify-center
                text-green-800 mr-3">{index + 1} </span>
                <p className="text-base">{question.question}</p>
                </p>

                {/*Show Options*/}
                <div>
                  {
                    question.options.map((option,index) => (
                        <div key={index} className={`border border-gray-200 rounded text-sx cursor-pointer
                        ${answer[question.id] === option ? "border-gray-300" : ''}`}>
                          <p className="text-[10px] mb-1">Option {index + 1}</p>
                          <p>{option}</p>
                        </div>
                    ))
                  }
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default Quiz;
