export default function personClasses(email, classes, rosters, person) {
    const classList = []
    if (!classes) {
        return classList;
    }
    for (var i = 0; i < classes.length; i++) {
        if (person === "student") {
            console.log("rosters", rosters);
            if (rosters) {
                const rosterObj = rosters.find(rost => rost.id === classes[i].id)
                // const roster = rosterObj.roster;
                // for (var s = 0; s < roster.length; s++) {
                //     if (roster[s].email === email) {
                //         classList.push(classes[i]);
                //     }
                // }
            }
        }
        else {
            if (classes[i].teacher.email === email) {
                classList.push(classes[i]);
            }
        }

    }
    return classList;
}