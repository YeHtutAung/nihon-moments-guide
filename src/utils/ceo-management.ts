import { CEO, ceoData } from "@/data/ceo";

// Get CEO data from storage or return default
export const getCEOFromStorage = (): CEO => {
  try {
    const stored = localStorage.getItem('ceo-data');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Failed to parse stored CEO data:', error);
  }
  return ceoData;
};

// Save CEO data to storage
export const saveCEOToStorage = (ceo: CEO): void => {
  try {
    localStorage.setItem('ceo-data', JSON.stringify(ceo));
  } catch (error) {
    console.error('Failed to save CEO data:', error);
  }
};

// Update CEO information
export const updateCEOInfo = (updates: Partial<CEO>): CEO => {
  const currentCEO = getCEOFromStorage();
  const updatedCEO = { ...currentCEO, ...updates };
  saveCEOToStorage(updatedCEO);
  return updatedCEO;
};

// Update CEO photo
export const updateCEOPhoto = (newImagePath: string): CEO => {
  return updateCEOInfo({ image: newImagePath });
};

// Update CEO message
export const updateCEOMessage = (messageType: keyof CEO['message'], newMessage: string): CEO => {
  const currentCEO = getCEOFromStorage();
  const updatedMessage = { ...currentCEO.message, [messageType]: newMessage };
  return updateCEOInfo({ message: updatedMessage });
};

// Reset CEO data to default
export const resetCEOToDefault = (): CEO => {
  localStorage.removeItem('ceo-data');
  return ceoData;
};
