import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'sonner';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ScanDetail from './pages/ScanDetail';
import { DashboardLayout } from './components/layout/DashboardLayout';

const Placeholder = ({ title }) => (
    <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h2 className="text-2xl font-bold dark:text-white mb-2">{title}</h2>
            <p className="text-gray-500">This section is currently under development.</p>
        </div>
    </DashboardLayout>
);

function App() {
    return (
        <ThemeProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/projects" element={<Placeholder title="Projects" />} />
                    <Route path="/scans" element={<Placeholder title="Scans" />} />
                    <Route path="/schedule" element={<Placeholder title="Schedule" />} />
                    <Route path="/notifications" element={<Placeholder title="Notifications" />} />
                    <Route path="/settings" element={<Placeholder title="Settings" />} />
                    <Route path="/support" element={<Placeholder title="Support" />} />
                    <Route path="/scan/:id" element={<ScanDetail />} />
                    <Route path="/" element={<Navigate to="/login" replace />} />
                </Routes>
            </Router>
            <Toaster richColors position="top-right" />
        </ThemeProvider>
    );
}

export default App;
