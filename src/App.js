import React, { useState, useEffect } from "react";
import styled from 'styled-components';

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

  // Styled components
  const StyledContainer = styled.div`
    text-align: center;
    margin: 20dp;
  `;
  const Dropdown = styled.div`
    margin: 20px 0px;
  `;
  const Image = styled.img`
    height: 200px;
    margin: 5px;
  `;

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
    <StyledContainer>
      <strong className="app">Dog App Challenge!</strong>
      <Dropdown>
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
      </Dropdown>
      {isValidBreed ? imageSources.map((src, i) => {
            return (
              <Image
                alt=""
                key={i}
                src={src}
              />
            );
          })
        : null}
    </StyledContainer>
  );
}
