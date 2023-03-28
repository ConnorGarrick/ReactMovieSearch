import React from 'react';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

function MovieList() {
  const [movieList, setMovieList] = useState([
    {
      id: 1,
      name: 'Iron Man',
      img: 'http://www.movienewsletters.net/photos/277216R1.jpg',
      year: 2008,
    },
    {
      id: 2,
      name: 'Iron Man 3',
      img: 'https://www.movienewsletters.net/photos/156876R1.jpg',
      year: 2013,
    },
    {
      id: 3,
      name: 'Man of Steel',
      img: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRLtBapSgavJgGxTgMgC-Q-9DRivYiyOw9EXeFeX7iXiVvYytGz',
      year: 2013,
    },
    {
      id: 4,
      name: 'Iron Man 2',
      img: 'http://www.movienewsletters.net/photos/065116R1.jpg',
      year: 2010,
    },
  ]);
  const [savedList, setSavedList] = useState([]);
  const [search, setSearch] = useState(' ');
  const [searchYear, setSearchYear] = useState(' ');
  const [errorCode, setErrorCode] = useState('');

  useEffect(() => {
    setSavedList(movieList);
    setSearch('');
    setSearchYear('');
  }, []);

  useEffect(() => {
    if (movieList.length == 0) {
      setErrorCode('No movies match your search');
    } else {
      setErrorCode('');
    }
  }, [movieList]);

  useEffect(() => {
    if (searchYear.toString().length == 0) {
      setMovieList(savedList);
    }
    if (search.length > 0 && searchYear.toString().length == 0) {
      handleSearch();
    }
  }, [searchYear]);

  useEffect(() => {
    if (search.length == 0) {
      setMovieList(savedList);
    }
    if (search.length == 0 && searchYear.toString().length > 0) {
      handleSearchYear();
    }
  }, [search]);

  const searchList = (value) => {
    const searchValue = Object.values(value)[1].toLowerCase();

    if (searchValue.includes(search.toLowerCase().trim())) {
      return true;
    }
    return false;
  };

  const searchListYear = (value) => {
    const searchYearValue = Object.values(value)[3];

    if (searchYearValue == searchYear) {
      return true;
    }
    return false;
  };

  const handleSearch = () => {
    if (search.length > 0 && movieList.length != 0) {
      setMovieList(savedList.filter(searchList));
    }
    if (
      (search.length == 0 || /^\s*$/.test(search)) &&
      searchYear.toString().length == 0
    ) {
      setMovieList([...savedList]);
    }
    if (
      search.length > 0 &&
      movieList.length != 0 &&
      searchYear.toString().length > 0
    ) {
      setMovieList(savedList.filter(searchListYear).filter(searchList));
    }
  };

  const handleSearchYear = () => {
    if (searchYear.toString().length > 0 && movieList.length != 0) {
      setMovieList(savedList.filter(searchListYear));
    }
    if (search.length == 0 && searchYear.toString().length == 0) {
      setMovieList([...savedList]);
    }
    if (
      search.length > 0 &&
      movieList.length != 0 &&
      searchYear.toString().length > 0
    ) {
      setMovieList(savedList.filter(searchListYear).filter(searchList));
    }
  };

  return (
    <>
      <div className="header">
        <h1>HOOKED</h1>
      </div>

      <div className="searchBar">
        <input
          type="number"
          value={searchYear}
          onChange={(e) => {
            setSearchYear(e.target.value);
          }}
          onKeyDown={(evt) =>
            ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()
          }
        />
        <button type="button" onClick={handleSearchYear}>
          Search Year
        </button>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div>
        <p>Sharing a few of our favorite movies</p>
      </div>

      {movieList.map((item, index) => {
        return (
          <div class="gallery" key={item.id}>
            <p className="movieTitle">{item.name}</p>
            <img src={item.img} />
            <p>({item.year})</p>
          </div>
        );
      })}

      <p className="errorCode">{errorCode}</p>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MovieList />);
