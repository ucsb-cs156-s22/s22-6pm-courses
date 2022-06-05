import {
    location,
    time,
    enroll,
    instructor
  } from "main/utils/CoursesWithSectionsUtilities";

import { sectionsFixtures } from "fixtures/sectionsFixtures";

describe("courseSections conversion tests", () => {
  
  test("location correctly converts", () => {
    let res = location(sectionsFixtures.sections[0].classSections);
    expect(res.length).toBe(4);
    expect(res[0].props.children).toBe("ELLSN 2617");
    expect(res[1].props.children).toBe("PHELP 1530");
    expect(res[2].props.children).toBe("PHELP 1530");
    expect(res[3].props.children).toBe("PHELP 1530");
  });

  test("time correctly converts", () => {
    let res = time(sectionsFixtures.sections[0].classSections);
    expect(res.length).toBe(4);
    expect(res[0].props.children).toBe("17:00--18:15   T R   ");
    expect(res[1].props.children).toBe("10:00--10:50    W    ");
    expect(res[2].props.children).toBe("11:00--11:50    W    ");
    expect(res[3].props.children).toBe("14:00--14:50    W    ");
  });

  test("enroll correctly converts", () => {
    let res = enroll(sectionsFixtures.sections[0].classSections);
    expect(res.length).toBe(4);
    expect(res[0].props.children).toBe("85/90");
    expect(res[1].props.children).toBe("27/30");
    expect(res[2].props.children).toBe("29/30");
    expect(res[3].props.children).toBe("29/30");
  });

  test("instructor correctly converts", () => {
    let res = instructor(sectionsFixtures.sections[0].classSections);
    expect(res.length).toBe(4);
    expect(res[0].props.children).toBe("SOLIS S W");
    expect(res[1].props.children).toBe("BATTULA N");
    expect(res[2].props.children).toBe("YANG X");
    expect(res[3].props.children).toBe("TANNA A A, NOBODY");
  });

});
