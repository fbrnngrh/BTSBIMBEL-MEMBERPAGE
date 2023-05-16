import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const MemberRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const ok = localStorage.getItem("BTSBIMBEL:token");

  localStorage.removeItem("BTSBIMBEL:redirect");

  useEffect(() => {
    if (!ok) navigate(`/private?path=${location.pathname}`);
    else if (location.pathname === "/joined/:class")
      navigate(`/login?path=${location.pathname}`);
  }, [location]);

  if (!ok) return null;

  return children;
};

export default MemberRoute;
