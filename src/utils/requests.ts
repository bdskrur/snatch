import { ApiEntityResult } from "../models/ApiResults/ApiEntityResult";
import axios from "axios";
import { ApiResult } from "../models/ApiResults/ApiResult";

export async function get<T>(url: string): Promise<ApiEntityResult<T>> {
    try {
        const response = await axios.get<ApiEntityResult<T>>(url);

        return response.data;
    } catch (e) {
        return Promise.resolve(ApiEntityResult.Error<T>());
    }
}

export async function del(url: string): Promise<ApiResult> {
    try {
        const response = await axios.delete(url);
        return response.data;
    } catch (e) {
        return Promise.resolve(ApiResult.Error());
    }
}

export async function post(url: string, data?: any): Promise<ApiResult> {
    try {
        const response = await axios.post<ApiResult>(url, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (e) {
        return Promise.resolve(ApiResult.Error());
    }
}

export async function putFile<T>(
    url: string,
    file: File,
    onProgress: (ev: ProgressEvent) => void
): Promise<ApiEntityResult<T>> {
    const SIZE = file.size;

    try {
        const response = await axios.put<ApiEntityResult<T>>(url, file, {
            headers: {
                "Content-Type": "application/octet-stream",
                "X-File-Size": SIZE.toString(),
            },
            onUploadProgress: onProgress,
        });
        return response.data;
    } catch (e) {
        return Promise.resolve(ApiEntityResult.Error<T>());
    }
}

export async function put<T>(url: string, data?: any): Promise<ApiEntityResult<T>> {
    try {
        const response = await axios.put<ApiEntityResult<T>>(url, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (e) {
        return Promise.resolve(ApiEntityResult.Error<T>());
    }
}
