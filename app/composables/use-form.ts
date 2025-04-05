import type { z } from 'zod';

interface UseFormInput<T> {
  defaultValues: T;
  schema: z.ZodSchema;
  onSubmit: () => Promise<void>;
}

export const useForm = <T extends Record<string, unknown>>(input: UseFormInput<T>) => {
  const isPending = ref(false);
  const errors = ref<Record<string, string | string[]>>({});
  const formState = ref<T>(input.defaultValues);

  const handleSubmit = async () => {
    isPending.value = true;
    errors.value = {};

    const dataToValidate = Object.fromEntries(
      Object.entries(formState.value).filter(([_, value]) => value !== '')
    ) as T;

    const result = input.schema.safeParse(dataToValidate);

    if (!result.success) {
      errors.value = result.error.flatten().fieldErrors;
    } else {
      try {
        await input.onSubmit();
      } catch {
        isPending.value = false;
      }
    }
    isPending.value = false;
  };

  return {
    formState,
    isPending,
    errors,
    handleSubmit,
  };
};
