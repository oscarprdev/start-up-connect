import { supabase } from '../db';
import type { H3Event, EventHandler, EventHandlerRequest } from 'h3';

export const authMiddleware = <T extends EventHandlerRequest>(
  handler: EventHandler<T>
): EventHandler<T> => {
  return async (event: H3Event) => {
    const authHeader = getHeader(event, 'Authorization');
    const token = authHeader?.split(' ')[1];
    if (!token) {
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

    const { data: refreshSession } = await supabase.auth.getSession();
    if (
      refreshSession.session?.expires_at &&
      refreshSession.session.expires_at < Date.now() / 1000
    ) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Refresh token expired',
      });
    }

    await supabase.auth.refreshSession();
    event.context.user = session.user;

    return handler(event);
  };
};
