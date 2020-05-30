//API Hub Request, Persist & Respond UI
//D&B D+ IDentity Resolution search criteria form

import React from 'react';
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
               value={props.state.name}
               onChange={props.handleCriteriaChange}
            />

            <input
               type="text"
               name="streetAddressLine1"
               placeholder="Address"
               value={props.state.streetAddressLine1}
               onChange={props.handleCriteriaChange}
            />

            <input
              type="text"
              name="addressLocality"
              placeholder="City"
              value={props.state.addressLocality}
              onChange={props.handleCriteriaChange}
            />

            <div class="btns">
               <input type="submit" value="Submit" />
               <input type="reset" value="Reset" />
            </div>
         </fieldset>

      </form>
   );
}

export { AhRprIdrCriteriaForm };
