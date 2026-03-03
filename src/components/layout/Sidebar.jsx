import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    FolderKanban,
    Search,
    Calendar,
    Bell,
    Settings,
    LifeBuoy,
    ChevronRight,
    Shield,
} from 'lucide-react';
import { cn } from '../ui';

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: FolderKanban, label: 'Projects', path: '/projects' },
    { icon: Search, label: 'Scans', path: '/scans' },
    { icon: Calendar, label: 'Schedule', path: '/schedule' },
];

const secondaryNav = [
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: LifeBuoy, label: 'Support', path: '/support' },
];

export const Sidebar = ({ isOpen, onToggle }) => {
    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={onToggle}
                />
            )}

            {/* Sidebar Container */}
            <aside className={cn(
                "fixed md:sticky top-0 left-0 h-screen z-50 transition-all duration-300 ease-in-out border-r border-light-border dark:border-dark-border bg-white dark:bg-dark-bg flex flex-col pt-6",
                isOpen ? "w-64" : "w-20",
                !isOpen && "md:w-20 items-center",
                isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            )}>
                {/* Logo Section */}
                <div className={cn("flex items-center gap-3 px-6 mb-10", !isOpen && "px-0 justify-center")}>
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="text-white w-5 h-5" />
                    </div>
                    {isOpen && <span className="text-xl font-bold dark:text-white">aps</span>}
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.label}
                            to={item.path}
                            className={({ isActive }) => cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-surface hover:text-gray-900 dark:hover:text-white",
                                !isOpen && "justify-center px-0"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5 flex-shrink-0", !isOpen && "mx-auto")} />
                            {isOpen && <span className="font-medium">{item.label}</span>}
                        </NavLink>
                    ))}

                    <div className="pt-8 pb-4">
                        <div className={cn("h-px bg-light-border dark:bg-dark-border mx-3", !isOpen && "mx-0")} />
                    </div>

                    {secondaryNav.map((item) => (
                        <NavLink
                            key={item.label}
                            to={item.path}
                            className={({ isActive }) => cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-surface hover:text-gray-900 dark:hover:text-white",
                                !isOpen && "justify-center px-0"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5 flex-shrink-0", !isOpen && "mx-auto")} />
                            {isOpen && <span className="font-medium">{item.label}</span>}
                        </NavLink>
                    ))}
                </nav>

                {/* User Profile */}
                <div className={cn(
                    "p-4 border-t border-light-border dark:border-dark-border mt-auto",
                    !isOpen && "items-center flex flex-col"
                )}>
                    <div className={cn("flex items-center gap-3", !isOpen && "justify-center")}>
                        <div className="w-10 h-10 rounded-full bg-yellow-400 overflow-hidden border-2 border-white dark:border-dark-surface shadow-sm flex-shrink-0">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nammagiri" alt="User" />
                        </div>
                        {isOpen && (
                            <div className="flex-1 overflow-hidden">
                                <p className="text-sm font-semibold truncate dark:text-white">admin@edu.com</p>
                                <p className="text-xs text-gray-500 truncate">Security Lead</p>
                            </div>
                        )}
                        {isOpen && <ChevronRight className="w-4 h-4 text-gray-400" />}
                    </div>
                </div>
            </aside>
        </>
    );
};
