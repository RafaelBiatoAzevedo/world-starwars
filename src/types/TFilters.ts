export type TOrderBy =
  | 'name'
  | 'population'
  | 'rotation_period'
  | 'orbital_period'
  | 'climate'
  | 'gravity'
  | 'terrain'
  | 'diameter'
  | 'surface_water';

export type TFilters = {
  name: string;
  orderBy: TOrderBy;
  sequence: boolean;
};
