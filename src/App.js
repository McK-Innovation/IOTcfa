import React from 'react';
import {CFAProvider} from "./State/Provider";
import {Routing} from "./Routing";
import { Connector } from 'mqtt-react-hooks';

function App() {
  return (
  <Connector brokerUrl = "ws://localhost:1884/" options ={{keepalive: 0, clientId: 'CfaReact_1101'}}>
      <CFAProvider>
       <Routing/>
      </CFAProvider>
  </Connector>
  );
}

export default App;
