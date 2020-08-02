//API Hub Request, Persist & Respond UI
//D&B D+ IDentity Resolution search criteria form

import React from 'react';
import { appStatus } from './AhRprIdrGlobals';
import { CountryAutosuggest } from './CountryAutosuggest';
import { AhRprIdrNotif } from './ahRprIdrNotif';
import { AhRprIdrErrAlert } from './ahRprIdrErrAlert';

const handleFocus = evnt => evnt.target.select();

function AhRprIdrCriteriaForm(props) {
   return (
      <form
         onSubmit={props.handleCriteriaSubmit}
         onReset={props.handleCriteriaReset}
      >
         <fieldset>
            <legend>Search criteria</legend>
            <CountryAutosuggest
               state={props.state}
               handleCriteriaChange={props.handleCriteriaChange}
               onFocus={handleFocus}
            />

            <input
               type="text"
               name="name"
               placeholder="Name"
               value={props.state.idrCriteria.name}
               onChange={props.handleCriteriaChange}
               ref={props.focusInp}
               onFocus={handleFocus}
            />

            <input
               type="text"
               name="streetAddressLine1"
               placeholder="Address"
               value={props.state.idrCriteria.streetAddressLine1}
               onChange={props.handleCriteriaChange}
               onFocus={handleFocus}
            />

            <input
              type="text"
              name="addressLocality"
              placeholder="City"
              value={props.state.idrCriteria.addressLocality}
              onChange={props.handleCriteriaChange}
              onFocus={handleFocus}
            />

            { props.state.appStatus === appStatus.criteriaSpec
               ?  <div className="btns">
                     <input type="submit" value="Submit" />
                     <input type="reset" value="Reset" />
                  </div> 
                  
               :  props.state.appStatus === appStatus.wait
                     ?  <AhRprIdrNotif
                           notifMsg='Processing, please wait ...'
                        />

                     :  props.state.appStatus === appStatus.error
                           ?  <AhRprIdrErrAlert
                                 handleCriteriaAlertClose={props.handleCriteriaAlertClose}
                                 state={props.state}
                              />

                           : null
            }
         </fieldset>

      </form>
   );
}

export { AhRprIdrCriteriaForm };
