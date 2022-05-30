import React from "react";
import OurTable from "main/components/OurTable";

//import { yyyyqToQyy } from "main/utils/quarterUtilities.js";

export default function CoursesWithSectionsTable({ courses }) {

    const columns = [
        {
            Header: 'Course ID',
            accessor: 'courseId',

        },
        {
            Header: 'Course ID',
            accessor: 'courseId',
        }
        
    ];

    return <OurTable
        data={courses}
        columns={columns}
        testid={"CoursesWithSectionsTable"}
    />;
};