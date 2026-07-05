// @ts-ignore
import { http } from "@/boot/axios";
// @ts-ignore
import { toast } from "react-hot-toast";

export const GetRequest = async (url: string, params?: object, noAlert?: boolean, timeout?: number, navigate?: (path: string) => void) => {
    return await Request(url, "GET", undefined, params, noAlert, timeout, navigate);
};

export const PostRequest = async (url: string, data?: object, noAlert?: boolean, timeout?: number, navigate?: (path: string) => void) => {
    return await Request(url, "POST", data, undefined, noAlert, timeout, navigate);
};

export const PutRequest = async (url: string, data?: object, noAlert?: boolean, timeout?: number, navigate?: (path: string) => void) => {
    return await Request(url, "PUT", data, undefined, noAlert, timeout, navigate);
};

export const DeleteRequest = async (url: string, params?: object, noAlert?: boolean, timeout?: number, navigate?: (path: string) => void) => {
    return await Request(url, "DELETE", undefined, params, noAlert, timeout, navigate);
};

export const isLogin = (token: string | null): boolean => {
    return !!token;
};

const Request = async (
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    body?: object,
    params?: object,
    noAlert?: boolean,
    timeout?: number,
    navigate?: (path: string) => void
) => {
    try {
        let res, data;

        switch (method) {
            case "POST":
                res = await http.post(url, body, { headers: { "Content-Type": "application/json" }, params, timeout });
                break;
            case "PUT":
                res = await http.put(url, body, { headers: { "Content-Type": "application/json" }, params, timeout });
                break;
            case "DELETE":
                res = await http.delete(url, { params, timeout });
                break;
            default:
                res = await http.get(url, { params, timeout });
        }

        data = res.data;

        if (!data && navigate) {
            navigate("/500");
            return;
        }

        if (data.error && !noAlert) {
            toast.error(data.error);
        }

        if (data.success === false) {
            if (data.statusCode === 401 && navigate) {
                if (window.location.pathname !== "/sign-in") {
                    navigate("/sign-in");
                }
                return data;
            }

            if (!noAlert) {
                toast.error(data.message || "Error occurred");
            }
        }

        return data;
    } catch (error: any) {
        if (error.message && error.message !== "canceled") {
            // @ts-ignore
            if (import.meta.env.VITE_DEBUG_MODE === "true" && navigate) {
                navigate("/500");
            }
        }
    }
};
