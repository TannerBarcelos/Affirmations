import { useEffect } from 'react';
function App() {
  useEffect(() => {
    fetch('/api/v1/affirmations').then((res) => {
      res.json().then((data) => console.log(data));
    });
  });
  return (
    <div className='App'>
      <h1>Hello, world</h1>
    </div>
  );
}

export default App;
