const FormValidator = ({ error }) => {
  return error ? <p className="text-red-500 text-sm">{error}</p> : null;
};

export default FormValidator;
