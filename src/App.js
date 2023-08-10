import React, { useState } from "react";
import WelcomeSection from "./components/WelcomeSection";
import FooterComponent from "./components/FooterComponent";
import SurveyQuestionsForm from "./components/SurveyQuestionsForm";
import { useData } from "./components/MoviesApiCall";

function App() {
  const [start, isstart] = useState(false);
  const { movies, movieGenres } = useData();

  function renderSurvey() {
    if (movies && movieGenres) isstart(true);
  }
  return (
    <div className="main-wrapper">
      <header>
        <h1 className="main-heading">Movie Recommender</h1>
      </header>
      <section>
        <div className="section-wrapper">
          {start ? (
            <SurveyQuestionsForm />
          ) : (
            <WelcomeSection renderSurvey={renderSurvey} start={start} />
          )}
        </div>
      </section>
      <footer>
        <FooterComponent />
      </footer>
    </div>
  );
}

export default App;
