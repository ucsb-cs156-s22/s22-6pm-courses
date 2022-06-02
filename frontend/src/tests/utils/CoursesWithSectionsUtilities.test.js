import {
    location,
    time,
    enroll,
    instructor,
    title,
    courseID,
    section
  } from "main/utils/CoursesWithSectionsUtilities";

import { newsectionFixtures } from "fixtures/newsectionFixtures";

describe("courseSections conversion tests", () => {

  test("location correctly converts", () => {
    let res = location(newsectionFixtures.sections[0].section);
    expect(res.length).toBe(1);
    expect(res[0].props.children).toBe("ELLSN 2617");
  });

  test("time correctly converts", () => {
    let res = time(newsectionFixtures.sections[0].section);
    expect(res.length).toBe(1);
    expect(res[0].props.children).toBe("17:00--18:15   T R   ");
  });

  test("enroll correctly converts", () => {
    let res = enroll(newsectionFixtures.sections[0].section);
    expect(res.length).toBe(1);
    expect(res[0].props.children).toBe("85/90");
  });

  test("instructor correctly converts", () => {
    let res = instructor(newsectionFixtures.sections[0].section);
    expect(res.length).toBe(1);
    expect(res[0].props.children).toBe("SOLIS S W");
  });

  test("section correctly converts", () => {
    let res = section(newsectionFixtures.sections[0].section);
    expect(res.length).toBe(1);
    expect(res[0].props.children).toBe("LECTURE");
  });

  test("Title correctly converts", () => {
    let res = title(newsectionFixtures.sections[0]);
    expect(res.length).toBe(1);
    expect(res[0].props.children).toBe("INTRO DATA SCI 1");
  });

  test("CourseId correctly converts", () => {
    let res = courseID(newsectionFixtures.sections[0]);
    expect(res.length).toBe(1);
    expect(res[0].props.children).toBe("CMPSC     5A ");
  });
  test("instructor correctly converts", () => {
    let res = instructor(newsectionFixtures.sections[1].section);
    expect(res.length).toBe(1);
    expect(res[0].props.children).toBe("SOLIS S W, NOBODY, ANYBODY");
  });

  test("section correctly converts", () => {
    let res = section(newsectionFixtures.sections[1].section);
    expect(res.length).toBe(1);
    expect(res[0].props.children).toBe("59618");
  });

  test("Title correctly converts", () => {
    let res = title(newsectionFixtures.sections[1]);
    expect(res.length).toBe(1);
    expect(res[0].props.children).toBe("");
  });

  test("CourseId correctly converts", () => {
    let res = courseID(newsectionFixtures.sections[1]);
    expect(res.length).toBe(1);
    expect(res[0].props.children).toBe("");
  });

});
