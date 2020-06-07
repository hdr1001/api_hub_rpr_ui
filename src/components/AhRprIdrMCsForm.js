//API Hub Request, Persist & Respond UI
//D&B D+ IDentity Resolution search criteria form

import React from 'react';
import { appStatus } from  './AhRprIdrGlobals';

function AhRprIdrMCsForm(props) {
   return (
      <form
         onSubmit={props.handleMCsSubmit}
         onReset={props.handleMCsReset}
      >
         <fieldset>
            <legend>Select a match candidate</legend>

            <div class="btns">
               <input type="submit" value="Submit" />
               <input type="reset" value="Reset" />
            </div> 
         </fieldset>
      </form>
   );
}

export { AhRprIdrMCsForm };
