import { useContext } from "react";
import AppContext from "../context/AppContext";

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
