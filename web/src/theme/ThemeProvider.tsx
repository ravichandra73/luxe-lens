import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material'

import theme from './index'

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

export default ThemeProvider
