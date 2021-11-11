import React from 'react';
import {CFAProvider} from "./State/Provider";
import {Routing} from "./Routing";


function App() {
  return (
      <CFAProvider>
       <Routing/>
      </CFAProvider>
  );
}

export default App;
