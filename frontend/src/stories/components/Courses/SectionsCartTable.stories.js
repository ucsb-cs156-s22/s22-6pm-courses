import React from 'react';

import SectionsCartTable from 'main/components/Courses/SectionsCartTable';
import { sectionsCartFixtures } from 'fixtures/sectionsCartFixtures';

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
    aSection: []
};

export const oneSection = Template.bind({});
oneSection.args = {
    aSection: sectionsCartFixtures.oneSection
};

export const threeSections = Template.bind({});
threeSections.args = {
    aSection: sectionsCartFixtures.threeSections
};
