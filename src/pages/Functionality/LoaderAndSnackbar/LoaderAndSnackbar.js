import React from "react";
import "./LoaderAndSnackbar.css";
import useRedux from "../../../hooks/reduxHooks/useRedux";

const LoaderAndSnackbar = () => {
  //for handling loader and snackbar globally using redux
  const { dispatchLoader, dispatchMsg } = useRedux();

  const handleLoader = () => {
    dispatchLoader(true);
    setTimeout(() => {
      dispatchLoader(false);
    }, 2000);
  };

  const handleSnackbar = () => {
    dispatchMsg("Snackbar message", "success", true);
  };

  return (
    <div className="container">
      <h1>Loader and Snackbar Example</h1>
      <div className="button-container">
        <button onClick={handleLoader} className="btn">
          Check Loader
        </button>
        <button onClick={handleSnackbar} className="btn">
          Check Snackbar success
        </button>
      </div>
    </div>
  );
};

export default LoaderAndSnackbar;
