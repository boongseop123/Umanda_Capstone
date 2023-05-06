import React, { useState } from "react";
import axios from "axios";

function AiTravelTrait() {
  const [selectedOption, setSelectedOption] = useState("");
  const [data, setData] = useState([]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    const newData = { option: selectedOption };
    setData([...data, newData]);
    setSelectedOption("");
  };

  const handleSendData = () => {
    axios
      .post("/api/country", { data })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <label>
        Option 1
        <input
          type="radio"
          value="option1"
          checked={selectedOption === "option1"}
          onChange={handleOptionChange}
        />
      </label>
      <label>
        Option 2
        <input
          type="radio"
          value="option2"
          checked={selectedOption === "option2"}
          onChange={handleOptionChange}
        />
      </label>
      <button onClick={handleSubmit}>Add Data</button>
      <button onClick={handleSendData}>Send Data</button>
    </div>
  );
}

export default AiTravelTrait;
