//API Hub Request, Persist & Respond UI
//D&B API Hub Fetch code

import { appStatus } from "./AhRprIdrGlobals";

const ah = {
   scheme: 'http',
   host: '192.168.2.148',
   port: '8081',
   path: '/hub/idr'
}

function fetchApiHubIdrMCs() {
   const reqHeaders = new Headers();
   reqHeaders.append('Content-Type', 'application/json');

   const opts = {
      method: 'POST',
      headers: reqHeaders,
      body: JSON.stringify(this.state.idrCriteria)
   };

   fetch(ah.scheme + '://' + ah.host + ':' + ah.port + ah.path, opts)
      .then(resp => resp.json())
      .then(oDplIdrMCs => {
               this.setState({
                  idrMCs: oDplIdrMCs,
                  optMC: oDplIdrMCs.matchCandidates[0].organization.duns,
                  appStatus: appStatus.selectMC
               })
               //Set the focus to the designated input element
               this.mcsFormFocusOpt.focus();
      })
      .catch(err => console.log(err));
}

export { fetchApiHubIdrMCs };
