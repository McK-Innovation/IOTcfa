import React from 'react';
import {CFAProvider} from "./State/Provider";
import {Routing} from "./Routing";
import { Connector } from 'mqtt-react-hooks';

function App() {
  return (
  <Connector brokerUrl = "wss://localhost:1883/">
      <CFAProvider>
       <Routing/>
      </CFAProvider>
  </Connector>
  );
}

export default App;
