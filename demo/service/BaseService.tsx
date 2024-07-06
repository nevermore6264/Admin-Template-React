import axios, { AxiosResponse } from 'axios'; // Import axios and AxiosResponse for making HTTP requests
import dotenv from 'dotenv'; // Import dotenv to load environment variables from .env file

dotenv.config(); // Load environment variables from .env file

// Define an interface for the configuration
interface Config {
    publicRuntimeConfig: {
        url: string; // Base URL
        path: string; // API path
    };
}

export class BaseService {
    private baseUrl: string; // Base URL for service requests

    constructor(module: string) {
        const config = this.getConfig(); // Get configuration from environment variables
        if (!config.publicRuntimeConfig) {
            throw new Error('Configuration is missing'); // Throw error if configuration is missing
        }
        this.baseUrl = `${config.publicRuntimeConfig.url}${config.publicRuntimeConfig.path}${module}`; // Construct base URL
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

    // Private method to get configuration from environment variables
    private getConfig(): Config {
        // Log environment variables for debugging
        console.log('API URL:', process.env.API_URL);
        console.log('API PATH:', process.env.API_PATH);

        // Ensure environment variables are defined
        if (!process.env.API_URL || !process.env.API_PATH) {
            throw new Error('API URL or PATH is not defined in the environment variables');
        }

        // Return configuration
        return {
            publicRuntimeConfig: {
                url: process.env.API_URL!, // Use non-null assertion operator to tell TypeScript that these variables are not null
                path: process.env.API_PATH!
            }
        };
    }
}
