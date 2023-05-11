import {Navigate, Outlet} from "react-router-dom";

type Props = {
    user?: string;
    isLoggedIn: boolean
}

export default function ProtectedRoutes({user, isLoggedIn}: Props) {
    return (
        user || isLoggedIn ? <Outlet/> : <Navigate to={"/login"}/>
    )
}