import { ApiUrl } from "../apiUrl/ApiUrl";

export const getImageUrl = (imagePath: any) => {
  return `${ApiUrl}/${imagePath}`;
};
