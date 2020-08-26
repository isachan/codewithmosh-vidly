import React, { useState, useEffect } from "react";
import { getMovies } from "../components/services/fakeMovieService.js";

const Movies = () => {
  const [movies, setMovies] = useState(undefined);

  useEffect(() => {
    setMovies(getMovies());
  }, []);

  const handleDeleteMovie = index => {};

  return (
    <div className="movies">
      <div className="movies__header">
        {movies ? (
          <p>Showing {movies.length} movies in the database.</p>
        ) : (
          <p>There are no movies in the database.</p>
        )}
      </div>
      <div className="movies__table">
        <div className="movies__row movies__row--header">
          <p className="movies__col movies__col--title">Title</p>
          <p className="movies__col movies__col--genre">Genre</p>
          <p className="movies__col movies__col--stock">Stock</p>
          <p className="movies__col movies__col--rate">Rate</p>
          <p className="movies__col movies__col--rate" />
        </div>
        {movies &&
          movies.map((movie, index) => (
            <div className="movies__row movies__row--content" key={index}>
              <p className="movies__col movies__col--title">{movie.title}</p>
              <p className="movies__col movies__col--genre">
                {movie.genre.name}
              </p>
              <p className="movies__col movies__col--stock">
                {movie.dailyRentalRate}
              </p>
              <p className="movies__col movies__col--rate">
                {movie.numberInStock}
              </p>
              <p className="movies__col movies__col--rate">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteMovie(index)}
                >
                  Delete
                </button>
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Movies;
