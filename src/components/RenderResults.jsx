import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function RenderResults({ recommendation }) {
  const [isLoading, setisloading] = useState(true);
  const [recommendations, setrecommendations] = useState(recommendation);
  const [movieInfo, setmovieInfo] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [index, setIndex] = useState(getRandomIndex());
  const [isVideo, setisVideo] = useState(false);
  const apiKey = "b47d184f";
  const selectedMovie = recommendations[index];

  function getRandomIndex() {
    let index = Math.floor(Math.random() * recommendations.length - 1);
    if (index < 0) {
      index = index + 1;
    }
    return index;
  }

  useEffect(() => {
    const fetchMovieInfo = async () => {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?t=${selectedMovie.title}&apikey=${apiKey}`
        );
        const data = await response.json();
        const videoResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${selectedMovie.id}/videos?api_key=edbe7e950a6d96a97b5ba567139722cf`
        );
        const videoData = await videoResponse.json();
        const movieTrailer = videoData.results.find(
          (video) => video.type === "Trailer"
        );

        if (movieTrailer) {
          setTrailerKey(movieTrailer);
        }
        setmovieInfo(data);
      } catch (error) {
        console.error("Failed to fetch data due to:", error);
        setmovieInfo(null);
      }
    };
    fetchMovieInfo();
  }, [selectedMovie]);

  useEffect(() => {
    let id = null;
    if (selectedMovie && movieInfo) {
      id = setTimeout(() => {
        setisloading(false);
      }, 2000);
    } else {
      id = setTimeout(() => {
        setTimeout(() => {
          setisloading(false);
        }, 6000);
      });
    }

    return () => {
      clearTimeout(id);
    };
  }, [selectedMovie, movieInfo]);

  function handleNextClick() {
    setisloading(true);

    setTimeout(() => {
      setisloading(false);
    }, 2000);

    setrecommendations((prevState) => {
      const newRecommendations = [...prevState];
      newRecommendations.splice(index, 1);
      return newRecommendations;
    });

    setIndex(getRandomIndex());
  }

  function playVideo() {
    setisVideo(true);
  }

  return isLoading ? (
    <div className="loading-wrapper">
      <div className="loading-icon">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.5"
            d="M19.9997 3.33325C16.7033 3.33325 13.481 4.31073 10.7402 6.14209C7.99936 7.97345 5.86315 10.5764 4.60169 13.6219C3.34023 16.6673 3.01017 20.0184 3.65326 23.2514C4.29635 26.4844 5.88369 29.4542 8.21457 31.785C10.5454 34.1159 13.5152 35.7033 16.7482 36.3463C19.9812 36.9894 23.3323 36.6594 26.3777 35.3979C29.4232 34.1365 32.0261 32.0002 33.8575 29.2594C35.6889 26.5186 36.6663 23.2963 36.6663 19.9999C36.6663 17.8112 36.2353 15.644 35.3977 13.6219C34.5601 11.5998 33.3324 9.76245 31.7848 8.21481C30.2372 6.66716 28.3998 5.4395 26.3777 4.60193C24.3556 3.76435 22.1884 3.33325 19.9997 3.33325ZM19.9997 33.3333C17.3626 33.3333 14.7847 32.5513 12.5921 31.0862C10.3994 29.6211 8.69046 27.5387 7.68129 25.1024C6.67212 22.666 6.40808 19.9851 6.92255 17.3987C7.43702 14.8123 8.70689 12.4365 10.5716 10.5718C12.4363 8.70713 14.8121 7.43725 17.3985 6.92278C19.9849 6.40831 22.6658 6.67236 25.1021 7.68153C27.5385 8.69069 29.6209 10.3997 31.0859 12.5923C32.551 14.785 33.333 17.3628 33.333 19.9999C33.333 23.5361 31.9283 26.9275 29.4278 29.428C26.9273 31.9285 23.5359 33.3333 19.9997 33.3333Z"
            fill="white"
          />
          <path
            d="M20.5 6.17561V3.84099C22.4525 3.9014 24.3794 4.31525 26.1867 5.06387C28.1481 5.87632 29.9303 7.06715 31.4316 8.56836C32.9328 10.0696 34.1236 11.8518 34.9361 13.8132C35.6847 15.6205 36.0985 17.5474 36.1589 19.4999H33.8243C33.6983 16.0127 32.2578 12.6944 29.7816 10.2183C27.3055 7.74211 23.9872 6.30162 20.5 6.17561Z"
            fill="white"
            stroke="white"
            id="rotating-circle"
          />
        </svg>
      </div>
      <small>Please wait, while we are looking for your movie</small>
    </div>
  ) : selectedMovie && movieInfo ? (
    <div>
      {isVideo && (
        <div className="iframe-container">
          <div className="video-btns">
            <button
              onClick={() => {
                setisVideo(false);
              }}
            >
              X
            </button>
          </div>
          <iframe
            width={560}
            height={315}
            src={`https://www.youtube.com/embed/${trailerKey?.key}?autoplay=1`}
            title={selectedMovie?.title}
            allowFullScreen
          ></iframe>
        </div>
      )}
      <div className="movie-wrapper">
        <div className="img-wrapper">
          <img
            src={`https://image.tmdb.org/t/p/w400${selectedMovie?.poster_path}`}
            alt={selectedMovie?.title}
          />
        </div>
        <div className="description-wrapper">
          <div className="heading-wrapper">
            <div className="heading-text" style={{ marginBottom: "6px" }}>
              {selectedMovie?.title}
            </div>
            <ul>
              <li style={{ fontSize: "14px", marginBottom: "6px" }}>
                {movieInfo?.Rated} | {movieInfo?.Runtime} |{" "}
                {selectedMovie?.genre_ids.join(", ")}
              </li>
              <li style={{ fontSize: "14px", marginBottom: "25px" }}>
                ⭐
                <span className="rating"> {selectedMovie?.vote_average} </span>{" "}
                <span className="metascore-container">
                  {movieInfo?.Metascore ?? "N/A"}
                </span>{" "}
                Metascore
              </li>
              <li>
                <span className="unique-txt">Release Date:</span>{" "}
                {selectedMovie?.release_date}
              </li>
              <li className="overview-wrapper">{selectedMovie?.overview}</li>
              <li className="actors-wrapper">
                <span className="unique-txt">Directors</span>:{" "}
                {movieInfo?.Director} |
                <span className="unique-txt"> Stars: </span>
                {movieInfo?.Actors}
              </li>
              <li>
                <span className="unique-txt">Votes</span>:{" "}
                {movieInfo?.imdbVotes}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="plain-btn">
        <div className="link-btns">
          <div className="primary-btn">
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(
                selectedMovie?.title
              )}`}
              target="_blank"
              rel="noopenner noreferrer"
            >
              Search On Google
            </a>
          </div>
          <div className="primary-btn">
            <button className="link-btn" onClick={playVideo}>
              Watch Trailer
            </button>
          </div>
        </div>
        <div className="info-wrapper">
          <button
            style={{ marginBottom: "10px" }}
            className={
              recommendations.length === 1 ? "disabled-next-btn" : "next-btn"
            }
            disabled={recommendations.length === 1}
            onClick={() => {
              handleNextClick();
            }}
          >
            Next
          </button>
          {recommendations.length === 1 && (
            <div className="info-container">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 17H13V11H11V17ZM12 9C12.2833 9 12.521 8.904 12.713 8.712C12.905 8.52 13.0007 8.28267 13 8C13 7.71667 12.904 7.479 12.712 7.287C12.52 7.095 12.2827 6.99933 12 7C11.7167 7 11.479 7.096 11.287 7.288C11.095 7.48 10.9993 7.71733 11 8C11 8.28333 11.096 8.521 11.288 8.713C11.48 8.905 11.7173 9.00067 12 9ZM12 22C10.6167 22 9.31667 21.7373 8.1 21.212C6.88333 20.6867 5.825 19.9743 4.925 19.075C4.025 18.175 3.31267 17.1167 2.788 15.9C2.26333 14.6833 2.00067 13.3833 2 12C2 10.6167 2.26267 9.31667 2.788 8.1C3.31333 6.88333 4.02567 5.825 4.925 4.925C5.825 4.025 6.88333 3.31267 8.1 2.788C9.31667 2.26333 10.6167 2.00067 12 2C13.3833 2 14.6833 2.26267 15.9 2.788C17.1167 3.31333 18.175 4.02567 19.075 4.925C19.975 5.825 20.6877 6.88333 21.213 8.1C21.7383 9.31667 22.0007 10.6167 22 12C22 13.3833 21.7373 14.6833 21.212 15.9C20.6867 17.1167 19.9743 18.175 19.075 19.075C18.175 19.975 17.1167 20.6877 15.9 21.213C14.6833 21.7383 13.3833 22.0007 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
                  fill="red"
                />
              </svg>
              No more movies present in our list reflesh again
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="no-movie--msg">
      <p>
        Sorry, we dont have a movie that meets your criteria Check your
        connection,<span>Try to refresh if persist change movie ratings</span>
      </p>
      <a href="./">Refresh</a>
    </div>
  );
}
