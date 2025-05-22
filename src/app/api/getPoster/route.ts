import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { getPosterFromTMDb } from '@/lib/getPosterFromTMDb';

// Get MongoDB connection URI from environment variables
const uri = process.env.MONGODB_URI!;
let cachedClient: MongoClient | null = null;

// Connect to MongoDB (reuse the client if already connected)
async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }
  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

// Handle GET requests
export async function GET(req: Request) {
  const url = new URL(req.url);
  const title = url.searchParams.get('title');
  const year = url.searchParams.get('year');

  // Return 400 Bad Request if title is missing
  if (!title) {
    return NextResponse.json({ error: 'Missing title' }, { status: 400 });
  }

  const client = await connectToDatabase();
  const db = client.db('filmsCache');
  const collection = db.collection('posters');

  // Create a unique cache key using title and year
  const cacheKey = `${title}_${year ?? ''}`;

  // Try to get the poster from the cache
  const cached = await collection.findOne({ cacheKey });

  if (cached) {
    return NextResponse.json({ poster: cached.poster });
  }

  // If not cached, fetch poster from TMDb
  const poster = await getPosterFromTMDb(title, year ?? undefined);

  // Store the fetched poster in the cache (insert or update)
  await collection.updateOne(
    { cacheKey },
    { $set: { poster } },
    { upsert: true }
  );
  return NextResponse.json({ poster });
}
