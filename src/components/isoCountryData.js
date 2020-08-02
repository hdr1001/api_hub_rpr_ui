import arrIsoCountries from "../../assets/json/isoCountry.json";

console.log("Read " + arrIsoCountries.length + " countries from file.");

//ISO country object prototype
const isoCountry = {
   toString: function() {
      return this.description;
   }
};

if(arrIsoCountries.length > 0) {
   //Provide a toString method to the objects in the country array
   arrIsoCountries.forEach(isoCtry => {
      Object.setPrototypeOf(isoCtry, isoCountry);
   });
}

function getCountryDesc(countryCode) {
   let objCountry = null;

   if(countryCode) {
      objCountry = arrIsoCountries.find(oCtry => oCtry.code === countryCode);
   }

   if(objCountry) {
      return objCountry.toString();
   }
   else {
      return "";
   }
}

export { arrIsoCountries, getCountryDesc };
