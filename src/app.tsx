import { CssVarsProvider, extendTheme } from '@mui/joy';
import { defineApp } from 'umi';

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {}
    },
    dark: {
      palette: {}
    }
  }
});

if (module.hot) {
  module.hot.accept();
}

export default defineApp({
  rootContainer: container => (
    <CssVarsProvider defaultMode="system" theme={theme}>
      {container}
    </CssVarsProvider>
  )
});
