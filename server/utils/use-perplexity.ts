import OpenAI from 'openai';

interface UsePerplexityInput {
  ideaDescription: string;
}

export const usePerplexity = async ({ ideaDescription }: UsePerplexityInput) => {
  const perplexityApiKey = useRuntimeConfig().perplexityApiKey;
  if (!perplexityApiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Perplexity API key is not set',
    });
  }

  const client = new OpenAI({
    apiKey: perplexityApiKey,
    baseURL: 'https://api.perplexity.ai',
  });

  const response = await client.chat.completions.create({
    model: 'sonar',
    messages: [
      {
        role: 'user',
        content: `Find the potential competitors for the following idea: ${ideaDescription}`,
      },
    ],
  });

  return response.choices[0].message.content;
};
