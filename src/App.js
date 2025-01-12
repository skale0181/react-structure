import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import useRedux from "./hooks/reduxHooks/useRedux";
import { useSelector } from "react-redux";
import { currentLoader } from "./state/redux/reducers/loader";
import { snackObj } from "./state/redux/reducers/snackbar";
import Loader from "./components/Loader/Loader";
import Snackbar from "./components/Snackbar/Snackbar";

// Lazy load the pages
const Home = lazy(() => import("./pages/Home/Home"));
const About = lazy(() => import("./pages/About/About"));
const Functionality = lazy(() => import("./pages/Functionality/Functionality"));
const LoaderAndSnackbar = lazy(() =>
  import("./pages/Functionality/LoaderAndSnackbar/LoaderAndSnackbar")
);

const App = () => {
  //to show global loading and snackbar
  const isLoading = useSelector(currentLoader);
  const snackbar = useSelector(snackObj);
  const { dispatchMsg } = useRedux();

  useEffect(() => {
    // Simulate snackbar for 2 seconds
    if (snackbar?.isOpen) {
      setTimeout(() => {
        dispatchMsg("", "", false);
      }, 2000);
    }
  }, [snackbar]);

  return (
    <Router>
      {isLoading && <Loader />}
      {snackbar.isOpen && (
        <Snackbar message={snackbar.message} type={snackbar.state} />
      )}
      <Navbar />
      {/* Suspense wraps lazy-loaded components to show a fallback until loading completes */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/functionality" element={<Functionality />} />
          {/* functionality pages */}
          <Route path="/loading-and-snackbar" element={<LoaderAndSnackbar />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
