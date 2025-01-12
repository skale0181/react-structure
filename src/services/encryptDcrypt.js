/**
 * this file for encrypt and decrypt values
 */
import CryptoJS from "crypto-js";
import { LOCAL_SECRET } from "../BaseUrl";
const encryptDCrypt = (type = "en", value = "") => {
  let secret =LOCAL_SECRET;
  if (type === "en") {
    return CryptoJS.AES.encrypt(value, secret);
  } else {
    let c = CryptoJS.AES.decrypt(value, secret);
    return c.toString(CryptoJS.enc.Utf8);
  }
};
export default encryptDCrypt;