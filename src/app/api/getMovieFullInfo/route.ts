import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { getMovieFullInfoFromTMDb } from '@/lib/getMovieInfoFromTMDb';

// Get the MongoDB connection string from environment variables
const uri = process.env.MONGODB_URI!;
let cachedClient: MongoClient | null = null;

// Reuse MongoDB client if already connected
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

  // If no title is provided, return 400 Bad Request
  if (!title) {
    return NextResponse.json({ error: 'Missing title' }, { status: 400 });
  }

  const client = await connectToDatabase();
  const db = client.db('filmsCache');
  const collection = db.collection('fullMovieInfo');

  // Use a unique key for each movie, based on year and title
  const cacheKey = `${year ?? ''}_${title}`;

  // Try to find the movie info in the cache
  const cached = await collection.findOne({ cacheKey });

  if (cached) {
    console.log('Cache hit for', cacheKey);
    return NextResponse.json(cached.data);
  }

  // If not found in cache, fetch from TMDb
  const data = await getMovieFullInfoFromTMDb(title, year ?? undefined);

  if (!data) {
    return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
  }

  // Store fetched data in cache (insert or update)
  await collection.updateOne(
    { cacheKey },
    { $set: { data } },
    { upsert: true }
  );

  console.log('Cache miss, fetched from TMDb for', cacheKey);

  return NextResponse.json(data);
}
