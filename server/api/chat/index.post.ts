import { supabase } from '~~/server/db';
import { streamText, tool } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import OpenAI from 'openai';
import { z } from 'zod';

const OPENAI_MODEL = 'gpt-4o';

export default defineEventHandler(async event => {
  const { messages } = await readBody(event);
  if (!messages) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Messages are required',
    });
  }

  const authHeader = getHeader(event, 'Authorization');
  const refreshToken = getHeader(event, 'RefreshToken');
  const token = authHeader?.split(' ')[1];
  if (!token || !refreshToken) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authorization headers are required',
    });
  }

  const { data: session } = await supabase.auth.getUser(token);
  if (!session.user || session.user.role !== 'authenticated') {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }

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

  const result = streamText({
    model: openai(OPENAI_MODEL),
    messages,
    tools: {
      getRealTimeData,
    },
  });

  return result.toDataStreamResponse();
});

const usePerplexityModel = async ({ question }: { question: string }) => {
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
    messages: [{ role: 'user', content: question }],
  });

  return response.choices[0].message.content;
};

const getRealTimeData = tool({
  description: `get information in real time.`,
  parameters: z.object({
    question: z.string().describe('the users question'),
  }),
  execute: usePerplexityModel,
});
