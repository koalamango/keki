import React from 'react';
import styled from 'styled-components';
import IO from 'compositions/io';
import Title from 'compositions/Title';
import { COLORS } from 'compositions/constants';

export const Container = styled.div`
  padding: 4rem;
  margin: 4rem;
  border-radius: 10px;
  position: relative;
  text-align: center;
  color: #fff;
  transition: background-color 0.3s ease;

  background-color: ${({ isVisible }) =>
    isVisible ? COLORS.accent : COLORS.grayDarker};
`;

// <IO> uses a render prop to pass down `isVisible` and `hasBeenVisible`.
// In this example, we only care about `isVisible` and reset the styles
// every time we scroll back up. Use `hasBeenVisible` to keep the styles
// after scrolling back up and down again.
const IOExample = () => (
  <IO rootMargin="-50px">
    {({ isVisible }) => (
      <Container isVisible={isVisible}>
        <Title tag="span">IntersectionObserver</Title>
      </Container>
    )}
  </IO>
);

export default IOExample;
