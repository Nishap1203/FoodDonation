
import React from "react";
import { Toaster, toast } from "react-hot-toast";

export const notifySuccess = (message: string) => {
  toast.success(message);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const notifyError = (message: string, error: unknown) => {
  toast.error(message);
};

const ToastNotification = () => <Toaster position="top-right" />;

export default ToastNotification;
