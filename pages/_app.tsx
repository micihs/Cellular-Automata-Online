import { createTheme, NextUIProvider } from '@nextui-org/react';
import type { AppProps } from 'next/app';

import { SimulationProvider } from '../context/Simulation';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const theme = createTheme({
    type: 'light',
    theme: { colors: { primary: 'blue', selection: '#23CFC9' } },
  });

  return (
    <NextUIProvider theme={theme}>
      <SimulationProvider>
        <Component {...pageProps} />
      </SimulationProvider>
    </NextUIProvider>
  );
};

export default MyApp;
