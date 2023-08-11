import { useEffect, useState } from "react";

export const useGenreData = () => {
  const [movieGenres, setmovieGenres] = useState([]);

  useEffect(() => {
    const apiKey = "edbe7e950a6d96a97b5ba567139722cf";
    const genreApi = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

    async function getGenrePromise() {
      try {
        const response = await fetch(genreApi);
        const data = await response.json();
        const { genres } = data;
        return genres;
      } catch (error) {
        throw new Error("Please, Try again");
      }
    }

    Promise.resolve(getGenrePromise()).then((data) => {
      data.forEach((genre) => {
        setmovieGenres((prevGenres) => [...prevGenres, genre.name]);
      });
    });
  }, []);

  return { movieGenres };
};
