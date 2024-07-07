import axios, { AxiosResponse } from 'axios'; // Import axios and AxiosResponse for making HTTP requests
// BaseService.tsx
import getConfig from 'next/config';

export class BaseService {
    private baseUrl: string;

    constructor(module: string) {
        this.baseUrl = getConfig().publicRuntimeConfig.url + getConfig().publicRuntimeConfig.path + module;
    }

    // Method to search with optional form data and event
    async search(formData: Record<string, any> = {}, event?: string): Promise<AxiosResponse<any>> {
        const requestData = { ...formData }; // Clone form data
        if (event) {
            requestData['_search'] = event; // Add event to request data if present
        }
        return await axios.get(`${this.baseUrl}/search`, {
            headers: {
                'Content-Type': 'application/json', // Set content type
                'Access-Control-Allow-Origin': '*' // Allow CORS
            },
            params: requestData // Attach request data as query parameters
        });
    }

    // Method to save or update data
    async saveOrUpdate(formData: Record<string, any>): Promise<AxiosResponse<any>> {
        return await axios.post(this.baseUrl, formData); // Post form data to base URL
    }

    // Method to find by ID
    async findById(id: string | number): Promise<AxiosResponse<any>> {
        return await axios.get(`${this.baseUrl}/${id}`, {
            headers: { 'Content-Type': 'application/json' } // Set content type
        });
    }

    // Method to delete by ID
    async delete(id: string | number): Promise<AxiosResponse<any>> {
        return await axios.delete(`${this.baseUrl}/${id}`); // Delete by ID
    }

    // Method to find all entries
    async findAll(): Promise<AxiosResponse<any>> {
        return await axios.get(`${this.baseUrl}/find-all`); // Get all entries
    }

}
