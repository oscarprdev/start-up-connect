export const ToastType = {
  Default: 'default',
  Success: 'success',
  Error: 'error',
} as const;

export type ToastTypeType = (typeof ToastType)[keyof typeof ToastType];

const toastDuration = 3000;

export const useToast = () => {
  const toast = useState('toast', () => ({
    message: '',
    type: ToastType.Default as ToastTypeType,
    show: false,
  }));

  const showToast = (message: string, type: ToastTypeType) => {
    toast.value.message = message;
    toast.value.type = type;
    toast.value.show = true;

    setTimeout(() => {
      hideToast();
    }, toastDuration);
  };

  const hideToast = () => {
    toast.value.show = false;
  };

  return {
    toast,
    showToast,
    hideToast,
  };
};
