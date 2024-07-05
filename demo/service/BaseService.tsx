import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import _ from 'lodash';

export class BaseService {
    baseUrl: string;

    constructor(module: string) {
        this.baseUrl = `${this.getConfig().publicRuntimeConfig.url}${this.getConfig().publicRuntimeConfig.path}${module}`;
    }

    async search(formData: Record<string, any> = {}, event?: string): Promise<AxiosResponse<any>> {
        formData = _.cloneDeep(formData);
        if (event) {
            formData['_search'] = event;
        }
        return await axios.get(`${this.baseUrl}/search`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            params: formData
        });
    }

    async saveOrUpdate(formData: Record<string, any>): Promise<AxiosResponse<any>> {
        // formData = CommonUtil.convertFormFile(formData); // Uncomment if `convertFormFile` method is used
        return await axios.post(`${this.baseUrl}`, formData);
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

    private getConfig(): { publicRuntimeConfig: { url: string; path: string; pathV2: string } } {
        // const token = localStorage.getItem('accessToken');
        const axiosConfig: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*'
                // Authorization: `Bearer ${token}`
            }
        };
        return axiosConfig as any; // Cast to any as specific type may vary
    }
}
