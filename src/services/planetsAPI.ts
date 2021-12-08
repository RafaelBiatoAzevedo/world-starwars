const END_POINT_PLANETS = 'https://swapi.dev/api/planets/';
const END_POINT_FILMS = 'https://swapi.dev/api/films/';
const END_POINT_PEOPLE = 'https://swapi.dev/api/people/';
const END_POINT_VEHICLES = 'https://swapi.dev/api/vehicles/';
const END_POINT_SPECIES = 'https://swapi.dev/api/species/';
const END_POINT_STARSHIPS = 'https://swapi.dev/api/starships/';

export const requestPlanets = async (): Promise<any> => {
  const result = await fetch(END_POINT_PLANETS).then((response) =>
    response.json()
  );
  return result;
};

export const requestPlanet = async (value: number): Promise<any> => {
  const result = await fetch(`${END_POINT_PLANETS}${value}`).then((response) =>
    response.json()
  );
  return result;
};

export const requestFilms = async (): Promise<any> => {
  const result = await fetch(END_POINT_FILMS).then((response) =>
    response.json()
  );
  return result;
};

export const requestFilm = async (value: number): Promise<any> => {
  const result = await fetch(`${END_POINT_FILMS}${value}`).then((response) =>
    response.json()
  );
  return result;
};

export const requestPeople = async (): Promise<any> => {
  const result = await fetch(END_POINT_PEOPLE).then((response) =>
    response.json()
  );
  return result;
};

export const requestCharacter = async (value: number): Promise<any> => {
  const result = await fetch(`${END_POINT_PEOPLE}${value}`).then((response) =>
    response.json()
  );
  return result;
};

export const requestVehicles = async (): Promise<any> => {
  const result = await fetch(END_POINT_VEHICLES).then((response) =>
    response.json()
  );
  return result;
};

export const requestVehicle = async (value: number): Promise<any> => {
  const result = await fetch(`${END_POINT_VEHICLES}${value}`).then((response) =>
    response.json()
  );
  return result;
};

export const requestSpecies = async (): Promise<any> => {
  const result = await fetch(END_POINT_SPECIES).then((response) =>
    response.json()
  );
  return result;
};

export const requestSpecie = async (value: number): Promise<any> => {
  const result = await fetch(`${END_POINT_SPECIES}${value}`).then((response) =>
    response.json()
  );
  return result;
};

export const requestStarships = async (): Promise<any> => {
  const result = await fetch(END_POINT_STARSHIPS).then((response) =>
    response.json()
  );
  return result;
};

export const requestStarship = async (value: number): Promise<any> => {
  const result = await fetch(`${END_POINT_STARSHIPS}${value}`).then(
    (response) => response.json()
  );
  return result;
};

export const requestEndPoint = async (endPoint: string): Promise<any> => {
  const result = await fetch(endPoint).then((response) => response.json());
  return result;
};
