import {
    location,
    time,
    enroll,
    instructor,
    section
  } from "main/utils/CoursesWithSectionsUtilities";

import { newsectionFixtures } from "fixtures/newsectionFixtures";

describe("courseSections conversion tests", () => {

  test("location correctly converts", () => {
    let res = location(newsectionFixtures.oneSection[0].section);
    expect(res.length).toBe(1);
    expect(res[0].props.children).toBe("ELLSN 2617");
  });

  test("time correctly converts", () => {
    let res = time(newsectionFixtures.oneSection[0].section);
    expect(res.length).toBe(1);
    expect(res[0].props.children).toBe("17:00--18:15   T R   ");
  });

  test("enroll correctly converts", () => {
    let res = enroll(newsectionFixtures.oneSection[0].section);
    expect(res.length).toBe(1);
    expect(res[0].props.children).toBe("85/90");
  });

  test("instructor correctly converts", () => {
    let res = instructor(newsectionFixtures.oneSection[0].section);
    expect(res.length).toBe(1);
    expect(res[0].props.children).toBe("SOLIS S W, NOBODY, ANYBODY");
  });

  test("section correctly converts", () => {
    let res = section(newsectionFixtures.oneSection[0].section);
    expect(res.length).toBe(1);
    expect(res[0].props.children).toBe("LECTURE");
    let res2 = section(newsectionFixtures.oneSection[1].section);
    console.log(newsectionFixtures.oneSection[1].section.enrollCode);
    expect(res2.length).toBe(1);
    expect(res2[0].props.children).toBe("SECTION");
  });

});
