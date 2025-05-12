import React, { createContext, useContext, useState } from 'react';

// 1. Create context
const LayoutContext = createContext();

// 2. Wrap Layout with provider
export function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <LayoutContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </LayoutContext.Provider>
  );
}

// 3. Custom hook to use context
export const useLayout = () => useContext(LayoutContext);
