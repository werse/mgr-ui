import { ThemeProvider } from '@/components/ThemeProvider';
import { RootPage } from '@/pages/RootPage';

function App() {
  return (
    <ThemeProvider defaultTheme={'dark'}>
      <RootPage />
    </ThemeProvider>
  );
}

export default App;
