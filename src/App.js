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
    color: ${props => props.bg === "brand-primary" ? "#B8232F" : "black"};
  `;

  const Dropdown = styled.div.attrs(props => ({
    margin: '20px 0px',
  }))`  
    margin: ${props => props.margin};
  `;
  const Image = styled.img`
    height: 200px;
    margin: 5px;
  `;
  const Title = styled.div.attrs(props => ({
    margin: '20px 0px',
    display: 'block',
    children: 'Dog App Challenge!'
  }))`
    font-weight: bold;
    margin-bottom: 20px;
    font-size: 30px; `;
  const Subtitle = styled(Title).attrs(props => ({
    fontSize: '300px',
    children: 'Created with React, Redux, and styled components'
  }))`
    font-size: 20px;
    color: black `;

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
    <StyledContainer bg="brand-primary">
      <Title></Title>
      <Subtitle as="h3"></Subtitle>
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
