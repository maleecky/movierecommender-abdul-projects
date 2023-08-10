import React, { useContext } from "react";
import { QuestionsContext } from "./SurveyQuestionsForm";

function ProgressionButtons({
  handleNextClick,
  handlePrevClick,
  currentQuestion,
  isAnswered,
}) {
  const Questions = useContext(QuestionsContext);
  return (
    <div className="progression-btns--container">
      <div>
        <button
          type="button"
          onClick={handlePrevClick}
          disabled={currentQuestion === 0}
          className={currentQuestion > 0 ? "active-btn" : undefined}
        >
          Prev
        </button>
        <div className="progression-icons--container">
          {Questions.map((Question, index) => {
            return (
              <div
                key={Question.id}
                className={
                  index === currentQuestion ? "active-circle" : undefined
                }
              ></div>
            );
          })}
        </div>
        {currentQuestion < Questions.length - 1 ? (
          <button
            type="button"
            onClick={handleNextClick}
            disabled={!isAnswered}
            className={isAnswered ? "active-btn" : undefined}
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            disabled={!isAnswered}
            className={isAnswered ? "active-btn" : undefined}
          >
            Done
          </button>
        )}
      </div>
    </div>
  );
}

export default ProgressionButtons;
