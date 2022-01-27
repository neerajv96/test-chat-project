import { Route, Navigate } from 'react-router-dom';

const PublicRoute = ({ children, authState }: any) => {
    return !authState ? children : <Navigate to="/channel" />;
};

export default PublicRoute;
