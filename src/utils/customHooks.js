import { useEffect, useState } from "react";

const useFetchGet = (url, options) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, [url]);

  return data;
};

export { useFetchGet };
