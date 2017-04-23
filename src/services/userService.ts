import * as _ from 'lodash';
import 'whatwg-fetch';

import { API_URL } from '../config';
import { IUser } from '../models';
import { handleErrors } from '../utils/handleErrors';
import { getAuth } from '../utils/token';

function getUsers() {
    const auth = getAuth();
    return fetch(`${API_URL}/users`, {
        headers: {
            Authorization: auth,
        },
        method: 'GET',
    })
    .then(handleErrors)
    .then((response: any) => {
        return response.json();
    });
}

const selectedUsers: IUser[] = [];
function updateSelectedUsers(user: IUser, isSelected: boolean) {
    const indx = _.findIndex(selectedUsers, user);
    if (isSelected && indx === -1) {
        selectedUsers.push(user);
    } else if (!isSelected && indx > -1) {
        _.remove(selectedUsers, user);
    }
}

function getSelectedUsers() {
    return selectedUsers;
}

export {
    getSelectedUsers,
    getUsers,
    updateSelectedUsers,
};
