import axios from "axios";
const serviceUrl = "https://swapi.co/api/";

const corsConfig = {
  headers: {
    "Content-Type": "application/json"
  }
};

export const fetchPlanets = () => {
    return axios.get(`${serviceUrl}planets/`, corsConfig);
};


export const fetchPeople = () => {
    return axios.get(`${serviceUrl}people/`, corsConfig);
};
  