// BaseService.tsx
import axios, { AxiosResponse } from 'axios';

export class BaseService {
    private baseUrl: string;

    constructor(module: string) {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Sử dụng biến môi trường trực tiếp
        const apiPath = process.env.NEXT_PUBLIC_API_PATH; // Sử dụng biến môi trường trực tiếp
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
}
