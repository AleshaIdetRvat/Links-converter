import { useState, useCallback, useEffect } from "react";

const storageName = "userData";

export const useAuth = () => {
    console.log("USE AUTH HOOK");
    const [ready, setReady] = useState(false);
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken);
        setUserId(id);

        localStorage.setItem(
            storageName,
            JSON.stringify({ userId: id, token: jwtToken })
        );
    }, []);

    const logout = useCallback(() => {
        console.log("Logout");

        setToken(null);
        setUserId(null);
        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const authInitData = JSON.parse(localStorage.getItem(storageName));
        if (authInitData && authInitData.token)
            login(authInitData.token, authInitData.token);
        setTimeout(() => setReady(true), 1000); // !!!!!!!!!!!!!!!!
    }, [login]);

    return { login, logout, token, userId, ready };
};
