import React from "react";

const SuggestionList = ({
  suggestions = [],
  highlight,
  dataKey,
  onSuggestionClick,
}) => {
  const renderWithHighlightText = (value) => {
    const textArray = value.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <>
        {textArray.map((text, i) => {
          return text.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} className="highlight-text">
              {text}
            </span>
          ) : (
            text
          );
        })}
      </>
    );
  };

  return (
    <>
      {suggestions?.products?.length &&
        suggestions.products.map((suggestion, i) => {
          const value = dataKey ? suggestion[dataKey] : suggestion;
          return value?.includes(highlight) ? (
            <li
              key={i}
              onClick={() => onSuggestionClick(suggestion)}
              className="suggestion"
            >
              {renderWithHighlightText(value)}
            </li>
          ) : null;
        })}
    </>
  );
};

export default SuggestionList;
