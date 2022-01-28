import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, authState }: any) => {
    return authState ? children : <Navigate to="/" />;
};

export default PrivateRoute;
