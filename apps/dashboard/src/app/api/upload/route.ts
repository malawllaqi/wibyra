import { router } from '@/lib/upload';
import { createRouteHandler } from '@repo/storage';

export const { GET, POST } = createRouteHandler({ router });
