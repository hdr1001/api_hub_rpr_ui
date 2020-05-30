//API Hub Request, Persist & Respond UI
//Main App component for D&B D+ IDentity Resolution

import React from 'react';
import { AhRprIdrForm } from './AhRprIdrForm';

let jsonIniState =
   "{" +
      '"idrCriteria": {' +
         '"name": "",' +
         '"streetAddressLine1": "",' +
         '"addressLocality": "",' +
         '"countryISOAlpha2Code": "NL"' +
   "}}";

function App(props) {
   return (
      <AhRprIdrForm iniState={jsonIniState} />
   );
}

export default App;
