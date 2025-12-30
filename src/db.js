import { get, set } from "idb-keyval";

const DB_KEY = "cvBuilderData";

// Save the entire form state
export const saveCVData = async (data) => {
  try {
    await set(DB_KEY, data);
  } catch (error) {
    console.error("Failed to save to IndexedDB:", error);
  }
};

// Load the form state
export const loadCVData = async () => {
  try {
    const data = await get(DB_KEY);
    return data || null;
  } catch (error) {
    console.error("Failed to load from IndexedDB:", error);
    return null;
  }
};
