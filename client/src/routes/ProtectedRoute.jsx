import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../provider/authProvider";

export const ProtectedRoute = () => {
    const {token} = useAuth();

    // check if the user is authenticated
    if (!token) {
        // if not authenticated, redirect to the login page
        return <Navigate to="/login"/>;
    }

    // if authenticated, render the children components
    return <Outlet/>

}