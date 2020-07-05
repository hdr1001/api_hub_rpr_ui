//API Hub Request, Persist & Respond UI
//D&B D+ IDentity Resolution form logic

import React, { Component } from 'react';
import { appStatus } from  './AhRprIdrGlobals';
import { fetchApiHubIdrMCs, updApiHubIdrDUNS } from  './AhRprIdrFetch';
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
         appStatus: appStatus.criteriaSpec,
      };

      //Handle events originating from the criteria form
      this.handleCriteriaChange = this.handleCriteriaChange.bind(this);
      this.handleCriteriaAlertClose = this.handleCriteriaAlertClose.bind(this);
      this.handleCriteriaSubmit = this.handleCriteriaSubmit.bind(this);
      this.handleCriteriaReset = this.handleCriteriaReset.bind(this);

      //Handle events originating from the match candidates form
      this.handleMCsChange = this.handleMCsChange.bind(this);
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

   handleMCsChange(event) {
      const { name, value } = event.target;

      //Set value of state property optMC
      this.setState({ [name]: value});   
   }

   handleCriteriaAlertClose(event) {
      this.setState(
         {
            appStatus: appStatus.criteriaSpec,
            idrErrMsg: ''
         }
      );

      //Set the focus to the designated input element
      this.criteriaFormFocusInp.focus();
   }

   handleCriteriaSubmit(event) {
      this.setState({appStatus: appStatus.wait});

      //Application status will be updated in fetchApiHubIdrMCs!
      fetchApiHubIdrMCs.call(this);

      event.preventDefault();
   }

   handleCriteriaReset(event) {
      this.setState({idrCriteria: {...this._iniIdrCriteria}});

      //Set the focus to the designated input element
      this.criteriaFormFocusInp.focus();

      event.preventDefault();
   }

   handleMCsSubmit(event) {
      if(this.state.optMC) {
         console.log('DUNS ' + this.state.optMC +
                        ' selected for IDR ID ' + this.state.idrID);

         updApiHubIdrDUNS(this.state.idrID, this.state.optMC);
      }
      else {
         console.log('🤔, on submit expression this.state.optMC evaluates to false!');
      }

      this.setState({
         idrCriteria: {...this._iniIdrCriteria},
         idrMCs: null,
         idrID: null,
         optMC: null,
         appStatus: appStatus.criteriaSpec
      });

      //Set the focus to the designated input element
      this.criteriaFormFocusInp.focus();
   }

   handleMCsReset(event) {
      this.setState({
         idrMCs: null,
         idrID: null,
         optMC: null,
         appStatus: appStatus.criteriaSpec
      });

      //Set the focus to the designated input element
      this.criteriaFormFocusInp.focus();
   }

   render() {
      return (
         <React.Fragment>
            <AhRprIdrCriteriaForm
               state={this.state}
               handleCriteriaChange={this.handleCriteriaChange}
               handleCriteriaAlertClose={this.handleCriteriaAlertClose}
               handleCriteriaSubmit={this.handleCriteriaSubmit}
               handleCriteriaReset={this.handleCriteriaReset}
               focusInp={inp => this.criteriaFormFocusInp = inp}
            />

            { (this.state.appStatus === appStatus.selectMC)
               ?  <AhRprIdrMCsForm
                     state={this.state} 
                     handleMCsChange={this.handleMCsChange}
                     handleMCsSubmit={this.handleMCsSubmit}
                     handleMCsReset={this.handleMCsReset}
                     focusOpt={inp => this.mcsFormFocusOpt = inp}
                  />
               :  null
            }
         </React.Fragment>
      );
   }
}

export { AhRprIdrForm };
