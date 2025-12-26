import { apiClient, endpoints } from "./endpoints";


export const getcategories = async (): Promise<any[]> => {
  try {
    const response = await apiClient.get(`${endpoints.getcategories}`);
    const countries: any[] = response.data as any[];
    return countries;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};
