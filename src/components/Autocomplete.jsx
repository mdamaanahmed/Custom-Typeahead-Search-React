import React, { useState, useEffect, useRef } from "react";
import SuggestionList from "./SuggestionList";

const Autocomplete = ({
  placeholder = "Search...",
  fetchSuggestionList,
  dataKey = "",
  customLoading = "",
  onSelect = () => {},
  onChange = () => {},
  onBlur = () => {},
  onFocus = () => {},
  customStyles = {},
}) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const debounceRef = useRef(null);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    onChange(e.target.value);
  };

  const getSuggestions = async (inputVal) => {
    let result = [];
    setError("");
    setLoading(true);
    setSuggestions([]);
    try {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(async () => {
        if (fetchSuggestionList) {
          result = await fetchSuggestionList(inputVal);
        }
        setSuggestions(result);
        setLoading(false);
      }, 600);
    } catch (err) {
      console.log(err);
      setError("Similar suggestion does not exist");
      setSuggestions(result);
    } finally {
      if (!debounceRef.current) setLoading(false);
    }
  };

  useEffect(() => {
    if (input) {
      getSuggestions(input);
    } else {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      setSuggestions([]);
    }
  }, [input]);

  const handleSuggestionClick = (suggestion) => {
    setInput(dataKey ? suggestion[dataKey] : suggestion);
    onSelect(suggestion);
    setSuggestions([]);
  };

  const suggestedCount = () => {
    return suggestions?.products?.length
      ? suggestions?.products?.filter((product) =>
          product.title.includes(input)
        )?.length
      : 0;
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        value={input}
        placeholder={placeholder}
        style={customStyles}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={handleInputChange}
      />
      {error && <div className="error">{error}</div>}
      {(suggestions?.products?.length || loading) && (
        <ul>
          {loading && (
            <div className="loader">
              {customLoading ? (
                customLoading
              ) : (
                <span className="loading"></span>
              )}
            </div>
          )}
          {suggestions?.products?.length && (
            <SuggestionList
              dataKey={dataKey}
              highlight={input}
              suggestions={suggestions}
              onSuggestionClick={handleSuggestionClick}
            />
          )}
        </ul>
      )}
      {!!suggestedCount() && (
        <div className="suggestion-count">
          <span>Suggested Count: </span>
          <b>{suggestedCount()}</b>
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
