/**
 * This file contains functions to add, get, delete, and remove local values.
 */
import encryptDCrypt from "./encryptDCrypt";
const addDeleteGetLocalStorage = (
  name,
  dataObj = {},
  type = "add",
  addType = "multiple"
) => {
  if (type == "add") {
    //add to the local
    if (addType == "single") {
      // encrypt and store to the local with key
      let en = encryptDCrypt(
        "en",
        typeof dataObj == "object" ? JSON.stringify(dataObj) : dataObj
      );
      localStorage.setItem(name, en);
    } else {
      //find same key in the local
      let getItem = localStorage.getItem(name);
      // if data present in the local then encrypt and push to the array
      if (getItem != undefined) {
        let de = encryptDCrypt("de", getItem);
        let parse = JSON.parse(de);
        let a = Array.from(parse);
        a.push(dataObj);
        let t = encryptDCrypt("en", JSON.stringify(a));
        localStorage.setItem(name, t);
      } else {
        // if not present in the local then create new encrypt array and store to the local
        let en = encryptDCrypt("en", JSON.stringify([dataObj]));
        localStorage.setItem(name, en);
      }
    }
  } else if (type == "get") {
    //get from the local
    try {
      let g = localStorage.getItem(name);
      let d = encryptDCrypt("de", g);
      return d;
    } catch (e) {
      return null;
    }
  } else if (type == "delete") {
    //delete from local
    localStorage.removeItem(name);
  } else {
    //find obj present in the multiple data if present
    //then removes from array and update local
    let getItem = localStorage.getItem(name);
    if (getItem != undefined) {
      let de = encryptDCrypt("de", getItem);
      let parse = JSON.parse(de);
      let a = Array.from(parse);
      let l = [];
      a.forEach((obj) => {
        if (dataObj.id != obj.id) {
          l.push(obj);
        }
      });
      let t = encryptDCrypt("en", JSON.stringify(l));
      localStorage.setItem(name, t);
    } else {
      localStorage.removeItem(name);
    }
  }
};
export default addDeleteGetLocalStorage;
/**
 * Usage Examples:
 */
// 1. Adding a Single Item
// addDeleteGetLocalStorage('userProfile', { id: 1, name: 'John Doe' }, 'add', 'single');
// 2. Adding Multiple Items
// addDeleteGetLocalStorage('userProfiles', { id: 2, name: 'Jane Smith' }, 'add', 'multiple');
// addDeleteGetLocalStorage('userProfiles', { id: 3, name: 'Sam Green' }, 'add', 'multiple');
// 3. Getting Items
// const profiles = addDeleteGetLocalStorage('userProfiles', {}, 'get');
// console.log(profiles);
// 4. Deleting All Items
// addDeleteGetLocalStorage('userProfiles', {}, 'delete');
// 5. Removing a Specific Item
// addDeleteGetLocalStorage('userProfiles', { id: 2 }, 'remove');