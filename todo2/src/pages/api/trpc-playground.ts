/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { appRouter } from '@/server/api/root'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { nextHandler } from 'trpc-playground/handlers/next'

interface SetupHandlerOptions {
  router: typeof appRouter;
  trpcApiEndpoint: string;
  playgroundEndpoint: string;
  polling: {
    interval: number;
  };
  renderOptions: {
    cdnUrl: string;
    version: string | null;
  };
  request: {
    superjson: boolean;
  };
}

const setupHandler = async (): Promise<NextApiHandler> => {
  const options: SetupHandlerOptions = {
    router: appRouter,
    trpcApiEndpoint: '/api/trpc',
    playgroundEndpoint: '/api/trpc-playground',
    polling: {
      interval: 4000,
    },
    renderOptions: {
      cdnUrl: 'http://localhost:45245',
      version: null,
    },
    request: {
      superjson: true,
    },
  };

  const handler = nextHandler(options);
  return handler;
};

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const playgroundHandler = await setupHandler();
  await playgroundHandler(req, res);
};

export default handler;