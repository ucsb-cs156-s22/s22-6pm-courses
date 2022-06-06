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

export const Empty = Template.bind({});
Empty.args = {
    courses: []
};

export const oneSection = Template.bind({});
oneSection.args = {
    courses: sectionsFixtures.oneSection
};

export const manySections = Template.bind({});
manySections.args = {
    courses: sectionsFixtures.sections
};
