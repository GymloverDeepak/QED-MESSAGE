import React, { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null); // Track hovered index
  const [showSuggestions, setShowSuggestions] = useState(false); // Track if suggestions should be shown

  const data = [
    "React",
    "Redux",
    "JavaScript",
    "TypeScript",
    "CSS",
    "HTML",
    "Node.js",
    "Express",
    "MongoDB",
    "GraphQL",
  ];

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value) {
      const filteredSuggestions = data.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions(data); // Show all suggestions when input is empty
    }
    setShowSuggestions(true); // Ensure suggestions are shown when typing
  };

  const handleSearch = () => {
    if (query) {
      setResults([
        query,
        ...data.filter((item) =>
          item.toLowerCase().includes(query.toLowerCase())
        ),
      ]);
    }
    setShowSuggestions(false); // Hide suggestions after search
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    handleSearch();
  };

  const handleInputMouseEnter = () => {
    // Show suggestions when the input is hovered, even if empty
    if (!query) {
      setSuggestions(data);
    }
    setShowSuggestions(true);
  };

  const handleInputMouseLeave = () => {
    // Keep suggestions visible only if focused
    if (!query) {
      setShowSuggestions(false);
    }
  };

  return (
    <div style={{ margin: "20px", width: "300px" }}>
      <input
        type="text"
        placeholder="Search here..."
        value={query}
        onChange={handleChange}
        onMouseEnter={handleInputMouseEnter} // Show suggestions on hover
        onMouseLeave={handleInputMouseLeave} // Hide if necessary
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          marginTop: "10px",
          padding: "10px",
          width: "100%",
          background: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Search
      </button>

      {showSuggestions && suggestions.length > 0 && (
        <div
          style={{
            marginTop: "5px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "white",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              onMouseEnter={() => setHoveredIndex(index)} // Highlight suggestion on hover
              onMouseLeave={() => setHoveredIndex(null)} // Reset highlight on leave
              style={{
                padding: "10px",
                cursor: "pointer",
                backgroundColor: hoveredIndex === index ? "#f0f8ff" : "white", // Highlight on hover
                borderBottom: "1px solid #eee",
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}

      {results.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h4>Results:</h4>
          <ul>
            {results.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
