"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Movies } from "../../../component/dataInterface";
import { MovieCard } from "../../../component/movieCard/movieCard";
import styles from "./movie.module.css";
import Link from "next/link";

export default function Movie() {
  const [movies, setMovies] = useState<Movies[]>([]);

  const API_KEY = "421b250e9f20686f91ff2aafebe05c75";
  const BASE_URL = "https://api.themoviedb.org/";

  const fetchData = () => {
    axios
      .get(`${BASE_URL}3/movie/popular?api_key=${API_KEY}`)
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  };

  useEffect(() => {
    fetchData();
    const storedDataString = localStorage.getItem("newData");
    if (storedDataString) {
      const storedData = JSON.parse(storedDataString);
      const mergedData = [...movies, storedData];
      setMovies(mergedData);
    }
  }, []);

  console.log(movies);
  return (
    <>
      <h1 className="text-center text-6xl">Movie List</h1>
      <div className={styles.buttonContainer}>
        <button className={styles.add_DataBtn}>
          <Link href="/">Food Data</Link>
        </button>
        <button className={styles.add_DataBtn}>
          <Link href="/addMovieData">Add Movie</Link>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4">
        {movies.map((movie) => (
          <div key={movie.id} className="border border-black rounded-md p-2">
            <MovieCard
            key={movie.id}
              id={movie.id}
              title={movie.title}
              poster_path={movie.poster_path}
              popularity={movie.popularity}
              overview={movie.overview}
              phoneNumber={movie.phoneNumber}
            />
          </div>
        ))}
      </div>
    </>
  );
}
