const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getImageUrl = (imagePath: any) => {
  return `${API_BASE_URL}/${imagePath}`;
};
