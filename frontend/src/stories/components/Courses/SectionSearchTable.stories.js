import React from 'react';

import CoursesWithSectionsTable from 'main/components/Courses/CoursesWithSectionsTable';
import {newsectionFixtures} from 'fixtures/newsectionFixtures';

export default {
    title: 'components/Courses/CoursesWithSectionsTable',
    component: CoursesWithSectionsTable
};

const Template = (args) => {
    return (
        <CoursesWithSectionsTable {...args} />
    )
};

export const Empty = Template.bind({});
Empty.args = {
    courses: []
};

export const oneSection = Template.bind({});
oneSection.args = {
    courses: newsectionFixtures.oneSection
};

export const manySections = Template.bind({});
manySections.args = {
    courses: newsectionFixtures.sections
};
