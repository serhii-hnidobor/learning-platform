import createFirebaseCache from 'lib/cache/create-firebase-cache';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    await revalidateDbCache();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Failed to revalidate DB cache:', error);
    res.status(500).json({ error: 'Failed to revalidate DB cache' });
  }
}

async function revalidateDbCache() {
  await createFirebaseCache();
}
