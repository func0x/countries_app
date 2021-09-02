import { ChakraProvider } from '@chakra-ui/react';
import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import ErrorFallback from './components/ErrorFallback';
import LanguageForm from './components/LanguageForm';
import CountryHolidaysPage from './pages/CountryHolidaysPage';
import CountryListPage from './pages/CountryListPage';

const queryClient = new QueryClient()

function App() {
  const [ language, setLanguage] = useState<string>('')

  const handleLanguage = (langValue: string) => {
    setLanguage(langValue);
  }

  return (
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
        <Router>
            <div>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <LanguageForm onSelectLanguage={handleLanguage}/>
              </ErrorBoundary>
              <Switch>
                <Route path="/holidays">
                  <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <CountryHolidaysPage langFromForm={language}/>
                  </ErrorBoundary>
                </Route>
                <Route path="/">
                  <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <CountryListPage langFromForm={language}/>
                  </ErrorBoundary>
                </Route>
              </Switch>
            </div>
          </Router>
        </ChakraProvider>
      </QueryClientProvider>
  );
}

export default App;
