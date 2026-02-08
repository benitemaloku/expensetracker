import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider"
import { useEffect } from "react";
import axiosInstance from "../utils/axiosinstance";
import { API_PATHS } from "../utils/apiPaths";
import { useContext } from "react";

//custom React hook
export const useUserAuth = () => {
    const {user, updateUser, clearUser} = useContext(UserContext);
    const navigate = useNavigate();


useEffect(() => {
    if(user) return;

    let isMounted = true;

    const fetchUserInfo = async () => {
        try{
            const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);

            if (isMounted && response.data) {
                updateUser(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch user info:", error);
            if(isMounted) {
                clearUser();
                navigator("/login");
            }
        }
    };
    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, [user, updateUser, clearUser, navigate]);

  return { user, updateUser, clearUser };
};

export default useUserAuth;