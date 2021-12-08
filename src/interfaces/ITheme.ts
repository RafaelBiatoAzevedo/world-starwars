import { TResolutions } from '~/types/TResolutions';
import { TFontWeight } from '~/types/TFontWeight';
import { TColors } from '~/types/TColors';

export interface ITheme {
  colors: TColors;
  resolutions: TResolutions;
  fontWeight: TFontWeight;
}
