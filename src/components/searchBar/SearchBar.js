import React, { useState }  from 'react';
import './SearchBar.css';

function SearchBar({setLocationHandler}) {
    const [query, setQuery] = useState(''),
        handleClick = () => {
        setLocationHandler(query)
        },
        keyPressCheck = (e) => {
        if (e.keyCode===13)
        {setLocationHandler(query)};
        }
  return (
    <span className="searchbar">
      <input
        type="text"
        name="search"
        placeholder="Zoek een stad"
        value={query}
        onChange={(e)=>setQuery(e.target.value)}
        onKeyUp={keyPressCheck}
      />

      <button type="button" onClick={handleClick}>
        Zoek
      </button>
    </span>
  );
};

export default SearchBar;
