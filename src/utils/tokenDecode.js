// Import the jwt-decode library to decode JWT tokens
// import jwt_decode from 'jwt-decode';
import { jwtDecode } from "jwt-decode";
/**
 * Function to decode a JWT token.
 *
 * @param {string} token - The JWT token to be decoded.
 * @returns {Object|null} - Returns the decoded token object if valid, or null if the token is not provided.
 */
export const decodedToken = (token) => {
  // Check if the token is provided, if not return null
  if (!token) {
    return null;
  } else {
    // If the token is provided, decode and return the token object
    return jwtDecode(token);
  }
};