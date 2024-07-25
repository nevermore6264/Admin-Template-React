// BaseService.tsx
import axios, { AxiosResponse } from 'axios';

export class BaseService {
    private baseUrl: string;

    constructor(module: string) {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const apiPath = process.env.NEXT_PUBLIC_API_PATH;
        if (!apiUrl || !apiPath) {
            throw new Error('API URL or PATH is not defined in the environment variables');
        }
        this.baseUrl = `${apiUrl}${apiPath}${module}`;
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

    async insert(formData: Record<string, any>): Promise<AxiosResponse<any>> {
        return await axios.post(`${this.baseUrl}/insert`, formData);
    }

    async update(id: string | number, formData: Record<string, any>): Promise<AxiosResponse<any>> {
        return await axios.put(`${this.baseUrl}/update/${id}`, formData);
    }

    async findById(id: string | number): Promise<AxiosResponse<any>> {
        return await axios.get(`${this.baseUrl}/${id}`, {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    async delete(id: string | number): Promise<AxiosResponse<any>> {
        return await axios.delete(`${this.baseUrl}/delete/${id}`);
    }

    async findAll(): Promise<AxiosResponse<any>> {
        return await axios.get(`${this.baseUrl}/get-all`);
    }
}