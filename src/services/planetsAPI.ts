const END_POINT_PLANETS = 'https://swapi.dev/api/planets/';
const END_POINT_FILMS = 'https://swapi.dev/api/films/';
const END_POINT_PEOPLE = 'https://swapi.dev/api/people/';
const END_POINT_VEHICLES = 'https://swapi.dev/api/vehicles/';
const END_POINT_SPECIES = 'https://swapi.dev/api/vehicles/';
const END_POINT_STARSHIPS = 'https://swapi.dev/api/vehicles/';

export const requestPlanets = async () => {
  return await fetch(END_POINT_PLANETS).then((response) => response.json());
};

export const requestPlanet = async (value: number): Promise<any> => {
  return await fetch(`${END_POINT_PLANETS}${value}`).then((response) =>
    response.json()
  );
};

export const requestFilms = async (): Promise<any> => {
  return await fetch(END_POINT_FILMS).then((response) => response.json());
};

export const requestFilm = async (value: number): Promise<any> => {
  return await fetch(`${END_POINT_FILMS}${value}`).then((response) =>
    response.json()
  );
};

export const requestPeople = async (): Promise<any> => {
  return await fetch(END_POINT_PEOPLE).then((response) => response.json());
};

export const requestCharacter = async (value: number): Promise<any> => {
  return await fetch(`${END_POINT_PEOPLE}${value}`).then((response) =>
    response.json()
  );
};

export const requestVehicles = async (): Promise<any> => {
  return await fetch(END_POINT_VEHICLES).then((response) => response.json());
};

export const requestVehicle = async (value: number): Promise<any> => {
  return await fetch(`${END_POINT_VEHICLES}${value}`).then((response) =>
    response.json()
  );
};

export const requestSpecies = async (): Promise<any> => {
  return await fetch(END_POINT_SPECIES).then((response) => response.json());
};

export const requestSpecie = async (value: number): Promise<any> => {
  return await fetch(`${END_POINT_SPECIES}${value}`).then((response) =>
    response.json()
  );
};

export const requestStarships = async (): Promise<any> => {
  return await fetch(END_POINT_STARSHIPS).then((response) => response.json());
};

export const requestStarship = async (value: number): Promise<any> => {
  return await fetch(`${END_POINT_STARSHIPS}${value}`).then((response) =>
    response.json()
  );
};

export const requestEndPoint = async (endPoint: string): Promise<any> => {
  return await fetch(endPoint).then((response) => response.json());
};
