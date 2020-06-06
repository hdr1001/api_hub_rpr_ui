//API Hub Request, Persist & Respond UI
//D&B D+ IDentity Resolution form logic

import React, { Component } from 'react';
import { appStatus } from  './AhRprIdrGlobals';
import { AhRprIdrCriteriaForm } from './AhRprIdrCriteriaForm';
import { AhRprIdrMCsForm } from './AhRprIdrMCsForm';

class AhRprIdrForm extends Component {
   constructor(props) {
      super(props);

      //Parse JSON passed in containing the initial search criteria
      this._iniIdrCriteria = JSON.parse(props.iniIdrCriteria);

      //Initialize the initial search criteria
      this.state = {
         idrCriteria: {...this._iniIdrCriteria},
         appStatus: appStatus.criteriaSpec
      };
 
      //Handle events originating from the criteria form
      this.handleCriteriaChange = this.handleCriteriaChange.bind(this);
      this.handleCriteriaSubmit = this.handleCriteriaSubmit.bind(this);
      this.handleCriteriaReset = this.handleCriteriaReset.bind(this);

      //Handle events originating from the match candidates form
      this.handleMCsSubmit = this.handleMCsSubmit.bind(this);
      this.handleMCsReset = this.handleMCsReset.bind(this);
   }

   handleCriteriaChange(event) {
      //Allow changing the search criteria only if the
      //application status is criteria specification
      if(this.state.appStatus !== appStatus.criteriaSpec) return;

      event.persist(); //http://bit.ly/2StVoUa

      this.setState(prevState => ({
         idrCriteria: {
            ...prevState.idrCriteria,
            [event.target.name]: event.target.value
         }
      }));
   }

   handleCriteriaSubmit(event) {
      this.setState(prevState => ({
         appStatus: appStatus.wait
      }));

      setTimeout(() => {
         this.setState(prevState => ({
            appStatus: appStatus.selectMC
         }));
      }, 3000);
/*      let sAlert = "", obj = this.state.idrCriteria;

      Object.keys(obj).forEach(key => {
         sAlert +=  key + " = " + obj[key] + ", ";
      });

      alert(sAlert.substr(0, sAlert.length - 2)); */

      event.preventDefault();
   }

   handleCriteriaReset(event) {
      this.setState(prevState => ({
         idrCriteria: {...this._iniIdrCriteria}
      }));

      //Set the focus to the designated input element
      this.criteriaFormFocusInp.focus();

      event.preventDefault();
   }

   handleMCsSubmit(event) {
      this.setState(prevState => ({
         idrCriteria: {...this._iniIdrCriteria},
         appStatus: appStatus.criteriaSpec
      }));
   }

   handleMCsReset(event) {
      this.setState(prevState => ({
         appStatus: appStatus.criteriaSpec
      }));
   }

   render() {
      return (
         <React.Fragment>
            <AhRprIdrCriteriaForm
               state={this.state}
               handleCriteriaChange={this.handleCriteriaChange}
               handleCriteriaSubmit={this.handleCriteriaSubmit}
               handleCriteriaReset={this.handleCriteriaReset}
               focusInp={inp => this.criteriaFormFocusInp = inp}
            />

            { (this.state.appStatus === appStatus.selectMC)
               ?  <AhRprIdrMCsForm
                     handleMCsSubmit={this.handleMCsSubmit}
                     handleMCsReset={this.handleMCsReset}
                  />
               :  null
            }
         </React.Fragment>
      );
   }
}

export { AhRprIdrForm };
