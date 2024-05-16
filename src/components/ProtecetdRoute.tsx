
import { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";
import { FCC } from "../@types/types";

const ProtectedRoute: FCC = ({ children }) => {
    useContext(AuthContext);






    return <>{children}</>;
};

export default ProtectedRoute;