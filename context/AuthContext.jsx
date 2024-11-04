import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";

export const AuthContext = createContext();
const useAuthContext = () => useContext(AuthContext);
export default useAuthContext

export function AuthProvider({ children }) {
    const [isLogged, setIsLogged] = useState(false);
    const [tokens, setTokens] = useState(
        AsyncStorage.getItem("tokens") ? AsyncStorage.getItem("tokens") : null
    );
    const [user, setUser] = useState({});

    async function postRequest(url, obj) {
        const res = await fetch(`http://192.168.1.9:8000/${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + tokens.access,
            },
            body: JSON.stringify(obj),
        });

        if (res.status === 401) {
            logout();
        }

        return res;
    }

    async function getRequest(url) {
        const res = await fetch(`http://192.168.1.9:8000/${url}`, {
            method: "GET",
            headers: { Authorization: "Bearer " + tokens.access },
        });

        if (res.status === 401) {
            logout();
        }

        return res;
    }

    async function deleteRequest(url) {
        const res = await fetch(url, {
            method: "DELETE",
            headers: { Authorization: "Bearer " + tokens.access },
        });

        if (res.status === 401) {
            logout();
        }

        return res;
    }

    async function patchRequest(url, obj) {
        const res = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + tokens.access,
            },
            body: JSON.stringify(obj),
        });

        if (res.status === 401) {
            logout();
        }

        return res;
    }

    async function postLogin(userObject) {
        const res = await fetch("http://192.168.1.9:8000/login/", {
        // const res = await fetch("https://mediotec-be.onrender.com/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userObject),
        });

        const data = await res.json();

        if (res.ok) {
            setTokens(data);
            setIsLogged(true);
            setUser(jwtDecode(JSON.stringify(data)))
            AsyncStorage.setItem("tokens", JSON.stringify(data));
        }

        return res;
    }

    async function logout() {
        AsyncStorage.removeItem("tokens");
        setTokens(null);
        setIsLogged(false);
        setUser({})
        router.replace("/")
    }

    async function decodeToken() {
        try {
            return jwtDecode(JSON.stringify(await AsyncStorage.getItem("tokens")));
        } catch {
            return null;
        }
    }

    const context = {
        user,
        tokens,
        isLogged,
        decodeToken,
        postRequest,
        postLogin,
        getRequest,
        deleteRequest,
        patchRequest,
        logout,
    };

    return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
}
