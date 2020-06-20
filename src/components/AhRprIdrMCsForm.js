//API Hub Request, Persist & Respond UI
//D&B D+ IDentity Resolution search criteria form

import React, { useState } from 'react';
import { maxMCsPerPage } from  './AhRprIdrGlobals';

function AhRprIdrMCsForm(props) {
   const mcsPage = 0;

   function mcHasTradeStyle(org) {
      return (
         org.tradeStyleNames && org.tradeStyleNames[0]
            ?  true
            :  false
      );
   }

   function mcHasRegNumber(org) {
      return (
         org.registrationNumbers
            && org.registrationNumbers[0]
            && org.registrationNumbers[0].registrationNumber
               ?  true
               :  false
      );
   }

   function mcHasTelNumber(org) {
      return (
         org.telephone && org.telephone[0] && org.telephone[0].telephoneNumber
            ?  true
            :  false
      );
   }

   function mcHasMailAdr(org) {
      return (
         org.mailingAddress
            && org.mailingAddress.streetAddress
            && org.mailingAddress.streetAddress.line1
               ?  true
               :  false
      );
   }

   function mcHasCEO(org) {
      return (
         org.mostSeniorPrincipals
            && org.mostSeniorPrincipals[0]
            && org.mostSeniorPrincipals[0].fullName
               ?  true
               :  false
      );
   }

   const [showTradeStyles, setShowTradeStyles] = 
            useState(props.state.idrMCs.matchCandidates.map(
               aMC => ({hasTradeStyles: mcHasTradeStyle(aMC.organization), isVisible: false})
            ));

   const [showMailAdr, setShowMailAdr] = 
            useState(props.state.idrMCs.matchCandidates.map(
               aMC => ({hasMailAdr: mcHasMailAdr(aMC.organization), isVisible: false})
            ));

   const [showCEO, setShowCEO] = 
            useState(props.state.idrMCs.matchCandidates.map(
               aMC => ({hasCEO: mcHasCEO(aMC.organization), isVisible: false})
            ));

   function TradeStylesFlag(props) {
      return (
         showTradeStyles[props.idx].hasTradeStyles
            ?  <span 
                  onMouseEnter = {() => {
                     setShowTradeStyles(Object.assign(
                           [...showTradeStyles],
                           {[props.idx]: {hasTradeStyles: true, isVisible: true}}
                        ))
                     }
                  }
                  onMouseLeave = {() => {
                     setShowTradeStyles(Object.assign(
                           [...showTradeStyles],
                           {[props.idx]: {hasTradeStyles: true, isVisible: false}}
                        ))
                     }
                  }
               > ➕ </span>
            :  null
      );
   }
         
   function MailAdrFlag(props) {
      return (
         showMailAdr[props.idx].hasMailAdr
            ?  <span 
                  onMouseEnter = {() => {
                     setShowMailAdr(Object.assign(
                           [...showMailAdr],
                           {[props.idx]: {hasMailAdr: true, isVisible: true}}
                        ))
                     }
                  }
                  onMouseLeave = {() => {
                     setShowMailAdr(Object.assign(
                           [...showMailAdr],
                           {[props.idx]: {hasMailAdr: true, isVisible: false}}
                        ))
                     }
                  }
               >  📨 </span>
            :  null
      );
   }

   function CeoFlag(props) {
      return (
         showCEO[props.idx].hasCEO
            ?  <span 
                  onMouseEnter = {() => {
                     setShowCEO(Object.assign(
                           [...showCEO],
                           {[props.idx]: {hasCEO: true, isVisible: true}}
                        ))
                     }
                  }
                  onMouseLeave = {() => {
                     setShowCEO(Object.assign(
                           [...showCEO],
                           {[props.idx]: {hasCEO: true, isVisible: false}}
                        ))
                     }
                  }
               > 👨‍💼 </span>
            :  null
      );
   }

   function getStrOOB(org) {
      return (
         org.dunsControlStatus &&
            org.dunsControlStatus.operatingStatus &&
            org.dunsControlStatus.operatingStatus.dnbCode &&
            org.dunsControlStatus.operatingStatus.dnbCode === 403
               ?  '\u00a0 ⛔️'
               :  ''
      );
   }

   function getStrFamRoleBranch(org) {
      return (
         org.corporateLinkage &&
            org.corporateLinkage.familytreeRolesPlayed &&
            org.corporateLinkage.familytreeRolesPlayed[0] &&
            org.corporateLinkage.familytreeRolesPlayed[0].dnbCode &&
            org.corporateLinkage.familytreeRolesPlayed[0].dnbCode === 9140
               ?  ' 🇧 '
               :  ''
      );
   }

   function getStrPrimaryAdr(org, line) {
      return (
         org.primaryAddress &&
            org.primaryAddress.streetAddress &&
            org.primaryAddress.streetAddress[line]
               ?  '\n' + org.primaryAddress.streetAddress[line]
               :  ''
      );
   }

   function getStrPostalCode(org) {
      let sPostalCode = '\n-';

      if(org.primaryAddress && org.primaryAddress.postalCode) {
         sPostalCode = '\n' + org.primaryAddress.postalCode;
      }

      sPostalCode += '\u00a0 '

      return(sPostalCode);
   }

   function getStrMailAdrPostalCode(org) {
      let sPostalCode = '';

      if(org.mailingAddress && org.mailingAddress.postalCode) {
         sPostalCode = ', ' + org.mailingAddress.postalCode;
      }

      return(sPostalCode);
   }

   function getStrCity(org) {
      let sCity = '';

      if(org.primaryAddress && 
            org.primaryAddress.addressLocality &&
            org.primaryAddress.addressLocality.name) {
               sCity = org.primaryAddress.addressLocality.name;
      }

      return(sCity);
   }

   function getStrMailAdrCity(org) {
      let sCity = '';

      if(org.mailingAddress && 
            org.mailingAddress.addressLocality &&
            org.mailingAddress.addressLocality.name) {
               sCity = ', ' + org.mailingAddress.addressLocality.name;
      }

      return(sCity);
   }

   function getStrRegNumber(org) {
      let sRegNum = '';

      if(mcHasRegNumber(org)) {
         sRegNum = '🆔 ' + org.registrationNumbers[0].registrationNumber + ' ';
      }

      return(sRegNum);
   }

   function getStrTelNumber(org) {
      let sTelNum = '';

      if(mcHasTelNumber(org)) {
         sTelNum = '☎️ ' + org.telephone[0].telephoneNumber;
      }

      return(sTelNum);
   }

   return (
      <form
         onSubmit={props.handleMCsSubmit}
         onReset={props.handleMCsReset}
      >
         <fieldset>
            <legend>Select a match candidate</legend>

            <div className="MCs">
               {
                  props.state.idrMCs.matchCandidates
                     .filter((elem, idx) => idx >= mcsPage * maxMCsPerPage && idx < (mcsPage + 1) * maxMCsPerPage) 
                     .map((oMC, idx) => 
                        <div className="aMC clear" key={oMC.organization.duns} >
                           <label>
                              <input
                                 type="radio"
                                 name="optMC"
                                 id={"opt_" + idx}
                                 value={oMC.organization.duns}
                                 onChange={props.handleMCsChange}
                                 defaultChecked={oMC.organization.duns===props.state.optMC}
                                 ref={oMC.organization.duns===props.state.optMC ? props.focusOpt : null}
                              />
                              <div>
                                 {oMC.organization.primaryName}
                                 {getStrOOB(oMC.organization)}
                                 <TradeStylesFlag idx={idx} />

                                 {
                                    showTradeStyles[idx].hasTradeStyles && showTradeStyles[idx].isVisible
                                       ?  <span><i>
                                             {'\n' + oMC.organization.tradeStyleNames.map(tsn => tsn.name).join(', ')}
                                          </i></span>
                                       :  null
                                 }

                                 {getStrPrimaryAdr(oMC.organization, 'line1')}

                                 {getStrPrimaryAdr(oMC.organization, 'line2')}

                                 {getStrPostalCode(oMC.organization)}
                                 {getStrCity(oMC.organization)}

                                 {mcHasRegNumber(oMC.organization) ||
                                    mcHasTelNumber(oMC.organization) ||
                                    mcHasMailAdr(oMC.organization) ||
                                    mcHasCEO(oMC.organization)
                                       ?  '\n'
                                       :  ''
                                 }
                                 {getStrRegNumber(oMC.organization)}
                                 {getStrTelNumber(oMC.organization)}
                                 <MailAdrFlag idx={idx} />
                                 <CeoFlag idx={idx} />
                                 {getStrFamRoleBranch(oMC.organization)}

                                 {
                                    showMailAdr[idx].hasMailAdr && showMailAdr[idx].isVisible
                                       ?  <span><i>
                                             {
                                                '\n' + 
                                                oMC.organization.mailingAddress.streetAddress.line1 + 
                                                getStrMailAdrPostalCode(oMC.organization) +
                                                getStrMailAdrCity(oMC.organization)
                                             }
                                          </i></span>
                                       :  null
                                 }

                                 {
                                    showCEO[idx].hasCEO && showCEO[idx].isVisible
                                       ?  <span><i>
                                             {'\n' + oMC.organization.mostSeniorPrincipals[0].fullName}
                                          </i></span>
                                       :  null
                                 }
                              </div>
                           </label>
                        </div>
                     )
               }
            </div>

            <div className="btns">
               <input type="submit" value="Submit" />
               <input type="reset" value="Reset" />
            </div> 
         </fieldset>
      </form>
   );
}

export { AhRprIdrMCsForm };
