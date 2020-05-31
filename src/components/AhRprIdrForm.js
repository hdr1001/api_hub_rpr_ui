//API Hub Request, Persist & Respond UI
//D&B D+ IDentity Resolution form logic

import React, { Component } from 'react';
import { AhRprIdrCriteriaForm } from './AhRprIdrCriteriaForm'

class AhRprIdrForm extends Component {
   constructor(props) {
      super(props);

      this.state = JSON.parse(props.iniState);

      //Handle events originating from the criteria form
      this.handleCriteriaChange = this.handleCriteriaChange.bind(this);
      this.handleCriteriaSubmit = this.handleCriteriaSubmit.bind(this);
      this.handleCriteriaReset = this.handleCriteriaReset.bind(this);
   }

   handleCriteriaChange(event) {
      event.persist(); //http://bit.ly/2StVoUa

      this.setState(prevState => ({
         idrCriteria: {
            ...prevState.idrCriteria,
            [event.target.name]: event.target.value
         }
      }));
   }

   handleCriteriaSubmit(event) {
      let sAlert = "", obj = this.state.idrCriteria;

      Object.keys(obj).forEach(key => {
         sAlert +=  key + " = " + obj[key] + ", ";
      });

      alert(sAlert.substr(0, sAlert.length - 2));
  
      event.preventDefault();
   }

   handleCriteriaReset(event) {
      this.setState(JSON.parse(this.props.iniState));

      //Set the focus to the designated input element
      this.criteriaFormFocusInp.focus();

      event.preventDefault();
   }

   render() {
      return (
         <AhRprIdrCriteriaForm
            state={this.state.idrCriteria}
            handleCriteriaChange={this.handleCriteriaChange}
            handleCriteriaSubmit={this.handleCriteriaSubmit}
            handleCriteriaReset={this.handleCriteriaReset}
            focusInp={inp => this.criteriaFormFocusInp = inp}
         />
      );
   }
}

export { AhRprIdrForm };
