import React, { createContext, useEffect, useState } from "react";
import SurveyQuestions from "./SurveyQuestions";
import ProgressionButtons from "./ProgressionButtons";
import { Questions } from "./QuestionsData";
import RenderResults from "./RenderResults";
import { useData } from "./MoviesApiCall";

export const QuestionsContext = createContext(null);

function SurveyQuestionsForm() {
  const [currentQuestion, setcurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState({});
  const [isDone, setisDone] = useState(false);
  const [isAnswered, setisAnswered] = useState(false);
  const [recommendation, setrecommendation] = useState([]);
  const { movies } = useData();

  useEffect(() => {
    setisAnswered(answer[Questions[currentQuestion].id] !== undefined);
  }, [answer, currentQuestion]);

  function handleNextClick() {
    if (currentQuestion < Questions.length - 1)
      setcurrentQuestion((prevQuestion) => prevQuestion + 1);
    setisAnswered(false);
  }

  function handlePrevClick() {
    if (currentQuestion > 0)
      setcurrentQuestion((prevQuestion) => prevQuestion - 1);
  }
  function handleInputChange(event) {
    const { value, name } = event.target;
    setAnswer((prevAnswer) => ({ ...prevAnswer, [name]: value }));
  }

  function handleCheckboxChange(event) {
    const { value, name, checked } = event.target;
    setAnswer((prevAnswer) => {
      const updatedValue = answer[name] || [];
      if (checked) {
        updatedValue.push(value);
      } else {
        const index = updatedValue.indexOf(value);

        if (index > -1) {
          updatedValue.splice(index, 1);
        }
      }
      return { ...prevAnswer, [name]: updatedValue };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const filtered = movies.filter((movie) => {
      let meetsCriteria = true;
      const { genre_ids, vote_average } = movie;

      if (!genre_ids.includes(...answer["question3"])) {
        meetsCriteria = false;
      }
      if (vote_average < answer["question5"]) {
        meetsCriteria = false;
      }

      return meetsCriteria;
    });

    const filteredBasedOnYearPublished = filtered.filter((movie) => {
      let meetsCriteria = true;
      const { release_date } = movie;
      const currentYear = new Date().getFullYear();
      const movieYearReleased = new Date(release_date).getFullYear();

      function validateonTimeinterval(timeInterval) {
        let yearPublished = currentYear - timeInterval;
        if (yearPublished < movieYearReleased) {
          return true;
        }
      }
      switch (answer["question4"]) {
        case "Published in the last 3 years":
          meetsCriteria = validateonTimeinterval(3);
          break;
        case "Published in the last 5 years":
          meetsCriteria = validateonTimeinterval(5);
          break;
        case "Published in the last 10 years":
          meetsCriteria = validateonTimeinterval(10);
          break;
        case "Published in the last 20 years":
          meetsCriteria = validateonTimeinterval(20);
          break;
        default:
          meetsCriteria = true;
      }

      return meetsCriteria;
    });

    setrecommendation(filteredBasedOnYearPublished);
    setisDone(true);
  }

  return (
    <div className="form-wrapper">
      {isDone ? (
        <RenderResults recommendation={recommendation} />
      ) : (
        <form onSubmit={handleSubmit}>
          <QuestionsContext.Provider value={Questions}>
            <SurveyQuestions
              currentQuestion={currentQuestion}
              handleInputChange={handleInputChange}
              handleCheckboxChange={handleCheckboxChange}
              answer={answer}
            />
            <ProgressionButtons
              handleNextClick={handleNextClick}
              handlePrevClick={handlePrevClick}
              currentQuestion={currentQuestion}
              isAnswered={isAnswered}
            />
          </QuestionsContext.Provider>
        </form>
      )}
    </div>
  );
}

export default SurveyQuestionsForm;
