import { useState } from "react";
import "./QuizCard.css"; // 引入CSS文件

const questions = [
  { question: "What is water?", options: ["H2O", "Don’t know", "H2OO"], answer: 0 },
  // 你可以继续添加问题
];

export default function QuizCard() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswer = (index) => {
    setSelected(index);
    setIsCorrect(index === questions[currentQuestion].answer);
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelected(null);
        setIsCorrect(null);
      }
    }, 1000);
  };

  return (
    <div className="quiz-container">
      
 
      <div className="quiz-card">
        <h2 className="quiz-question">Question {currentQuestion + 1}/{questions.length}</h2>
        <p className="quiz-text">{questions[currentQuestion].question}</p>
        <div className="quiz-options">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`quiz-button ${
                selected === index ? (isCorrect ? "correct" : "wrong") : "default"
              }`}
              onClick={() => handleAnswer(index)}
              disabled={selected !== null}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
