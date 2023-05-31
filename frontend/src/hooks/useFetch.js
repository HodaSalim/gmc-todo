import { useState, useEffect } from "react";

import { api } from "../api";

export const useFetch = (url, options) => {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    api
      .get(url, options)
      .then(async (res) => {
        setIsLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return {
    data,
    setData,
    isLoading,
    error,
  };
};
