// api fetch for movie poster
export async function getPosterFromTMDb(
  title: string,
  year?: string
): Promise<string | null> {
  const token = process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN;

  async function searchTMDb(type: 'movie' | 'tv') {
    const url = `https://api.themoviedb.org/3/search/${type}?query=${encodeURIComponent(
      title
    )}&include_adult=true&language=en-US&page=1${year ? `&year=${year}` : ''}`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error(`Failed to search ${type}:`, res.statusText);
      return null;
    }

    const data = await res.json();
    return data.results?.[0] || null;
  }

  let result = await searchTMDb('movie');

  if (!result) {
    result = await searchTMDb('tv');
  }

  if (result?.poster_path) {
    return `https://image.tmdb.org/t/p/w500${result.poster_path}`;
  }

  return null;
}
