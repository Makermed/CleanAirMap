import { toast } from "react-toastify";
import parse from "html-react-parser";

export const ToastSuccess = (text) => {
  toast.success(text, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};

export const ToastError = (text) => {
  toast.error(text, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};

export const ToastInfo = (text) => {
  toast.info(text, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};

export const ToastWarning = (text) => {
  toast.warn(text, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};

export const ToastSocketSuccess = (htmlContent) => {
  const parsedHtml = parse(htmlContent);

  toast.success(parsedHtml, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    html: true,
  });
};
