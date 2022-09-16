export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const SET_USER_DATA ='SET_USER_DATA';
export const SET_FAV_MOVIES = 'SET_FAV_MOVIES';

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

export function setUser(user) {
  return {
    type: SET_FILTER,
    user,
  };
}

export function setUserData(userData) {
  return {
    type: SET_FILTER,
    userData,
  };
}


