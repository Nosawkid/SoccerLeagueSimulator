// contexts/FixtureContext.js
import React, { createContext, useState } from "react";

// Create the context
const FixtureContext = createContext();

// Create a provider component
const FixtureProvider = ({ children }) => {
  const [fixtures, setFixtures] = useState([]);

  return (
    <FixtureContext.Provider value={{ fixtures, setFixtures }}>
      {children}
    </FixtureContext.Provider>
  );
};

export { FixtureProvider };
export default FixtureContext;
