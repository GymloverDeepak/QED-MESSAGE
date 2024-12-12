import CryptoJS from "crypto-js";

const encryptionKey = "my-secret-key"; // Use a strong key for encryption

const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // Sync specific parts of the state to local storage
  const state = store.getState();

  // Example: If you want to store multiple pieces of data, you can create an object
  const dataToStore = {
    userData: state.QED.userData,
    message: state.QED.message,
    formData:state.QED.formData,
    loginDetails:state.QED.loginDetails
    // Add more state data here that you want to store
  };

  // Encrypt the entire object before storing it
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(dataToStore),
    encryptionKey
  ).toString();

  localStorage.setItem("appData", encryptedData);
  localStorage.setItem("auth-token",dataToStore.loginDetails) // Save encrypted data to localStorage

  return result;
};

export default localStorageMiddleware;
