import React, { useState } from "react";
import WelcomeSection from "./components/WelcomeSection";
import FooterComponent from "./components/FooterComponent";
import SurveyQuestionsForm from "./components/SurveyQuestionsForm";
import { useGenreData } from "./components/GenresApiCall";

function App() {
  const [start, isstart] = useState(false);
  const { movieGenres } = useGenreData();

  function renderSurvey() {
    if (movieGenres) isstart(true);
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
