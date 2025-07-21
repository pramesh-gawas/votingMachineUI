import {
  toast,
  type ToastContent,
  type ToastOptions,
  Bounce,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type ToastSeverity =
  | "success"
  | "error"
  | "info"
  | "warning"
  | "default";

const defaultToastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
};

export const Toaster = (
  message: ToastContent,
  severity: ToastSeverity = "default",
  options?: ToastOptions
) => {
  const mergedOptions = { ...defaultToastOptions, ...options };

  switch (severity) {
    case "success":
      toast.success(message, mergedOptions);
      break;
    case "error":
      toast.error(message, mergedOptions);
      break;
    case "info":
      toast.info(message, mergedOptions);
      break;
    case "warning":
      toast.warn(message, mergedOptions);
      break;
    case "default":
    default:
      toast(message, mergedOptions);
      break;
  }
};
