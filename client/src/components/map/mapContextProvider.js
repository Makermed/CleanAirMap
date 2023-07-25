import React, { useRef, createContext } from 'react';


const MapContext = createContext(null);

const MapContextProvider = ({ children }) => {
  const containerRef = useRef(null);

  return (
    <MapContext.Provider value={containerRef}>
      <div ref={containerRef} style={{ height: '100vh' }}>
        {children}
      </div>
    </MapContext.Provider>
  );
};
export {MapContext, MapContextProvider}