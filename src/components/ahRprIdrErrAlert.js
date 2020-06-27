//API Hub Request, Persist & Respond UI
//D&B D+ IDentity Resolution error alert component

import React, { useRef, useEffect } from 'react';

function AhRprIdrErrAlert(props) {
   const noOutLine = {outline: 'none'};

   const btnClose = useRef(null);

   useEffect(() => {btnClose.current.focus()}, []);
  
   return (
      <div className="errAlert">
         <div>
            <button
               onClick={props.handleCriteriaAlertClose}
               style={noOutLine}
               ref={btnClose}
            >
               <img
                  src="../../assets/img/x-square.svg"
                  alt=""
                  width="14"
                  height="14"
                  title="Click to close"
               />
            </button>
         </div>
         <p>
            {props.state.idrErrMsg}
         </p>
      </div>
   );
}

export { AhRprIdrErrAlert };
