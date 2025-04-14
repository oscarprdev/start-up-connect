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
        content: `Find the potential competitors for the following idea: ${ideaDescription}.
          Please output a JSON object containing the following fields: "title", "description", "url".`,
      },
    ],
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: 'competitors',
        schema: {
          type: 'object',
          name: 'competitors',
          properties: {
            competitors: {
              type: 'array',
              items: {
                name: 'competitor',
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' },
                  url: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
  });

  return response.choices[0].message.content;
};
