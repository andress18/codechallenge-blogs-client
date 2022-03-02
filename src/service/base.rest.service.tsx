import Response from "../models/response";
import axios from "axios";

export default class BaseRestService {

    public static async getAll<T>(url: string): Promise<Response> {
        const res = await axios.get<Array<T>>(url)
            .then((response: any) => {
                const result = response.data;
                if (result && result.success) {
                    return new Response(true, result.data as Array<T>, "Success", "");
                } else {
                    const msg = (result.messageList && result.messageList.length > 0) ? result.messageList[0].text : "Error";
                    return new Response(false, null, "Error", msg);
                }
            })
            .catch(function (error) {
                return new Response(false, null, "Error", error);
            });
        return res;
    }
    public static async get<T>(url: string): Promise<Response> {
        const res = await axios.get<T>(url)
            .then((response: any) => {
                const result = response.data;
                return new Response(true, result as T, "Success", "");
            })
            .catch(function (error) {
                return new Response(false, null, "Error", error);
            });
        return res;
    }
    public static delete(url: string, param: any): Promise<Response> {
        const res = axios.delete(url, { data: param })
            .then(response => {
                const result = response.data;
                if (result && result.success) {
                    return new Response(true, result.data, "Success", "");
                } else {
                    const msg = (result.messageList && result.messageList.length > 0) ? result.messageList[0].text : "Error";
                    return new Response(false, null, "Error", msg);
                }
            })
            .catch(function (error) {
                return new Response(false, null, "Error", error);
            });
        return res;
    }
    public static create<T>(url: string, obj: T): Promise<Response> {

        const res = axios.post(url, obj)
            .then(response => {
                const result = response.data;
                if (result && result.success) {
                    return new Response(true, result.data, "Success", "");
                } else {
                    const msg = (result.messageList && result.messageList.length > 0) ? result.messageList[0].text : "Error";
                    return new Response(false, null, "Error", msg);
                }
            })
            .catch(function (error) {
                return new Response(false, null, "Error", error);
            });
        return res;
    }
    public static update<T>(url: string, param: any, obj: T): Promise<Response> {

        const res = axios.post(url + param, obj)
            .then(response => {
                const result = response.data;
                if (result && result.success) {
                    return new Response(true, result.data, "Success", "");
                } else {
                    const msg = (result.messageList && result.messageList.length > 0) ? result.messageList[0].text : "Error";
                    return new Response(false, null, "Error", msg);
                }
            })
            .catch(function (error) {
                return new Response(false, null, "Error", error);
            });
        return res;
    }
}