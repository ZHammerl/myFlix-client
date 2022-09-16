import { combineReducers } from 'redux';

import {
  SET_FILTER,
  SET_MOVIES,
  SET_FAV_MOVIES,
  SET_USER_DATA,
  SET_USER,
} from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function user(state = '', action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
}
function userData(state = {}, action) {
  switch (action.type) {
    case SET_USER_DATA:
      return action.userData;
    default:
      return state;
  }
}

function favoriteMovies(state = [], action) {
  switch (action.type) {
    case SET_FAV_MOVIES:
      return action.value;
    default:
      return state;
  }
}

// function moviesApp(state = {}, action) {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     movies: movies(state.movies, action),
//   };
// }

// same as above function moviesApp
const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user,
  favoriteMovies,
  userData,
});

export default moviesApp;
