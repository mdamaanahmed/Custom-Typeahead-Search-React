import React from "react";
import Autocomplete from "./components/Autocomplete";

const App = () => {
  const fetchSuggestionList = async (inputVal) => {
    try {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${inputVal}`
      );
      if (!res.ok) throw new Error("Unable to fetch");
      const result = await res.json();
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main">
      <h1>
        Typeahead Search With <br /> Auto Suggestions
      </h1>
      <Autocomplete
        placeholder={"Search...."}
        fetchSuggestionList={fetchSuggestionList}
        dataKey={"title"}
        customLoading={""}
        onSelect={(res) => console.log("Selected Value: ", res)}
        onChange={(input) => console.log("Input: ", input)}
        onBlur={(e) => {}}
        onFocus={(e) => {}}
        customStyles={{}}
      />
    </div>
  );
};

export default App;
