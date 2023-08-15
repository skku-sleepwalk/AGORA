import { useContext } from "react";
import { AuthContext } from "../components/common/AuthProvider/AuthProvider";

function useAuth() {
  const context = useContext(AuthContext);
  console.log("context", context);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export default useAuth;
