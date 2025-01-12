import { useDispatch } from "react-redux";
import { changeLoader } from "../../state/redux/reducers/loader";
import { setSnackbar } from "../../state/redux/reducers/snackbar";

/**
 * Custom hook to facilitate Redux dispatches for loading states and snackbar notifications.
 *
 * Usage Example:
 *
 * const { dispatchMsg, dispatchLoader } = useRedux();
 *
 *  To show a snackbar message
 * dispatchMsg("This is a success message", "success");
 * dispatchMsg("An error occurred", "error");
 * dispatchMsg("", "", false); //to close the snackbar
 *
 *  To toggle the loading state
 * dispatchLoader(true); // Start loading
 * dispatchLoader(false); // Stop loading
 */
const useRedux = () => {
  const dispatch = useDispatch();

  /**
   * Dispatches a snackbar message.
   *
   * @param {string} msg - The message to display in the snackbar.
   * @param {string} type - The type of snackbar (e.g., "success", "error").
   * @param {boolean} [status=true] - Whether the snackbar should be open.
   */
  const dispatchMsg = (msg, type, status = true) => {
    dispatch(
      setSnackbar({
        isOpen: status,
        message: msg,
        state: type,
      })
    );
  };

  /**
   * Dispatches a loader state change.
   *
   * @param {boolean} [state=true] - The loading state (true to start loading, false to stop).
   */
  const dispatchLoader = (state = true) => {
    dispatch(changeLoader(state));
  };

  return { dispatchMsg, dispatchLoader };
};

export default useRedux;
