export type CategoryId = 'characters' | 'planets' | 'films' | 'species' | 'starships' | 'vehicles';
export type Resource = Record<string, string | number | string[]>;
export interface Entity {
  id: string;
  key: string;
  category: CategoryId;
  name: string;
  originalName: string;
  data: Resource;
}
export interface Category {
  id: CategoryId;
  resource: 'people' | Exclude<CategoryId, 'characters'>;
  name: string;
  singular: string;
  description: string;
  tagline: string;
  image: string;
  filter: string;
  filterLabel: string;
  fields: [string, string, string?][];
}
export type SortOrder = 'featured' | 'asc' | 'desc';
