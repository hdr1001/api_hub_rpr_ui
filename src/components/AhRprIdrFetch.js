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
      .then(resp => {
         //Throw an error if HTTP status code <> 200
         if(!resp.ok) {
            let sMsg = 'API Hub returned HTTP status code ' + resp.status;

            console.log(sMsg); //Log the message in the console

            let httpErr = new Error(sMsg);

            //Make the fetch response a property of the error object
            httpErr.fetchResp = resp; 

            throw httpErr;
         }

         let idrID; //Primary key on database API Hub table match_dnb_idr

         if(resp.headers.has('X-DNB-DPL-IDR-ID')) {
            console.log('X-DNB-DPL-IDR-ID = ' + resp.headers.get('X-DNB-DPL-IDR-ID'));

            //The IDentity Resolution ID is passed in an HTTP header
            idrID = resp.headers.get('X-DNB-DPL-IDR-ID');

            //Variable idrID should be a number
            if(isNaN(parseInt(idrID))) {
               throw new Error('Variable idrID is not numeric: ' + idrID);
            }
         }
         else {
            throw new Error('Unable to retrieve value of header X-DNB-DPL-IDR-ID!');
         }

         // ... else continue processing the response
         return Promise.all([idrID, resp.json()]);
      })
      .then(arrPromises => {
         this.setState({
            idrMCs: arrPromises[1],
            idrID: arrPromises[0],
            optMC: arrPromises[1].matchCandidates[0].organization.duns,
            appStatus: appStatus.selectMC
         });

         //Set the focus to the designated input element
         this.mcsFormFocusOpt.focus();
      })
      .catch(err => {
         let errState = {
            idrMCs: null,
            idrID: null,
            optMC: null,
            appStatus: appStatus.error,
            idrErrMsg: err.message
         };

         //In case the HTTP status code returned is not 200 the
         //fetch response is passed in with the Error object
         if(err.fetchResp && err.fetchResp instanceof Response) {
            err.fetchResp.json()
               .then(oErr => {
                  errState.idrErrMsg = oErr.api_hub_err.ext_api.err_msg.error.errorMessage;
                  this.setState(errState)
               })
               .catch(e => this.setState(errState));
         }
         else {
            this.setState(errState)
         }
      })
}

function updApiHubIdrDUNS(idrID, sDUNS) {
   const reqHeaders = new Headers();
   reqHeaders.append('Content-Type', 'application/json');

   const opts = {
      method: 'POST',
      headers: reqHeaders,
      body: '{ "DUNS": "' + sDUNS + '" }'
   };

   fetch(ah.scheme + '://' + ah.host + ':' + ah.port + ah.path + '/' + idrID, opts)
      .then(resp => resp.json())
      .then(oResp => {
         if(oResp.rowCount === 1) {
            console.log('Successfully persisted DUNS ' + sDUNS + ' for IDR ID ' + idrID);
         }
         else {
            throw new Error('Error updating DUNS associated with IDR ID ' + idrID);
         }
      })
      .catch(err => {
         console.log(err.message);
      })
}

export { fetchApiHubIdrMCs, updApiHubIdrDUNS };
