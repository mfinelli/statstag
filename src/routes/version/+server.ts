import { json } from '@sveltejs/kit';

export function GET() {
  return json({ version: '0.0.1' });
}
