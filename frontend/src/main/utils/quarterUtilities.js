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

export const location = (_loc) => {
    let ans = "";
    for (let i = 0; i < loc.length; i++) {
        for (let j = 0; j < loc[i].timeLocations.length; i++) {
            ans += `${loc[i].timeLocations[j].building} ${loc[i].timeLocations[j].room}`;
            if (i + 1 < loc[i].timeLocations.length) {
                ans += `, `
            } 
        }

    }
    return ans;
}

export const days = (day) => {
    let ans = "";
    for (let i = 0; i < day.length; i++) {
        ans += `${day[i].days}`;
        if (i + 1 < day.length) {
            ans += `, `
        } 
    }
    return ans;
}

export const start = (start) => {
    let ans = "";
    for (let i = 0; i < start.length; i++) {
        ans += `${start[i].beginTime}`;
        if (i + 1 < start.length) {
            ans += `, `
        } 
    }
    return ans;
}

export const end = (end) => {
    let ans = "";
    for (let i = 0; i < end.length; i++) {
        ans += `${end[i].endTime}`;
        if (i + 1 < end.length) {
            ans += `, `
        } 
    }
    return ans;
}

export const instructor = (instructor) => {
    let ans = "";
    for (let i = 0; i < instructor.length; i++) {
        ans += `${instructor[i].instructor}`;
        if (i + 1 < instructor.length) {
            ans += `, `
        } 
    }
    return ans;
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
