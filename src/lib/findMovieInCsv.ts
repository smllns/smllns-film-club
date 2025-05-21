// hook fur finding a movie in my CSV file
'use client';
import { loadCsv } from './loadCsv';
type CsvMovie = {
  Name: string;
  Year: string;
  Rating: string;
  'Letterboxd URI': string;
};

export const findMovieInCsv = async (
  title: string,
  year: string
): Promise<{ rating: string; letterboxdUri: string } | null> => {
  const data = await loadCsv();
  const movie = (data as CsvMovie[]).find(
    (m) => m.Name.toLowerCase() === title.toLowerCase() && m.Year === year
  );
  if (movie) {
    return { rating: movie.Rating, letterboxdUri: movie['Letterboxd URI'] };
  }
  return null;
};
