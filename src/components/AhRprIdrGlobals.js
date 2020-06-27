//API Hub Request, Persist & Respond UI
//Project globals for D&B D+ IDentity Resolution

//Application status
const appStatus = {
   criteriaSpec: 0,
   wait: 1,
   selectMC: 2,
   error: 3
};

const reqMaxQtyMCs = 10;
const maxMCsPerPage = 5;

export {
   appStatus,    //Application status & current status
   reqMaxQtyMCs, //The maximum number of match candidates returned by the D+ API
   maxMCsPerPage //The maximum number of match candidates displayed per page
}
