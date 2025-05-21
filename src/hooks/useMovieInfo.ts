/* eslint-disable @typescript-eslint/no-explicit-any */
// hook for getting full movie info
import { useEffect, useState } from 'react';

export function useMovieInfo(title: string | null, year?: string | null) {
  const [movieInfo, setMovieInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!title) {
      setMovieInfo(null);
      return;
    }

    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    params.append('title', title);
    if (year) params.append('year', year);

    fetch(`/api/getMovieFullInfo?${params.toString()}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setMovieInfo(data);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [title, year]);

  console.log(movieInfo);

  return { movieInfo, loading, error };
}
