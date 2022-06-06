import React from "react";
import OurTable from "main/components/OurTable";
import { location, enroll, time, instructor, section } from "main/utils/CoursesWithSectionsUtilities";

export default function CoursesWithSectionsTable({ courses }) {

    const columns = [
        {
            Header: 'Course ID',
            accessor: 'courseId',
        },
        {
            Header: 'Section',
            accessor: (row) => section(row.classSections),
            id: 'section',
        },
        {
            Header: 'Location',
            accessor: (row) => location(row.classSections),
            id: 'location',
        },
        {
            Header: 'Enrollment',
            accessor: (row) => enroll(row.classSections),
            id: 'enrollment',
        },
        {
            Header: 'Time',
            accessor: (row) => time(row.classSections),
            id: 'time',
        },
        {
            Header: 'Instructor',
            accessor: (row) => instructor(row.classSections),
            id: 'instructor',
        }
    ];

    return <OurTable
        data={courses}
        columns={columns}
        testid={"CoursesWithSectionsTable"}
    />;
}; 

