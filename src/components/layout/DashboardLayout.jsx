import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const DashboardLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex transition-colors duration-300">
            <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

            <main className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header */}
                <header className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-dark-bg border-b border-light-border dark:border-dark-border sticky top-0 z-30">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-gray-500">
                        {isSidebarOpen ? <X /> : <Menu />}
                    </button>
                    <span className="text-xl font-bold dark:text-white italic text-primary">aps</span>
                    <button onClick={toggleTheme} className="p-2 text-gray-500">
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                </header>

                {/* Global Action Bar (Desktop toggle for theme) */}
                <div className="hidden md:flex justify-end p-4 absolute top-0 right-0 z-10">
                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-xl bg-white dark:bg-dark-surface shadow-sm border border-light-border dark:border-dark-border text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                    >
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                </div>

                <div className="p-4 md:p-8 lg:p-10">
                    {children}
                </div>
            </main>
        </div>
    );
};
