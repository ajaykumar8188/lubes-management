import { apiClient, endpoints } from "./endpoints"


export const Savecategories = async (items: any) => {
  try {
    const response = await apiClient.post(endpoints.Savecategories, items);
    return response.data; // 🔥 IMPORTANT
  } catch (err) {
    console.error('Error while saving category:', err);
    throw err;
  }
};
