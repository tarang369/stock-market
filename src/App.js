import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import StockList from './components/StockList';

function App() {
  return (
    <div className='App'>
      <div className='container'>
        <div className='col-md-5 mt-5'>
          <div className='card'>
            <StockList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
