import { useNavigate } from "react-router-dom";
import { message } from "antd";

const useCheckData = () => {

    const navigate = useNavigate();

    const checkSnapshot = (docSnap: any) => {
        if(!docSnap.exists()) {
            message.error("No such document!");
            navigate(`404`);

            return false;
        }
    }

    return { checkSnapshot };
}

export default useCheckData;