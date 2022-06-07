import { getMetrics } from '@/services/metricsAPI';
import { NextApiHandler } from 'next';

export const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'GET')
    return res.status(405).json({ message: 'Method not allowed' });

  const metrics = await getMetrics();

  res.setHeader(
    'Cache-Control',
    'max-age=60, s-maxage=60, stale-while-revalidate',
  );

  res.json(metrics);
};

export default handler;
