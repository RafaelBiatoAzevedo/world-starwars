const END_POINT = 'https://swapi-trybe.herokuapp.com/api/planets/';

export const requestPlanets = async () => {
  return await fetch(END_POINT).then((response) => response.json());
};

export const requestEndPoint = async (endPoint: string): Promise<any> => {
  return await fetch(endPoint).then((response) => response.json());
};
