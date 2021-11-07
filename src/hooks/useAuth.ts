import { AuthContext } from "@/store/AuthProvider";
import { useContext } from "react";

const useAuth = () => useContext(AuthContext);

export default useAuth;