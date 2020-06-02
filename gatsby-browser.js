import React from 'react';
import AppProvider from 'compositions/store/provider';
import wrapPageElementWithTransition from 'compositions/helpers/wrapPageElement';

// React Context in Browser
// eslint-disable-next-line react/prop-types
export const wrapRootElement = ({ element }) => {
  return <AppProvider>{element}</AppProvider>;
};

// Page Transitions
export const wrapPageElement = wrapPageElementWithTransition;
