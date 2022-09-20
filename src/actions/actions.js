export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const DELETE_FAVORITE = 'DELETE_FAVORITE';
export const SET_ALL_USERS = 'SET_ALL_USERS';

export function setMovies(value) {
  return {
    type: SET_MOVIES,
    value,
  };
}

export function setFilter(value) {
  return {
    type: SET_FILTER,
    value,
  };
}

export function setUser(value) {
  return {
    type: SET_USER,
    value,
  };
}

export function updateUser(value) {
  return {
    type: UPDATE_USER,
    value,
  };
}

export function deleteUser(value) {
  return {
    type: DELETE_USER,
    value,
  };
}

export function addFavorite(value) {
  return {
    type: ADD_FAVORITE,
    value,
  };
}

export function deleteFavorite(value) {
  return {
    type: DELETE_FAVORITE,
    value,
  };
}

export function setAllUsers(value) {
  return {
    type: SET_ALL_USERS,
    value,
  };
}
