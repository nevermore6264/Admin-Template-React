import axios, { AxiosResponse } from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

interface Config {
    publicRuntimeConfig: {
        url: string;
        path: string;
    };
}

export class BaseService {
    private baseUrl: string;

    constructor(module: string) {
        const config = this.getConfig();
        if (!config.publicRuntimeConfig) {
            throw new Error('Configuration is missing');
        }
        this.baseUrl = `${config.publicRuntimeConfig.url}${config.publicRuntimeConfig.path}${module}`;
    }

    async search(formData: Record<string, any> = {}, event?: string): Promise<AxiosResponse<any>> {
        const requestData = { ...formData };
        if (event) {
            requestData['_search'] = event;
        }
        return await axios.get(`${this.baseUrl}/search`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            params: requestData
        });
    }

    async saveOrUpdate(formData: Record<string, any>): Promise<AxiosResponse<any>> {
        return await axios.post(this.baseUrl, formData);
    }

    async findById(id: string | number): Promise<AxiosResponse<any>> {
        return await axios.get(`${this.baseUrl}/${id}`, {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    async delete(id: string | number): Promise<AxiosResponse<any>> {
        return await axios.delete(`${this.baseUrl}/${id}`);
    }

    async findAll(): Promise<AxiosResponse<any>> {
        return await axios.get(`${this.baseUrl}/find-all`);
    }

    private getConfig(): Config {
        // Provide a valid configuration here
        return {
            publicRuntimeConfig: {
                url: process.env.API_URL!,
                path: process.env.API_URL!
            }
        };
    }
}
