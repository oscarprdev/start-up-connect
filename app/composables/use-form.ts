import type { z } from 'zod';

interface UseFormInput<T> {
  defaultValues: T;
  schema: z.ZodSchema;
  onSubmit: () => Promise<void>;
}

export const useForm = <T>(input: UseFormInput<T>) => {
  const isPending = ref(false);
  const errors = ref<Record<string, string | string[]>>({});
  const formState = ref<T>(input.defaultValues);

  const handleSubmit = async () => {
    isPending.value = true;
    const result = input.schema.safeParse(formState.value);
    if (!result.success) {
      errors.value = result.error.flatten().fieldErrors;
    } else {
      await input.onSubmit();
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
