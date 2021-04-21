import React, { useState, useEffect } from "react";

export default function App() {
  const [breeds, setBreeds] = useState([]);
  const [isValidBreed, setIsValid] = useState(false);
  const [imageSources, setimageSrc] = useState([]);

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all").then((res) => {
      res.json().then((res) => {
        setBreeds(Object.keys(res.message));
      });
    });
  }, []);

  const inputChanged = (e) => {
    setimageSrc([]);
    const isValid = breeds.some((breed) => e.target.value === breed);
    setIsValid(isValid);
    if (isValid) {
      async function getBreeds() {
        const res = await fetch(
          `https://dog.ceo/api/breed/${e.target.value}/images`
        );
        res.json().then((images) => {
          setimageSrc(images.message);
        });
      }
      getBreeds();
    } else {
      setimageSrc([]);
    }
    e.preventDefault();
  };

  return (
    <div style={{ margin: "20px", textAlign: "center" }}>
      <strong className="app">Dog App Challenge!</strong>
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <select id="lang" onChange={inputChanged}>
          <option value="">Select a breed</option>

          {breeds.map((breed, i) => {
            return (
              <option value={breed} key={i}>
                {breed}
              </option>
            );
          })}
        </select>
      </div>
      {isValidBreed ? imageSources.map((src, i) => {
            return (
              <img
                style={{ height: "200px", margin: "5px" }}
                alt=""
                key={i}
                src={src}
              />
            );
          })
        : null}
    </div>
  );
}
