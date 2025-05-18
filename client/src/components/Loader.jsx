import React from 'react';
import styled from '@emotion/styled'; // Alternative to styled-components that works well with Vite

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const NewtonsCradle = styled.div`
  --uib-size: 50px;
  --uib-speed: 1.2s;
  --uib-color: var(--color-secondary);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--uib-size);
  height: var(--uib-size);
`;

const Dot = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  width: 25%;
  transform-origin: center top;

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 25%;
    border-radius: 50%;
    background-color: var(--uib-color);
  }

  &:first-of-type {
    animation: swing var(--uib-speed) linear infinite;
  }

  &:last-of-type {
    animation: swing2 var(--uib-speed) linear infinite;
  }

  @keyframes swing {
    0% {
      transform: rotate(0deg);
      animation-timing-function: ease-out;
    }
    25% {
      transform: rotate(70deg);
      animation-timing-function: ease-in;
    }
    50% {
      transform: rotate(0deg);
      animation-timing-function: linear;
    }
  }

  @keyframes swing2 {
    0% {
      transform: rotate(0deg);
      animation-timing-function: linear;
    }
    50% {
      transform: rotate(0deg);
      animation-timing-function: ease-out;
    }
    75% {
      transform: rotate(-70deg);
      animation-timing-function: ease-in;
    }
  }
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <NewtonsCradle>
        <Dot />
        <Dot />
        <Dot />
        <Dot />
      </NewtonsCradle>
    </LoaderContainer>
  );
};

export default Loader;