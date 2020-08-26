import React, { useState, useEffect } from "react";
import { getMovies } from "../components/services/fakeMovieService.js";
import { getGenres } from "../components/services/fakeGenreService.js";
import Pagination from "./common/Pagination";
import ListGroup from "./common/ListGroup";
import { paginate } from "../utils/paginate";
import MovieTables from "./MovieTables.jsx";

import _ from "lodash";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState([]);
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });

  const handleDelete = movie => {
    const newMovies = movies.filter(m => m._id !== movie._id);
    setMovies(newMovies);
  };

  const handleLike = movie => {
    // const newMovies = [...movies];
    const index = movies.indexOf(movie);
    // newMovies[index] = {...newMovies[index]};
    const newMovies = [...movies];
    newMovies[index].liked = !newMovies[index].liked;
    // console.log(movies);
    setMovies(newMovies);
  };

  const handlePageChange = page => {
    setCurrentPage(page);
    // console.log(page);
  };

  const handleSort = sortColumn => {
    setSortColumn(sortColumn);
    // console.log(path);
  };

  const handleGenreSelect = genre => {
    // if (genre === "All") {
    // setSelectedGenre("All");
    // } else {
    setSelectedGenre(genre);
    setCurrentPage(1);
    // console.log(genre);
    // }
  };

  useEffect(() => {
    setMovies(getMovies());
    setGenre([{ _id: "", name: "All Genres" }, ...getGenres()]);
  }, []);

  // useEffect(() => {
  //   setCurrentPage(page);
  //   console.log(currentPage);
  // }, [handlePageChange]);

  const getPagedData = () => {
    const filtered =
      selectedGenre && selectedGenre._id
        ? movies.filter(m => m.genre._id === selectedGenre._id)
        : movies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const moviess = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: moviess };
  };

  if (movies && movies.length === 0)
    return <p>There are no movies in the database.</p>;

  const { totalCount, data: moviess } = getPagedData();

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <ListGroup
            items={genre}
            selectedItem={selectedGenre}
            onItemSelect={handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {totalCount} movies in the database.</p>
          <MovieTables
            movies={moviess}
            sortColumn={sortColumn}
            onLike={handleLike}
            onDelete={handleDelete}
            onSort={handleSort}
          />
          {movies && (
            <Pagination
              itemCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Movies;
