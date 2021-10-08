import { ToastContext } from "@/context/ToastContext";
import { useContext } from "react";

const useToastContext = () => {
  return useContext(ToastContext);
};

export default useToastContext;
