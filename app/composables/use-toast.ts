export enum ToastType {
  Default = 'default',
  Success = 'success',
  Error = 'error',
}

const toastDuration = 3000;

export const useToast = () => {
  const toast = useState('toast', () => ({
    message: '',
    type: ToastType.Default,
    show: false,
  }));

  const showToast = (message: string, type: ToastType) => {
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
