import { useContext } from "react";

import AppContext from "../contexts/AppContext";

const useOpenModal = () => {
  const { setModalOpen, setSelectedId } = useContext(AppContext);

  return (id) => {
    setModalOpen(true);
    setSelectedId(id);
  };
};

const useCloseModal = () => {
  const { setModalOpen, setSelectedId } = useContext(AppContext);

  return () => {
    setSelectedId(null);
    setModalOpen(false);
  };
};

export { useCloseModal, useOpenModal };
