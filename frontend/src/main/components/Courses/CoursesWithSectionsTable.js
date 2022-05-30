import React from "react";
import OurTable from "main/components/OurTable";
import { yyyyqToQyy, location } from "main/utils/quarterUtilities.js";

export default function CoursesWithSectionsTable({ courses }) {

    const columns = [
        {
            Header: 'Quarter',
            accessor: (row, _rowIndex) => yyyyqToQyy(row.quarter),
            id: 'quarter',
        },
        {
            Header: 'Course ID',
            accessor: 'courseId',
        },
        {
            Header: 'Location',
            accessor: (row) => location(row.timeLocations),
            id: 'location',
        },
        {
            Header: 'Total enrolled',
            accessor: 'classSections[0].enrolledTotal',
        },
        {
            Header: 'Max Students',
            accessor: 'maxEnroll',
        },
        {
            Header: 'Days',
            accessor: 'timeLocations[0].days',
        },
        {
            Header: 'Start Time',
            accessor: 'timeLocations[0].beginTime',
        },
        {
            Header: 'End Time',
            accessor: 'timeLocations[0].beginTime',
        },
        {
            Header: 'Instructor',
            accessor: 'instructors[0].instructor',
        }
        
    ];

    return <OurTable
        data={courses}
        columns={columns}
        testid={"CoursesWithSectionsTable"}
    />;
};