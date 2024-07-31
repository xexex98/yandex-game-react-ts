import { useEffect } from 'react';

import { Loader } from './components/Loader';

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`;
      const response = await fetch(url);
      const data = await response.json();

      console.info(data);
    };

    fetchServerData();
  }, []);
  return <Loader />;
}

export default App;
