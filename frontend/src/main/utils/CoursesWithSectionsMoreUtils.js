import { toast } from "react-toastify";
// import { location, enroll, time, instructor, section } from "main/utils/CoursesWithSectionsUtilities";

export function onAddSuccess(message) {
    console.log(message);
    toast(message);
}

export function cellToAxiosParamsAdd(cell) {
    return {
        url: "/api/sectionscart/post",
        method: "POST",
        params: {
            courseId: cell.row.values.courseId,
            title: cell.row.values.title,
            section: cell.row.values.section,
            location: cell.row.values.location,
            enrollment: cell.row.values.enrollment,
            time: cell.row.values.time,
            instructor: cell.row.values.instructor
        }
    }
}
