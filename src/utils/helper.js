import moment from "moment";

export const helpers = {
  // Validate email format using a regex pattern
  validateEmail: (email) => {
    let mail = email?.trim();
    // Regular expression pattern for a valid email address
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Use test method to check the pattern against the provided email
    return pattern.test(mail);
  },
  // Validate password based on length and character rules
  validatePassword: (password) => {
    // Password length check (10-25 characters)
    if (!password) return false;
    if (password.length < 10 || password.length > 25) {
      return false;
    }
    // Regex to check if password contains at least one letter, one number/special character, and is alphanumeric
    // const passwordRegex =
    //   /^(?=.*[a-zA-Z])(?=.*[0-9@#$%^&*!()+=_-])[a-zA-Z0-9@#$%^&*!()+=_-]{10,25}$/;
    // Regex to check if password contains at least one capital letter and one number
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9@#$%^&*!()+=_-]{10,25}$/;
    // Validate password with regex
    return passwordRegex.test(password);
  },
  // Convert image file to Base64 format
  image_to_base64: async (file) => {
    let result_base64 = await new Promise((resolve) => {
      let fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result); // Resolve with Base64 string on load
      fileReader.onerror = (error) => {
        console.error(error);
        // Handle any errors during file reading
      };
      fileReader.readAsDataURL(file); // Read the file as a Data URL (Base64)
    });
    return result_base64;
  },
  // Compress an image in Base64 format to a specified width and height
  reduce_image_file_size: async (
    base64Str,
    MAX_WIDTH = 650,
    MAX_HEIGHT = 650
  ) => {
    let resized_base64 = await new Promise((resolve) => {
      let img = new Image();
      img.src = base64Str;
      img.onload = () => {
        let canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        // Adjust width and height based on max dimensions
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL()); // Return resized image in Base64
      };
    });
    return resized_base64;
  },
  // Handle image upload and ensure it is within a 5MB limit
  handleUploadImage: async (file) => {
    const original = file; // Base64 format image
    // Compress the image file
    let compressed = await this.reduce_image_file_size(original);
    // Get the compressed image size in MB
    const binaryDataCompressed = atob(compressed.split(",")[1]);
    const fileSizeMBCompressed = (
      binaryDataCompressed?.length /
      (1024 * 1024)
    ).toFixed(2);
    // Return compressed image if size is <= 5MB, otherwise return an error
    if (fileSizeMBCompressed <= 5) {
      return { res: "success", data: compressed };
    } else {
      return { res: "error", data: "File size should be less than 5MB" };
    }
  },
  // Remove the country code from a phone number
  removeCountryCode: (phoneNumber, countryCode) => {
    if (!phoneNumber || !countryCode) return phoneNumber;
    // Check if phone number starts with the country code and remove it
    if (phoneNumber.startsWith(countryCode)) {
      return phoneNumber.slice(countryCode.length);
    } else {
      return phoneNumber;
    }
  },
  // Remove non-alphabetic characters from a string (except spaces)
  removeNonAlphabets: (text) => {
    return text.replace(/[^a-zA-Z\s]/g, ""); // Regex to remove non-alphabetic characters
  },
  // Get the character count of a text editor, ignoring HTML tags and newlines
  getTextLengthOfTextEditor: (text) => {
    return text.replace(/<[^>]*>/g, "").replace(/\n/g, "").length; // Strip HTML and count characters
  },
  // Debounce function to delay execution of a function by a set time (delay)
  debounceFunction: (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args); // Call the function after delay
      }, delay);
    };
  },
  // Get day of the week from a date string in "DD/MM/YYYY" format
  getDayOfWeek: (dateString, type = "short") => {
    if (!dateString) return null;
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const daysOfWeekFull = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const [day, month, year] = dateString.split("/");
    const date = new Date(`${year}-${month}-${day}`);
    const dayOfWeekIndex = date.getDay();
    // Return either short or full day names
    return type === "full"
      ? daysOfWeekFull[dayOfWeekIndex]
      : daysOfWeek[dayOfWeekIndex];
  },
  // Open a PDF in a new browser tab
  handleOpenPdfInNewTab: (pdfUrl) => {
    const link = document.createElement("a");
    link.href = `${pdfUrl}`; // File path for PDF
    link.target = "_blank"; // Open in new tab
    link.rel = "noopener noreferrer"; // For security reasons
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
  // Convert an array of objects into CSV format
  convertToCSV: (data) => {
    const array = [Object.keys(data[0])].concat(data);
    // Convert each row into a comma-separated string, handling special characters
    return array
      .map((row) => {
        return Object.values(row)
          .map((value) => {
            return typeof value === "string"
              ? `"${value.replace(/"/g, '""')}"`
              : value;
          })
          .join(",");
      })
      .join("\n");
  },
  // Download data as a CSV file
  downloadCsvFile: (data, fileName) => {
    const csvData = this.convertToCSV(data); // Convert data to CSV
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName}.csv`; // Download with the given filename
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  },
  // Get the start and end date of different ranges (e.g., this week, last month)
  getDateRange: (option) => {
    const today = new Date();
    let startDate, endDate;
    // Determine the start and end dates based on the option provided
    switch (option) {
      case "this_week":
        startDate = new Date(
          today.setDate(today.getDate() - today.getDay() + 1)
        );
        endDate = new Date(today.setDate(startDate.getDate() + 6));
        break;
      case "last_week":
        startDate = new Date(
          today.setDate(today.getDate() - today.getDay() - 6)
        );
        endDate = new Date(today.setDate(startDate.getDate() + 6));
        break;
      case "this_month":
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case "last_month":
        startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        endDate = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      default:
        startDate = endDate = today;
    }
    // Return the start and end dates
    return { startDate, endDate };
  },
  getItemFromArray: (array = [], conditionFn = null) => {
    return array.find(conditionFn);
  },
  //for make deep copy of object
  deepCopy: (obj) => {
    let deepCopyObj = JSON.parse(JSON.stringify(obj));
    return deepCopyObj;
  },
  //remove special character from string
  removeSpecialCharactersFromString: (str = "") => {
    return str.replace(/[^a-zA-Z0-9\s]/g, "");
  },
  //arrange date with required format
  formatDate: (date = new Date(), format = "DD/MM/YYYY") => {
    const jsDate = new Date(date);
    const formateDate = moment(jsDate).format(format);
    return formateDate;
  },
  isDateLessThanToday: (inputDate = null, format = "MM/DD/YYYY") => {
    if (!inputDate) return false;
    // Split the input date string
    const parts = inputDate.split("/");

    let day, month, year;

    if (format === "MM/DD/YYYY") {
      // Extract month, day, and year for MM/DD/YYYY
      month = parseInt(parts[0], 10) - 1; // Month is zero-indexed
      day = parseInt(parts[1], 10);
      year = parseInt(parts[2], 10);
    } else if (format === "DD/MM/YYYY") {
      // Extract day, month, and year for DD/MM/YYYY
      day = parseInt(parts[0], 10);
      month = parseInt(parts[1], 10) - 1; // Month is zero-indexed
      year = parseInt(parts[2], 10);
    } else {
      throw new Error(
        "Unsupported date format. Use 'MM/DD/YYYY' or 'DD/MM/YYYY'."
      );
    }

    // Create a Date object for the input date
    const inputDateObject = new Date(year, month, day);

    // Get the current date without the time
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Compare the input date with today's date
    return inputDateObject < today;
  },
  //handle image crash error with alternate image
  handelImgCrashErr: (e, alternateImg) => {
    e.target.onerror = null; // Prevent infinite loop if dummy image also fails
    e.target.src = alternateImg;
  },
};
