import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();
const useAuthContext = () => useContext(AuthContext);
export default useAuthContext;

const API_URL = "https://mediotec-be.onrender.com/";
// const API_URL = "http://192.168.1.10:8000/";

export function AuthProvider({ children }) {
    const [isLogged, setIsLogged] = useState(false);
    const [tokens, setTokens] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        // Set user on init or redirect to /login
        const getTokens = async () => {
            const _tokens = await AsyncStorage.getItem("tokens");
            const parsedTokens = JSON.parse(_tokens);
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
        console.log(JSON.stringify({ refresh: tokens.refresh }));

        const response = await fetch(API_URL + "api/token/refresh/", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({ refresh: tokens.refresh }),
        });

        console.log(response)
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            const _tokens = { ...tokens, access: data.access };
            console.log("_tokens", _tokens)
            const _user = jwtDecode(JSON.stringify(_tokens));
            console.log("_user", _user)
            setTokens(_tokens);
            setUser(_user);
            console.log(data)
            AsyncStorage.setItem("tokens", JSON.stringify(data));
            return _tokens
        } else {
            logout()
        }
    }

    async function postRequest(url, obj) {
        let res
        try {
            res = await fetch(`${API_URL}${url}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + tokens.access,
                },
                body: JSON.stringify(obj),
            });
        } catch {
            return logout()
        }

        if (res.status === 401) {
            console.log("UNAUTHORIZED", res)
            const newTokens = await getNewAccessToken();
            console.log("RETRYING", newTokens)
            try {
                res = await fetch(`${API_URL}${url}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + newTokens.access,
                    },
                    body: JSON.stringify(obj),
                });
            } catch {
                return logout()
            }
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
            return logout()
        }

        if (res.status === 401) {
            console.log("UNAUTHORIZED", res)
            const newTokens = await getNewAccessToken();
            console.log("RETRYING", newTokens)
            try {
                res = await fetch(`${API_URL}${url}`, {
                    method: "GET",
                    headers: { Authorization: "Bearer " + newTokens.access },
                });
            } catch {
                return logout()
            }
        }

        if (!res.ok) {
            logout()
        }

        return res;
    }

    async function deleteRequest(url) {
        let res
        try {
            res = await fetch(url, {
                method: "DELETE",
                headers: { Authorization: "Bearer " + tokens.access },
            });
        } catch {
            return logout()
        }

        if (res.status === 401) {
            console.log("UNAUTHORIZED", res)
            const newTokens = await getNewAccessToken();
            console.log("RETRYING", newTokens)
            try {
                res = await fetch(url, {
                    method: "DELETE",
                    headers: { Authorization: "Bearer " + newTokens.access },
                });
            } catch {
                return logout()
            }
        }

        if (!res.ok) {
            logout()
        }

        return res;
    }

    async function patchRequest(url, obj) {
        let res
        try {
            res = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + tokens.access,
                },
                body: JSON.stringify(obj),
            });
        } catch {
            return logout()
        }

        if (res.status === 401) {
            console.log("UNAUTHORIZED", res)
            const newTokens = await getNewAccessToken();
            console.log("RETRYING", newTokens)
            try {
                res = await fetch(url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + newTokens.access,
                    },
                    body: JSON.stringify(obj),
                });
            } catch {
                return logout()
            }
        }

        if (!res.ok) {
            logout()
        }

        return res;
    }

    async function postLogin(userObject) {
        const res = await fetch(API_URL + "login_student/", {
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

        return [res, data];
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
