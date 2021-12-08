/* eslint-disable @typescript-eslint/no-empty-interface */
import 'styled-components';
import { ITheme } from '~/interfaces/ITheme';

import { TColors } from './TColors';

declare module 'styled-components' {
  type ThemeColors = TColors;

  export type ColorScheme = keyof ThemeColors;

  export interface DefaultTheme extends ITheme {}
}
