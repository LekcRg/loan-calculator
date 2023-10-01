import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      accent: string,
      accent2: string,
      accent3: string,
      accent4: string,
      accent5: string,
      accent6: string,
      dark1: string,
      dark2: string,
      dark3: string,
      dark4: string,
      light1: string,
      light3: string,
      red1: string,
      red2: string,
      red3: string,
    },
    fontFamily: string,
  }
}