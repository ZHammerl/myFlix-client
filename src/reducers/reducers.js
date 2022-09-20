import { combineReducers } from 'redux';

import {
  SET_FILTER,
  SET_MOVIES,
  SET_USER,
  SET_ALL_USERS,
  UPDATE_USER,
  DELETE_USER,
  ADD_FAVORITE,
  DELETE_FAVORITE,
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

function allUsers(state = [], action) {
  switch (action.type) {
    case SET_ALL_USERS:
      return action.value;
    default:
      return state;
  }
}

function user(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    case UPDATE_USER:
      return action.value;
    case DELETE_USER:
      console.log(
        'reducers.js user payload: ',
        action.value
      );
      return action.value;
    case ADD_FAVORITE:
      return {
        ...state,
        FavoriteMovies: [
          ...state?.FavoriteMovies,
          action.value,
        ],
      };
    case DELETE_FAVORITE:
      return {
        ...state,
        FavoriteMovies: [
          ...state?.FavoriteMovies.filter(
            (movieId) => movieId !== action.value
          ),
        ],
      };
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
  allUsers,
});

export default moviesApp;
