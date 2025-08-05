import { useState, useEffect } from "react";

export function useFetch(url, options) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url, {
            ...options,
            headers: {
                'Accept': 'application/json; charset=utf-8',
                ...options?.headers,
            }
        }).then(r => r.json()).then(data => {
            setData(data);
            setLoading(false);
        }).catch(err => {
            setError(err);
            setLoading(false);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

  return [data, loading, error];
}
