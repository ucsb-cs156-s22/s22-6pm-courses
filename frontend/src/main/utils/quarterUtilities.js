const quarters = [
    "WINTER",
    "SPRING",
    "SUMMER",
    "FALL"
];

const shortQuarters = [
    "W",
    "S",
    "M",
    "F"
];

const qtrNumToQuarter = {
    '1': 'WINTER',
    '2': 'SPRING',
    '3': 'SUMMER',
    '4': 'FALL'
};

export const location = (loc) => {
    let ans = "";
    for (let i = 0; i < loc.length; i++) {
        ans += `${loc[i].timeLocations[0].building} ${loc[i].timeLocations[0].room}`;
        if (i + 1 < loc.length) {
            ans += `,`;
        }
    }
    ans = ans.split(`,`);
    return ans.map((a)=><div>{a}</div>);
}

export const time = (loc) => {
    let ans = "";
    for (let i = 0; i < loc.length; i++) {
        ans += `${loc[i].timeLocations[0].beginTime}--${loc[i].timeLocations[0].endTime}  ${loc[i].timeLocations[0].days}`;
        if (i + 1 < loc.length) {
            ans += `,`
        }
    }
    ans = ans.split(`,`);
    return ans.map((a)=><div>{a}</div>);
}

export const enroll = (loc) => {
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

export const instructor = (loc) => {
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

const yyyyqToQyy = (yyyyq) => {
    return `${shortQuarters[parseInt(yyyyq.charAt(4)) - 1]}${yyyyq.substring(2, 4)}`;
}

const toFormat = (quarter, year) => {
    return year.toString() + (parseInt(quarter)).toString();
}

const fromFormat = (format) => {
    return `${quarters[parseInt(format.charAt(4)) - 1]} ${format.substring(0, 4)}`;
}


const fromNumericYYYYQ = (yyyyqInt) => {
    if (typeof (yyyyqInt) != 'number') {
        throw new Error("param should be a number");
    }
    const yyyyqStr = yyyyqInt.toString();
    if (yyyyqStr.length !== 5) {
        throw new Error("param should be five digits");
    }
    const qStr = yyyyqStr.substring(4, 5);
    if (!(qStr in qtrNumToQuarter)) {
        throw new Error("param should end in 1,2,3 or 4");
    }
    return yyyyqStr;
}

const toNumericYYYYQ = (yyyyqStr) => {
    if (typeof (yyyyqStr) !== 'string') {
        throw new Error("param should be a string");
    }
    if (yyyyqStr.length !== 5) {
        throw new Error("param should be five digits");
    }
    const qStr = yyyyqStr.substring(4, 5);
    if (!(qStr in qtrNumToQuarter)) {
        throw new Error("param should end in 1,2,3 or 4");
    }
    return parseInt(yyyyqStr);
}

const nextQuarter = (yyyyqInt) => {
    const _yyyyqStr = fromNumericYYYYQ(yyyyqInt); // just for type/format checking
    const qInt = yyyyqInt % 10;
    const yyyyInt = Math.floor(yyyyqInt / 10);
    if (qInt < 4) {
        return yyyyqInt + 1;
    }
    return (yyyyInt + 1) * 10 + 1;
}


const quarterRange = (beginYYYYQStr, endYYYYQStr) => {
    let quarterList = [];
    const beginYYYYQInt = toNumericYYYYQ(beginYYYYQStr);
    const endYYYYQInt = toNumericYYYYQ(endYYYYQStr);
    for (let yyyyqInt = beginYYYYQInt; yyyyqInt <= endYYYYQInt; yyyyqInt = nextQuarter(yyyyqInt)) {
        const yyyyqStr = fromNumericYYYYQ(yyyyqInt);
        quarterList.push({
            yyyyq : yyyyqStr,
            qyy: yyyyqToQyy(yyyyqStr)
        });
    }
    return quarterList;
}

export {
    fromFormat,
    toFormat,
    yyyyqToQyy,
    fromNumericYYYYQ,
    toNumericYYYYQ,
    nextQuarter,
    quarterRange,
    qtrNumToQuarter
};
