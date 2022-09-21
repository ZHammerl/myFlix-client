import axios from 'axios';
import React from 'react';

export class MovieService {
  constructor(token) {
    this.token = token;
    this.baseUrl =
      'https://my-movie-db22.herokuapp.com/movies';
    this.header = {
      headers: { Authorization: `Bearer ${this.token}` },
    };
  }

  getAllMovies(payload, successCallback, errorCallback) {
    const url = `${this.baseUrl}`;
    axios
      .get(url, this.header)
      .then(successCallback)
      .catch(errorCallback);
  }
}
