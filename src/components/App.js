//API Hub Request, Persist & Respond UI
//Main App component for D&B D+ IDentity Resolution

import React from 'react';
import { reqMaxQtyMCs } from  './AhRprIdrGlobals';
import { AhRprIdrForm } from './AhRprIdrForm';

let sIniIdrCriteria =
   "{ " +
      '"name": "",' +
      '"streetAddressLine1": "", ' +
      '"addressLocality": "", ' +
      '"countryISOAlpha2Code": "NL", ' +
      '"candidateMaximumQuantity": ' + reqMaxQtyMCs +
   " }";

function App(props) {
   return (
      <AhRprIdrForm iniIdrCriteria={sIniIdrCriteria} />
   );
}

export default App;
