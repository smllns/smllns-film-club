/* eslint-disable @typescript-eslint/no-explicit-any */
// api fetch for full movie info
export async function getMovieFullInfoFromTMDb(
  title: string,
  year?: string
): Promise<any | null> {
  const token = process.env.NEXT_PUBLIC_TMDB_BEARER_TOKEN;

  async function searchTMDb(type: 'movie' | 'tv') {
    const url = `https://api.themoviedb.org/3/search/${type}?query=${encodeURIComponent(
      title
    )}&include_adult=true&language=en-US&page=1${year ? `&year=${year}` : ''}`;

    const res = await fetch(url, {
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
  let type: 'movie' | 'tv' = 'movie';

  if (!result) {
    result = await searchTMDb('tv');
    type = 'tv';
  }
  if (!result || !result.id) return null;

  const id = result.id;

  const creditsRes = await fetch(
    `https://api.themoviedb.org/3/${type}/${id}/credits`,
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!creditsRes.ok) {
    console.error('Failed to fetch credits:', creditsRes.statusText);
    return null;
  }
  const creditsData = await creditsRes.json();

  const detailsRes = await fetch(`https://api.themoviedb.org/3/${type}/${id}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!detailsRes.ok) {
    console.error('Failed to fetch details:', detailsRes.statusText);
    return null;
  }
  const detailsData = await detailsRes.json();

  return {
    ...result,
    media_type: type,
    credits: creditsData,
    genres: detailsData.genres,
    runtime: detailsData.runtime,
    budget: detailsData.budget,
    revenue: detailsData.revenue,
    original_language: detailsData.original_language,
    production_companies: detailsData.production_companies,
    production_countries: detailsData.production_countries,
    status: detailsData.status,
    release_date: detailsData.release_date,
  };
}
