import { shallow } from 'enzyme';
import { ConnectDropTarget } from 'react-dnd';
import * as React from 'react';

import { DropTargetList, TodoListComponent } from '../../src/app/todos/todo-list/TodoList';
import { ITodo, Status } from '../../src/models';

const expect = chai.expect;

function setup() {
    const todo: ITodo = { description: 'test', id: 0, status: Status.New, userId: '23' };
    const props = {
        onDelete: () => {},
        onInit: () => { return [todo]; },
        onUpdate: (t: ITodo) => {},
        request: { error: null, isLoading: false, message: '', type: '' },
        status: 0,
        title: '',
        todos: [{ description: 'Run tests', id: 0, status: 0, userId: '?' }],
    };

    // Obtain the reference to the component before React DnD wrapping
    const OriginalTodoList = DropTargetList.DecoratedComponent;

    // Stub the React DnD connector functions with an identity function
    const identity = (el: any) => el;

    const enzymeWrapper = shallow(<OriginalTodoList connectDropTarget={identity} {...props} />);

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
