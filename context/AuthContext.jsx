import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();
const useAuthContext = () => useContext(AuthContext);
export default useAuthContext;

const API_URL = "https://mediotec-be.onrender.com/";
// const API_URL = "http://192.168.1.10:8080/";

export function AuthProvider({ children }) {
    const [isLogged, setIsLogged] = useState(false);
    const [tokens, setTokens] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        const getTokens = async () => {
            const _tokens = await AsyncStorage.getItem("tokens");
            const parsedTokens = JSON.parse(_tokens);
            console.log(_tokens, "\n\n", parsedTokens)
            if (parsedTokens) {
                const user = jwtDecode(JSON.stringify(_tokens));
                setTokens(parsedTokens);
                setUser(user);
                router.replace("/announcements");
            } else {
                router.replace("/login");
            }
        };
        getTokens();
    }, []);

    async function getNewAccessToken() {
        console.log("attempt to reconnect");
        console.log({ refresh: tokens.refresh });
        console.log(JSON.stringify({ refresh: tokens.refresh }));

        const response = await fetch(API_URL + "api/token/refresh/", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({ refresh: tokens.refresh }),
        });
        if (response.ok) {
            console.log("response", response)
            const data = await response.json();
            console.log("data", data)
            const _tokens = { ...tokens, access: data.access };
            console.log("_tokens", _tokens)
            const _user = jwtDecode(JSON.stringify(_tokens));
            console.log("_user", _user)
            setTokens(_tokens);
            setUser(_user);
            return router.replace("/announcements")
        }
        return
    }

    async function postRequest(url, obj) {
        const res = await fetch(`${API_URL}${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + tokens.access,
            },
            body: JSON.stringify(obj),
        });

        if (res.status === 401) {
            getNewAccessToken();
            // logout();
        }

        if (!res.ok) {
            console.log("res not ok", res)
            console.log("json", await res.json())
            logout()
        }

        return res;
    }

    async function getRequest(url) {
        let res;
        try {
            res = await fetch(`${API_URL}${url}`, {
                method: "GET",
                headers: { Authorization: "Bearer " + tokens.access },
            });
        } catch {
            throw Error
        }

        if (res.status === 401) {
            getNewAccessToken();
            //logout();
        }

        if (!res.ok) {
            console.log("res not ok", res)
            console.log("json", res)
            logout()
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

        if (!res.ok) {
            console.log("res not ok", res)
            console.log("json", res)
            logout()
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
        if (!res.ok) {
            console.log("res not ok", res)
            console.log("json", res)
            logout()
        }

        return res;
    }

    async function postLogin(userObject) {
        const res = await fetch(API_URL + "login/", {
            // const res = await fetch("https://mediotec-be.onrender.com/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userObject),
        });

        const data = await res.json();

        if (res.ok) {
            setTokens(data);
            setIsLogged(true);
            setUser(jwtDecode(JSON.stringify(data)));
            AsyncStorage.setItem("tokens", JSON.stringify(data));
        }

        return res;
    }

    async function logout() {
        AsyncStorage.removeItem("tokens");
        setTokens(null);
        setIsLogged(false);
        setUser({});
        router.replace("/login");
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
