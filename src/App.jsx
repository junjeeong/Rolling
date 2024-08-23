//import { useEffect, useState } from 'react';
//import { getRecipients } from '../src/api/recipients';
import "./App.css";
import ToOptionPage from "./pages/post/ToOptionPage";

function App() {
  // const [recipients, setRecipients] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const responseData = await getRecipients();
  //     setRecipients(responseData.results);
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <ToOptionPage />
      {/* {recipients?.map((recipient) => (
        <div key={recipient.id}>
          <img src={recipient.backgroundImageURL} />
        </div>
      ))} */}
    </>
  );
}

export default App;
