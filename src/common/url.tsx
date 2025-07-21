import { ApiUrl } from "../apiUrl/ApiUrl";

export const getImageUrl = (imagePath) => {
  return `${ApiUrl}/${imagePath}`;
};
