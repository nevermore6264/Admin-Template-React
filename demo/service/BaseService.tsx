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

    private getConfig(): { publicRuntimeConfig: { url: string; path: string } } {
        // Định nghĩa một đối tượng cấu hình Axios với các tiêu đề cho các yêu cầu HTTP
        const axiosConfig: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8', // Xác định loại nội dung của yêu cầu là JSON được mã hóa UTF-8
                'Access-Control-Allow-Origin': '*' // Tiêu đề CORS cho phép mọi nguồn truy cập vào phản hồi
            }
        };

        // Trả về đối tượng axiosConfig đã được ép kiểu thành `any`, đây là cách sai
        return axiosConfig as any; // Ép kiểu thành any để bỏ qua kiểm tra kiểu của TypeScript, nên tránh việc này
    }
}
