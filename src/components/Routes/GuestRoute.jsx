import { useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";

const GuestRoute = ({ children }) => {

  let location = useLocation();
  const params = location?.search.substring(1).split("&");
  const path = params.find((item) => item.indexOf("path") > -1);
  const redirect = path?.split("=")?.[1];

  const ok = localStorage.getItem("BTSBIMBEL:token");
  const navigate = useNavigate();

  
  useEffect(() => {
    if (ok) navigate(`/`);
  }, [location]);
  
  if (ok) return null;
  
  if (redirect) localStorage.setItem("BTSBIMBEL:redirect", redirect);
  return children;
};

export default GuestRoute;
