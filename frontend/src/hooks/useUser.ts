import {useEffect, useState} from "react";
import axios from "axios";
import {User} from "../model/User";
import {Driver} from "../model/Driver";

export default function useUser() {
    const [user, setUser] = useState<string>();
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [userDetails, setUserDetails] = useState<User>();

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

        userIsLoggedIn();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (user) {
            getUserDetails(user);
        }
    }, [user]);

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

    function getUserDetails(user: string) {
        axios.get(`/api/users/${user}`)
            .then(response => {
                setUserDetails(response.data);
            })
            .catch(() => console.error("Couldn't load all cars"));
    }

    function editUser(user: User) {

    }

    function logoutUser() {
        return new Promise<void>((resolve) => {
            logout();
            resolve();
        });
    }

    return {user, login, isLoggedIn, userDetails, editUser, logoutUser}
}