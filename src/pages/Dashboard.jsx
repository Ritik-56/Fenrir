import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    Filter,
    Columns,
    Plus,
    MoreVertical,
    TrendingUp,
    TrendingDown,
    AlertCircle,
    AlertTriangle,
    Info,
    RefreshCw
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Button, Input, Badge, Card, cn } from '../components/ui';
import { mockScans, stats } from '../data/mockData';
import { toast } from 'sonner';

const Dashboard = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredScans = mockScans.filter(scan =>
        scan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scan.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleNewScan = () => {
        toast.success('New scan configuration opened');
    };

    return (
        <DashboardLayout>
            {/* breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 font-medium">
                <span>Scan</span>
                <span className="text-gray-300 dark:text-gray-600">/</span>
                <div className="w-5 h-5 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                </div>
                <span className="text-gray-300 dark:text-gray-600">/</span>
                <span className="text-gray-400 dark:text-gray-500">Private Assets</span>
                <span className="text-gray-300 dark:text-gray-600">/</span>
                <span className="text-primary font-semibold">New Scan</span>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat) => (
                    <Card key={stat.label} className="p-6 relative overflow-hidden group hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.label}</h3>
                            <div className={cn(
                                "p-2 rounded-lg",
                                stat.variant === 'critical' && "bg-red-50 text-severity-critical dark:bg-red-900/10",
                                stat.variant === 'high' && "bg-orange-50 text-severity-high dark:bg-orange-900/10",
                                stat.variant === 'medium' && "bg-yellow-50 text-severity-medium dark:bg-yellow-900/10",
                                stat.variant === 'low' && "bg-green-50 text-severity-low dark:bg-green-900/10",
                            )}>
                                {stat.variant === 'critical' && <AlertCircle size={18} />}
                                {stat.variant === 'high' && <AlertTriangle size={18} />}
                                {stat.variant === 'medium' && <AlertTriangle size={18} />}
                                {stat.variant === 'low' && <Info size={18} />}
                            </div>
                        </div>
                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-bold dark:text-white">{stat.count}</span>
                            <div className={cn(
                                "flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider",
                                stat.change.includes('increase') ? "text-primary bg-primary/10" : "text-green-500 bg-green-500/10"
                            )}>
                                {stat.change.includes('increase') ? <TrendingUp size={10} className="mr-1" /> : <TrendingDown size={10} className="mr-1" />}
                                {stat.change}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Main Table Card */}
            <Card className="overflow-hidden border-light-border dark:border-dark-border">
                {/* Toolbar */}
                <div className="p-6 flex flex-col md:flex-row gap-4 items-center justify-between border-b border-light-border dark:border-dark-border bg-white dark:bg-dark-surface">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Search scans by name or type..."
                            className="pl-10 h-10 border-gray-200 dark:border-dark-border"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <Button variant="secondary" size="sm" className="flex-1 md:flex-none">
                            <Filter className="w-4 h-4 mr-2" /> Filter
                        </Button>
                        <Button variant="secondary" size="sm" className="flex-1 md:flex-none">
                            <Columns className="w-4 h-4 mr-2" /> Column
                        </Button>
                        <Button size="sm" onClick={handleNewScan} className="flex-1 md:flex-none">
                            <Plus className="w-4 h-4 mr-2" /> New scan
                        </Button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-gray-50/50 dark:bg-dark-bg/50 text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
                                <th className="px-6 py-4">Scan Name</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Progress</th>
                                <th className="px-6 py-4">Vulnerability</th>
                                <th className="px-6 py-4">Last Scan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-light-border dark:divide-dark-border">
                            {filteredScans.map((scan) => (
                                <tr
                                    key={scan.id}
                                    className="group hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                                    onClick={() => navigate(`/scan/${scan.id}`)}
                                >
                                    <td className="px-6 py-5">
                                        <span className="font-semibold text-gray-900 dark:text-gray-100">{scan.name}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="text-gray-500 dark:text-gray-400 text-sm">{scan.type}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <Badge variant={scan.status.toLowerCase()}>
                                            {scan.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3 w-40">
                                            <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                                <div
                                                    className={cn(
                                                        "h-full rounded-full transition-all duration-500",
                                                        scan.status === 'Failed' ? "bg-severity-critical" : "bg-primary"
                                                    )}
                                                    style={{ width: `${scan.progress}%` }}
                                                />
                                            </div>
                                            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{scan.progress}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            {scan.vulnerabilities.critical > 0 && (
                                                <div className="px-2 py-0.5 rounded bg-severity-critical text-white text-[10px] font-bold">
                                                    {scan.vulnerabilities.critical}
                                                </div>
                                            )}
                                            {scan.vulnerabilities.high > 0 && (
                                                <div className="px-2 py-0.5 rounded bg-severity-high text-white text-[10px] font-bold">
                                                    {scan.vulnerabilities.high}
                                                </div>
                                            )}
                                            {scan.vulnerabilities.medium > 0 && (
                                                <div className="px-2 py-0.5 rounded bg-severity-medium text-white text-[10px] font-bold">
                                                    {scan.vulnerabilities.medium}
                                                </div>
                                            )}
                                            {scan.vulnerabilities.low > 0 && (
                                                <div className="px-2 py-0.5 rounded bg-severity-low text-white text-[10px] font-bold">
                                                    {scan.vulnerabilities.low}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-500 dark:text-gray-400 text-sm">{scan.lastScan}</span>
                                            <MoreVertical className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Footer Info */}
            <div className="mt-8 flex justify-between items-center text-xs text-gray-400 px-2 font-medium">
                <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                        <span className="dark:text-gray-500">Org:</span>
                        <span className="text-gray-700 dark:text-gray-300">Project X</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="dark:text-gray-500">Owner:</span>
                        <span className="text-gray-700 dark:text-gray-300">Nammagiri</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 group cursor-pointer hover:text-primary transition-colors">
                    <RefreshCw size={12} className="group-hover:rotate-180 transition-transform duration-500" />
                    <span>10 mins ago</span>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
