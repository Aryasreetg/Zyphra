import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const getClientSession = (): AuthSession | null => {
    const token = Cookies.get("JWT_TOKEN");
    if (!token) return null;

    try {
        const decodedToken: any = jwtDecode(token);
        return {
            name: decodedToken?.name ?? "",
            roles: decodedToken?.roles ?? "",
            uuid: decodedToken?.sub ?? "",
            email: decodedToken?.email ?? "",
            contactNo: decodedToken?.contactNo ?? "",
            avatarUrl: decodedToken?.avatarUrl ?? "",
            token: null,
        };
    } catch (error) {
        console.error("Failed to decode JWT token:", error);
        return null;
    }
};

export const setClientSession = (token: string) => {
    Cookies.set("JWT_TOKEN", token, {
        expires: 7, // 7 days
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production"
    });
};

export const clearClientSession = () => {
    Cookies.remove("JWT_TOKEN", { path: "/" });
};
