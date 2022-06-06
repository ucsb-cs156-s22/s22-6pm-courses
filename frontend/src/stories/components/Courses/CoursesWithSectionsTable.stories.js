import React from 'react';

import CoursesWithSectionsTable from 'main/components/Courses/CoursesWithSectionsTable';
import {sectionsFixtures} from 'fixtures/sectionsFixtures';

export default {
    title: 'components/Courses/CoursesWithSectionsTable',
    component: CoursesWithSectionsTable
};

const Template = (args) => {
    return (
        <CoursesWithSectionsTable {...args} />
    )
};

export const noCourse = Template.bind({});
noCourse.args = {
    courses: sectionsFixtures.sectionsForNoCourses
};

export const oneCourse = Template.bind({});
oneCourse.args = {
    courses: sectionsFixtures.sectionsForOneCourses
};

export const twoCourse = Template.bind({});
twoCourse.args = {
    courses: sectionsFixtures.sectionsForTwoCourses
};
