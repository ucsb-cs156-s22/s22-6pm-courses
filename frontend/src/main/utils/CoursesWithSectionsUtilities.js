const location = (loc) => {
    let ans = "";
        for (let j = 0; j < loc.timeLocations.length; j++) {
            ans += `${loc.timeLocations[0].building} ${loc.timeLocations[0].room}`;
        }
    ans = ans.split(`,`);
    return ans.map((a)=><div>{a}</div>);
}
const time = (loc) => {
    let ans = "";

        for (let j = 0; j < loc.timeLocations.length; j++) {
            ans += `${loc.timeLocations[j].beginTime}--${loc.timeLocations[j].endTime}  ${loc.timeLocations[j].days}`;
        }
    ans = ans.split(`,`);
    return ans.map((a)=><div>{a}</div>);
}

const enroll = (loc) => {
    let ans = "";

        ans += `${loc.enrolledTotal}/${loc.maxEnroll}`;
    ans = ans.split(`,`);
    return ans.map((a)=><div>{a}</div>);
}

const instructor = (loc) => {
    let ans = "";

        for (let j = 0; j < Math.min(3, loc.instructors.length); j++) { // display 3 instructors at most, or else won't fit in a line
            ans += `${loc.instructors[j].instructor}`;
            if (j + 1 < Math.min(3, loc.instructors.length)) {
                ans += `, `
            } 
        }
        

    
    ans = ans.split(`!`);
    return ans.map((a)=><div>{a}</div>);
}

const section = (loc) => {
    let ans = "";

        let enrollNum = `${loc.enrollCode}`;
        let sectionNumber = `${loc.section}`;
        if(sectionNumber.substring(sectionNumber.length - 2) === '00'){
            sectionNumber = 'LECTURE'
        }
        else{
            sectionNumber = enrollNum
        }
        ans += sectionNumber;
    

    ans = ans.split(',');
    return ans.map((a)=><div>{a}</div>);
}

const title = (loc) => {
    let ans = "";

        let classTitle = `${loc.courseInfo.title}`;
        let sectionNumber = `${loc.section.section}`;
        if(sectionNumber.substring(sectionNumber.length - 2) === '00'){
          
        }
        else{
            classTitle = '';
        }
        ans += classTitle;
    

    ans = ans.split(',');
    return ans.map((a)=><div>{a}</div>);
}

const courseID = (loc) => {
    let ans = "";

        let courseId = `${loc.courseInfo.courseId}`;
        let sectionNumber = `${loc.section.section}`;
        if(sectionNumber.substring(sectionNumber.length - 2) === '00'){
        }
        else{
            courseId = '';
        }
        ans += courseId;
    

    ans = ans.split(',');
    return ans.map((a)=><div>{a}</div>);
}

export {
    location,
    time,
    enroll,
    instructor,
    section,
    title,
    courseID
};
