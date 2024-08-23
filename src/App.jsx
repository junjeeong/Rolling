import { useEffect, useState } from 'react';
import './App.css';
import { getRecipients } from '../src/api/recipients';

function App() {
  const [recipients, setRecipients] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getRecipients();
      setRecipients(responseData.results);
    };

    fetchData();
  }, []);

  return (
    <>
      {/* {recipients?.map((recipient) => (
        <div key={recipient.id}>
          <img src={recipient.backgroundImageURL} />
        </div>
      ))} */}
    </>
  );
}

export default App;
