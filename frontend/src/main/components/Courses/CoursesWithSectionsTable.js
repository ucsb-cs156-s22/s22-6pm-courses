import React, {_Component} from "react";
import { useBackendMutation } from "main/utils/useBackend";
import OurTable, { ButtonColumn } from "main/components/OurTable";
import { courseID, title, location, enroll, time, instructor, section } from "main/utils/CoursesWithSectionsUtilities";
import { cellToAxiosParamsAdd, onSomeSuccess } from "main/utils/CoursesWithSectionsMoreUtils";
import { hasRole } from "main/utils/currentUser";

export default function CoursesWithSectionsTable({ courses, currentUser }) {

    // Stryker disable all : hard to test for query caching
    const addMutation = useBackendMutation(
        cellToAxiosParamsAdd,
        { onSuccess: onSomeSuccess },
        ["/api/sectionscart/all"]
    );
    // Stryker enable all 

    // Stryker disable next-line all : TODO try to make a good test for this
    const addCallback = async (cell) => { addMutation.mutate(cell); }

    const columns = [
        {
            Header: 'Course ID',
            accessor: (row) => courseID(row),
            id: 'courseId',
        },
        {
            Header: 'Title',
            accessor: (row) => title(row),
            id: 'title',
        },
        {
            Header: 'Enroll Code',
            accessor: (row) => section(row.section),
            id: 'section',
        },
        {
            Header: 'Location',
            accessor: (row) => location(row.section),
            id: 'location',
        },
        {
            Header: 'Enrollment',
            accessor: (row) => enroll(row.section),
            id: 'enrollment',
        },
        {
            Header: 'Time and Date',
            accessor: (row) => time(row.section),
            id: 'time',
        },
        {
            Header: 'Instructor',
            accessor: (row) => instructor(row.section),
            id: 'instructor',
        }

    ];

    const testid = "CoursesWithSectionsTable";

    const columnsIfAdmin = [
        ...columns,
        ButtonColumn("Add to cart", "primary", addCallback, testid)
    ];

    const columnsToDisplay = hasRole(currentUser, "ROLE_ADMIN") ? columnsIfAdmin : columns;

    return <OurTable
        data={courses}
        columns={columnsToDisplay}
        testid={"CoursesWithSectionsTable"}
    />;
}; 