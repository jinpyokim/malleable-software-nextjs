import type { Config } from '@netlify/functions';
import { store } from '../lib/analytics';

export default async () => {
  const cutoff = new Date(); cutoff.setUTCDate(cutoff.getUTCDate() - 30);
  const oldest = cutoff.toISOString().slice(0, 10);
  const storage = store();
  for await (const page of storage.list({ paginate: true })) {
    const expired = page.blobs.filter(blob => blob.key.slice(0, 10) < oldest);
    for (let offset = 0; offset < expired.length; offset += 25) await Promise.all(expired.slice(offset, offset + 25).map(blob => storage.delete(blob.key)));
  }
  return new Response(null, { status: 204 });
};
export const config: Config = { schedule: '0 4 * * *' };
