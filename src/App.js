import React, { useState, useEffect } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import "./App.css";

const App = () => {
  const [cars, setCars] = useState({});
  const [catType, setCatType] = useState("");
  const [subCatType, setSubCatType] = useState("");

  useEffect(
    () =>
      fetch("http://demo2739287.mockable.io/cars")
        .then((res) => res.json())
        .then((data) => setCars(data)),
    []
  );

  useEffect(
    () =>
      cars[catType] && !cars[catType].includes(subCatType) && setSubCatType(""),
    [catType]
  );

  const MainDropdownItems = () => (
    <DropdownButton title={catType.length ? catType : "Cars"}>
      {Object.keys(cars).map((cat, index) => (
        <Dropdown.Item key={index} onClick={() => setCatType(cat)}>
          {cat}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );

  const SubDropdownItems = () => (
    <DropdownButton
      title={subCatType.length ? subCatType : "Types"}
      disabled={!catType.length}
    >
      {(cars[catType] || []).map((cat, index) => (
        <Dropdown.Item key={index} onClick={() => setSubCatType(cat)}>
          {cat}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <code>{`${catType.length ? catType + "/" : ""}${subCatType.length ? subCatType + "/" : ""
            }`}</code>
          <MainDropdownItems />
          <SubDropdownItems />
        </div>
      </header>
    </div>
  );
};

export default App;