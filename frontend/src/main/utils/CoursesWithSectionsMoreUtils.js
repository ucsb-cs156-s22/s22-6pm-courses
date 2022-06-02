import { toast } from "react-toastify";
export function onAddSuccess(message) {
    console.log(message);
    toast(message);
}

export function cellToAxiosParamsAdd(cell) {
    return {
        url: "/api/sectionscart/post",
        method: "POST",
        params: {
            courseId: cell.row.values.courseId[0].props.children,
            title: cell.row.values.title[0].props.children,
            section: cell.row.values.section[0].props.children,
            location: cell.row.values.location[0].props.children,
            enrollment: cell.row.values.enrollment[0].props.children,
            time: cell.row.values.time[0].props.children,
            instructor: cell.row.values.instructor[0].props.children
        }
    }
}
