export default function personClasses(email, classes, person) {
    const classList = []
    if (!classes) {
        return classList;
    }
    for (var i = 0; i < classes.length; i++) {
        if (person === "student") {
            if (classes[i].roster) {
                const roster = classes[i].roster;
                for (var s = 0; s < roster.length; s++) {
                    if (roster[s].email === email) {
                        classList.push(classes[i]);
                    }
                }
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