
import { Layout } from './components/Layout';
import { Header } from './components/ui/Header';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      
      <Layout>
        <Dashboard />
      </Layout>
    </div>
  );
}

export default App;