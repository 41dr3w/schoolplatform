const routinename = {
    0: "createitem",
    1: "searchitem",
    2: "seeitem",
    3: "createsession",
    4: "seesession",
    5: "seecookie",
    6: "deletesession",
    7: "seesession",
    8: "deletecookie",
    9: "seecookie",
    10:"deleteitem"
};

function Routine(name,status,data) {
    this.name = name,
    this.status = status,
    this.data = data
}



module.exports = {routinename,Routine}

