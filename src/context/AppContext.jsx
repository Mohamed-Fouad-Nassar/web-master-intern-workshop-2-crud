import { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [usersRole, setUsersRole] = useState("");

  return (
    <AppContext.Provider
      value={{
        modalOpen,
        setModalOpen,
        selectedId,
        setSelectedId,
        usersRole,
        setUsersRole,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
