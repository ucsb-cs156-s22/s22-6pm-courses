import React from 'react';

import SectionsCartTable from 'main/components/Courses/SectionsCartTable';
import {newsectionFixtures} from 'fixtures/newsectionFixtures';

export default {
    title: 'components/Courses/SectionsCartTable',
    component: SectionsCartTable
};

const Template = (args) => {
    return (
        <SectionsCartTable {...args} />
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
