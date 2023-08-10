import React, { useContext } from "react";
import { QuestionsContext } from "./SurveyQuestionsForm";
import { useData } from "./MoviesApiCall";

function SurveyQuestions({
  currentQuestion,
  handleInputChange,
  answer,
  handleCheckboxChange,
}) {
  const Questions = useContext(QuestionsContext);
  const { label, options, id, input } = Questions[currentQuestion];
  const { movieGenres } = useData();

  return (
    <div className="question-container">
      <div className="contents">
        <p>{label}</p>
        {input && (
          <div className="input-text--wrapper">
            <input
              type="number"
              min={1}
              max={9}
              name={id}
              value={answer[id] ? answer[id] : ""}
              onChange={handleInputChange}
              className="text-input"
            />
          </div>
        )}
        {options.length > 0 &&
          options.map((option, index) => (
            <label key={index} htmlFor={`option${index}`}>
              <input
                type="radio"
                value={option}
                checked={answer[id] === option}
                onChange={handleInputChange}
                name={id}
                id={`option${index}`}
              />
              {option}
            </label>
          ))}
        {label.includes("genre") && (
          <ul style={{ columns: 2 }} className="genre-lists--wrapper">
            {movieGenres.map((genre, index) => (
              <li key={index}>
                <label>
                  <input
                    type="checkbox"
                    name={id}
                    value={genre}
                    checked={(answer[id] || []).includes(genre)}
                    onChange={handleCheckboxChange}
                  />
                  {genre}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SurveyQuestions;
