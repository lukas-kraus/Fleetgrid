import {useEffect, useState} from "react";
import axios from "axios";

export default function useUser() {
    const [user, setUser] = useState<string>()
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        function userIsLoggedIn() {
            axios
                .get("/api/users/me")
                .then((response) => {
                    if (response.data && response.data !== "anonymousUser") {
                        setUser(response.data);
                    } else {
                        setIsLoggedIn(false);
                    }
                })
                .catch((r) =>
                    console.error("Couldn't stayed logged in: " + r)
                )
                .finally(() => {
                    setIsLoggedIn(false);
                });
        }

        // eslint-disable-next-line
        userIsLoggedIn();
    }, []);

    function login(username: string, password: string) {
        return axios.post("/api/users/login", undefined,
            {auth: {username, password}})
            .then(response => {
                setUser(response.data)
            })
            .catch(() => console.error("Login failed!"));
    }

    function logout() {
        axios.post("api/users/logout")
            .then(() => {
                setUser(undefined);
            })
            .catch(() => console.error("Could not logout ..."));
    }

    return {user, login, logout, isLoggedIn}
}