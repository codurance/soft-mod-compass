import React, { useState } from 'react';

function App() {
  const [state, setState] = useState();

  return (
    <div>
      <span>Decision making for IT product and projects is based on what will carry the most value for the business.This question is required.</span>
      <button>Strongly Agree</button>
      <button>Agree</button>
      <button>Neither Agree Nor Disagree</button>
      <button>Disagree</button>
      <button>Strongly Disagree</button>
    </div>
  );
}

export default App;
