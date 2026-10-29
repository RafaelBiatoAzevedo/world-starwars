import {
  Clapperboard,
  Dna,
  Globe2,
  Orbit,
  Rocket,
  ScanFace,
  Truck,
  type LucideProps,
} from 'lucide-react';
import type { CategoryId } from '../data/types';

const icons = {
  characters: ScanFace,
  planets: Globe2,
  films: Clapperboard,
  species: Dna,
  starships: Rocket,
  vehicles: Truck,
};
export function CategoryIcon({ category, ...props }: LucideProps & { category?: CategoryId }) {
  const Icon = category ? icons[category] : Orbit;
  return <Icon aria-hidden="true" strokeWidth={1.5} {...props} />;
}
