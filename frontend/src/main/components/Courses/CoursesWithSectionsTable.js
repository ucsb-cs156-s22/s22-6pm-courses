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
            Header: 'Section code',
            accessor: data => {
                let temp = "sss";
                let output = [];
                _.map(data.classSections, section => {
                    output.push(section.enrollCode);
                });
                return temp;
                //return output.join(', ');
            },
        },
        
    ];

    return <OurTable
        data={courses}
        columns={columns}
        testid={"CoursesWithSectionsTable"}
    />;
};