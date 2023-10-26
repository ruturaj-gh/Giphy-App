import React, { useState } from "react";
import "./GifSearch.css";

function GifSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [gifs, setGifs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [offset, setOffset] = useState(0);

  const handleSearch = async (offset = 0) => {
    setIsLoading(true);
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=7iHawNTo5S9UQtCBcqxCOVhxdscbOSgJ&limit=9&offset=${offset}`
    );
    const data = await response.json();
    setGifs(data.data);
    setIsLoading(false);
  };

  const handleAddFavorite = (gif) => {
    const index = favorites.findIndex((f) => f.id === gif.id);
    if (index === -1) {
      setFavorites([...favorites, gif]);
    } else {
      const newFavorites = [...favorites];
      newFavorites.splice(index, 1);
      setFavorites(newFavorites);
    }
  };

  const isFavorite = (gif) => {
    return favorites.findIndex((f) => f.id === gif.id) !== -1;
  };

  const handleNext = () => {
    setOffset(offset + 9);
    handleSearch(offset + 9);
  };

  const handlePrevious = () => {
    setOffset(Math.max(offset - 9, 0));
    handleSearch(Math.max(offset - 9, 0));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for GIFs"
        id="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={() => handleSearch()}>Go</button>
      {isLoading && <div>Loading...</div>}
      <div className="gif-grid">
        {gifs.map((gif) => (
          <div key={gif.id} className="gif-item">
            <img src={gif.images.fixed_height.url} alt={gif.title} />
            <i
              className={`favorite ${isFavorite(gif) ? "active" : ""}`}
              onClick={() => handleAddFavorite(gif)}
            >
              &#9734;
            </i>
          </div>
        ))}
      </div>
      {offset > 0 && (
        <button onClick={handlePrevious} id="previousbtn">Previous</button>
      )}
      {gifs.length === 9 && (
        <button onClick={handleNext}>Next</button>
      )}
      <h2>Favorites</h2>
      <div className="gif-grid">
        {favorites.map((gif) => (
          <div key={gif.id} className="gif-item">
            <img src={gif.images.fixed_height.url} alt={gif.title} />
            <i
              className="favorite active"
              onClick={() => handleAddFavorite(gif)}
            >
              &#9734;
            </i>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GifSearch;