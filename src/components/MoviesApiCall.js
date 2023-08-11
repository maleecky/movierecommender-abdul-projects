import { useEffect, useState } from "react";

export const useData = () => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const apiKey = "edbe7e950a6d96a97b5ba567139722cf";
    const genreApi = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
    const maxPages = 500;
    const moviePromises = [];

    async function getMoviesPromises(page) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
        );
        const data = await response.json();
        const { results } = data;
        return results;
      } catch {
        throw new Error("Please, Try again");
      }
    }

    for (let i = 1; i <= maxPages; i++) {
      moviePromises.push(getMoviesPromises(i));
    }
    Promise.all(moviePromises).then((movieData) => {
      const moviesObjects = [];
      movieData.forEach((item) => {
        moviesObjects.push(...item);
      });

      fetch(genreApi)
        .then((response) => response.json())
        .then((data) => {
          const genreMap = {};
          data.genres.forEach((genre) => {
            genreMap[genre.id] = genre.name;
          });
          const updatedMovieObjects = moviesObjects.map((movie) => {
            let { genre_ids } = movie;
            movie.genre_ids = genre_ids.map((id) => genreMap[id]);
            return movie;
          });

          setMovies(updatedMovieObjects);
        })
        .catch(() => {
          throw new Error(
            "Sorry, We encounter a problem during the fetch, Please try to reflesh"
          );
        });
    });
  }, []);

  return { movies };
};
