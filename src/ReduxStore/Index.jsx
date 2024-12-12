import { configureStore, createSlice } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";
import axios from "axios";
import localStorageMiddleware from "../middleware/localStorageMiddleware";

const encryptionKey = "my-secret-key";
const API_URL = "http://54.219.93.32:3000";

// Function to decrypt data from local storage
const getDecryptedData = () => {
  const encryptedData = localStorage.getItem("appData");

  if (encryptedData) {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      console.error("Failed to decrypt data:", error);
      return null;
    }
  }
  return null;
};

// Initialize userData from decrypted local storage data
const decryptedData = getDecryptedData();
const initialUserData = decryptedData?.userData || [
  { name: "Deepak", email: "test@gmail.com" },
];

// Define the initial state
const initialState = {
  message: "Welcome QED",
  userData: initialUserData,
  formData: [],
  loginDetails:'',
  apiMessage: "",
};

// Slice definition
const qedMessageSlice = createSlice({
  name: "QED",
  initialState,
  reducers: {
    checkAlert(state, action) {
      state.message = action.payload;
    },
    userAuthantication(state, action) {
      state.loginDetails = action.payload;
    },
    addForm(state, action) {
      state.userData.push(action.payload);
    },
    addNewForm(state, action) {
      state.formData.push(action.payload);
    },
  },
});

export const QedMessageAction = qedMessageSlice.actions;

// Store configuration
export const store = configureStore({
  reducer: {
    QED: qedMessageSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});
