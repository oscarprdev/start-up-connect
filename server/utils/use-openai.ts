import { generateObject } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import type { z } from 'zod';

interface UseOpenAIProps {
  schema: z.ZodSchema;
  prompt: string;
}

export const useOpenAI = async <T>({ schema, prompt }: UseOpenAIProps): Promise<T> => {
  const apiKey = useRuntimeConfig().openaiApiKey;
  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'OpenAI API key is not set',
    });
  }

  const openai = createOpenAI({
    compatibility: 'strict',
    apiKey,
  });

  const { object } = await generateObject({
    model: openai.responses('gpt-4o'),
    schema,
    prompt,
  });

  return object as T;
};
