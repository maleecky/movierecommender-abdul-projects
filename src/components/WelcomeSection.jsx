import React from "react";

function WelcomeSection({ renderSurvey }) {
  return (
    <div className="welcome-contents--container">
      <div className="welcome-note">
        <p>
          Welcome to our movie recommendation survey! Get ready for a
          personalized cinematic journey. Answer a few questions, and we'll
          curate the perfect movie selection for you
        </p>
      </div>
      <div className="primary-btn">
        <button onClick={renderSurvey}>Lets get started</button>
      </div>
    </div>
  );
}

export default WelcomeSection;
