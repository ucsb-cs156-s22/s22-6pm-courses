const location = (loc) => {
    let ans = "";
    for (let i = 0; i < loc.length; i++) {
        for (let j = 0; j < loc[i].timeLocations.length; j++) {
            ans += `${loc[i].timeLocations[0].building} ${loc[i].timeLocations[0].room}`;
        }
        if (i + 1 < loc.length) {
            ans += `,`;
        }
    }
    ans = ans.split(`,`);
    return ans.map((a)=><div>{a}</div>);
}
const time = (loc) => {
    let ans = "";
    for (let i = 0; i < loc.length; i++) {
        for (let j = 0; j < loc[i].timeLocations.length; j++) {
            ans += `${loc[i].timeLocations[j].beginTime}--${loc[i].timeLocations[j].endTime}  ${loc[i].timeLocations[j].days}`;
        }
        if (i + 1 < loc.length) {
            ans += `,`
        }
    }
    ans = ans.split(`,`);
    return ans.map((a)=><div>{a}</div>);
}

const enroll = (loc) => {
    let ans = "";
    for (let i = 0; i < loc.length; i++) {
        ans += `${loc[i].enrolledTotal}/${loc[i].maxEnroll}`;
        if (i + 1 < loc.length) {
            ans += `,`
        }
    }
    ans = ans.split(`,`);
    return ans.map((a)=><div>{a}</div>);
}

const instructor = (loc) => {
    let ans = "";
    for (let i = 0; i < loc.length; i++) {
        for (let j = 0; j < Math.min(3, loc[i].instructors.length); j++) { // display 3 instructors at most, or else won't fit in a line
            ans += `${loc[i].instructors[j].instructor}`;
            if (j + 1 < Math.min(3, loc[i].instructors.length)) {
                ans += `, `
            } 
        }
        if (i + 1 < loc.length) {
            ans += `!`
        } 

    }
    ans = ans.split(`!`);
    return ans.map((a)=><div>{a}</div>);
}

const section = (loc) => {
    let ans = "";
    for (let i = 0; i < loc.length; i++) {
        ans += `${loc[i].section}`;
        if (i + 1 < loc.length) {
            ans += `,`
        }
    }
    ans = ans.split(`,`);
    return ans.map((a)=><div>{a}</div>);
}

export {
    location,
    time,
    enroll,
    instructor,
    section
};
