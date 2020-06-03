//API Hub Request, Persist & Respond UI
//D&B D+ IDentity Resolution search criteria form

import React from 'react';
import { appStatus } from  './AhRprIdrGlobals';
import idrStyles from '../ahRprIdr.css';

function AhRprIdrCriteriaForm(props) {
   return (
      <form
         onSubmit={props.handleCriteriaSubmit}
         onReset={props.handleCriteriaReset}
      >
         <fieldset>
            <legend>Search criteria</legend>
            <input
               type="text"
               name="name"
               placeholder="Name"
               value={props.state.idrCriteria.name}
               onChange={props.handleCriteriaChange}
               ref={props.focusInp}
            />

            <input
               type="text"
               name="streetAddressLine1"
               placeholder="Address"
               value={props.state.idrCriteria.streetAddressLine1}
               onChange={props.handleCriteriaChange}
            />

            <input
              type="text"
              name="addressLocality"
              placeholder="City"
              value={props.state.idrCriteria.addressLocality}
              onChange={props.handleCriteriaChange}
            />

            { props.state.appStatus === appStatus.criteriaSpec
               ?  <div class="btns">
                     <input type="submit" value="Submit" />
                     <input type="reset" value="Reset" />
                  </div> 
                  
               :  props.state.appStatus === appStatus.wait
                     ?  <div class="notification">
                           <p>Processing, please wait ...</p>
                        </div> 

                     :  null
            }
         </fieldset>

      </form>
   );
}

export { AhRprIdrCriteriaForm };
