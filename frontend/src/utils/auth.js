import { useSyncExternalStore } from "react";

const AUTH_EVENT = "auth-change";
const emptySession = { token: null, role: null, userId: null, isAuthenticated: false };
let cachedToken = null;
let cachedSession = emptySession;

const decodeBase64Url = (value) => {
    const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(normalized.length + ((4 - normalized.length % 4) % 4), "=");

    try {
        return atob(padded);
    } catch {
        return null;
    }
};

export const getAuthSession = () => {
    const token = localStorage.getItem("token");

    if (token === cachedToken) {
        return cachedSession;
    }

    if (!token) {
        cachedToken = null;
        cachedSession = emptySession;
        return cachedSession;
    }

    const [, payload] = token.split(".");
    const decoded = payload ? decodeBase64Url(payload) : null;

    if (!decoded) {
        cachedToken = null;
        cachedSession = emptySession;
        return cachedSession;
    }

    try {
        const data = JSON.parse(decoded);
        cachedToken = token;
        cachedSession = {
            token,
            role: data.role ?? null,
            userId: data.user_id ?? null,
            isAuthenticated: Boolean(data.role && data.user_id),
        };
        return cachedSession;
    } catch {
        cachedToken = null;
        cachedSession = emptySession;
        return cachedSession;
    }
};

export const setAuthSession = (token) => {
    localStorage.setItem("token", token);
    window.dispatchEvent(new Event(AUTH_EVENT));
};

export const clearAuthSession = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event(AUTH_EVENT));
};

const subscribe = (callback) => {
    window.addEventListener(AUTH_EVENT, callback);
    const handleStorage = (event) => {
        if (event.key === null || event.key === "token") {
            callback();
        }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
        window.removeEventListener(AUTH_EVENT, callback);
        window.removeEventListener("storage", handleStorage);
    };
};

export const useAuthSession = () => useSyncExternalStore(subscribe, getAuthSession, getAuthSession);

export const getDefaultRouteForRole = (role) => {
    if (role === "customer") {
        return "/report";
    }

    if (role === "engineer") {
        return "/engineer";
    }

    if (role === "admin") {
        return "/admin";
    }

    return "/";
};
