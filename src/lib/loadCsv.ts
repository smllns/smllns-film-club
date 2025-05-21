//loading my csv file
import Papa from 'papaparse';

export const loadCsv = async (): Promise<Record<string, string>[]> => {
  return new Promise((resolve, reject) => {
    fetch('/ratings.csv')
      .then((response) => response.text())
      .then((text) => {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            resolve(results.data as Record<string, string>[]);
          },
          error: (error: Error) => reject(error),
        });
      })
      .catch(reject);
  });
};
