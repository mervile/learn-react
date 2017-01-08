import TodoList from '../../src/components/TodoList';
import { shallow } from 'enzyme';
import * as React from 'react';

const expect = chai.expect;

function setup() {
    const props = {
        onDelete: () => {},
        requestStatus: { isLoading: false, type: '' },
        todos: [{ description: 'Run tests', id: 0, status: 0, userId: '?' }],
    };

    const enzymeWrapper = shallow(<TodoList {...props} />);

    return {
        props,
        enzymeWrapper,
    };
}

describe('TodoList', () => {
    it('should render self and subcomponents', () => {
        const { enzymeWrapper } = setup();

        expect(enzymeWrapper.find('ListItem')).to.have.length(1);
    });
});
