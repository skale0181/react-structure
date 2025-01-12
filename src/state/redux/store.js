// Import the configureStore function from Redux Toolkit to create the store
import { configureStore } from "@reduxjs/toolkit";
// Import the reducers for managing different slices of state
import loader from "./reducers/loader"; // Manages the loading state
import snackbar from "./reducers/snackbar"; // Manages snackbar notifications (e.g., success or error messages)
import userDetails from "./reducers/userDetails"; // Manages user details and authentication state
// Create the Redux store by combining the reducers into a single state tree
const store = configureStore({
  reducer: {
    loader: loader, // Assign loader reducer to manage loading state
    snackbar: snackbar, // Assign snackbar reducer to manage notifications
    userDetails: userDetails, // Assign userDetails reducer to manage user-specific data
  },
});
// Export the store to be used throughout the application
export default store;