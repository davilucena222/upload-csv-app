import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { GlobalDataCsvProvider } from './context/global-data-csv';
import './styles/global.scss';

export function App() {
  return (
    <div>
      <GlobalDataCsvProvider>
        <Header />
        <Dashboard />
      </GlobalDataCsvProvider>
    </div>
  )
}