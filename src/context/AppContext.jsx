import { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  return (
    <AppContext.Provider
      value={{ modalOpen, setModalOpen, selectedId, setSelectedId }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
