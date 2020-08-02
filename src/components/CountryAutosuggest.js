import React from "react";
import Autosuggest from "react-autosuggest";
import { arrIsoCountries } from './isoCountryData';

class CountryAutosuggest extends React.Component {
  constructor(props) {
    super(props);

    this.state = { suggestions: [] };
  }

  //Create an array of isoCountry objects which match
  //the input value passed into the function
  getSuggestions = inpValue => {
    //https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
    function escRegexChars(str) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    //Important, inpValue will almost always be a string but
    //can sometimes be undefined!
    if (!inpValue || inpValue.length <= 1) {
      return [];
    }

    const sInputValue = escRegexChars(inpValue.trim());

    const regExp = new RegExp(sInputValue, "i");

    if (sInputValue.length === 2) {
      return arrIsoCountries.filter(isoCtry => regExp.test(isoCtry.code));
    }

    return arrIsoCountries.filter(isoCtry =>
      regExp.test(isoCtry.description)
    );
  };

  //In this inplementation getSuggestionValue returns a
  //isoCountry object
  getSuggestionValue = isoCtry => {
    //Please note that in this inplementation inpValue will
    //always be an isoCountry object
    //console.log('isoCtry is a ' + typeof isoCtry);

    return isoCtry;
  };

  //renderSuggestion returns JSX
  renderSuggestion = isoCtry => <span>{isoCtry.toString()}</span>;

  //The function below retuns an array of isoCountry objects
  onSuggestionsFetchRequested = ({ value }) => {
    //Variable value will be of type string
    //console.log('value is a ' + typeof value);

    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  //The function below retuns an empty array
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { suggestions } = this.state;

    const autosuggestInpProps = {
      name: 'countryAutoSugg',
      placeholder: "Country",
      value: this.props.state.countryDesc,
      onChange: this.props.handleCriteriaChange
    };

    return (
      <div className="countryAutosuggest">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={autosuggestInpProps}
        />
        <input
          type="text"
          readOnly={true}
          tabIndex={-1}
          value={this.props.state.idrCriteria.countryISOAlpha2Code}
        />
      </div>
    );
  }
}

export { CountryAutosuggest };
