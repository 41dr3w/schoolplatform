const routinename = {
    0: "createitem",
    1: "searchitem",
    2: "seeitem",
    3: "deleteitem",
    4: "createsession",
    5: "seesession",
    6: "seecookie",
    7: "deletesession",
    8: "seesession",
    9: "deletecookie",
    10: "seecookie",
    11:"deleteitem"
};

function Routine(name,checked,info,statuscode) {
    this.name = name,
    this.checked = checked,
    this.info = info,
    this.statuscode = statuscode
}


module.exports = {routinename,Routine}

