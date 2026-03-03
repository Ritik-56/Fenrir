import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Download,
    Search,
    Layers,
    CheckCircle2,
    FileText,
    Clock,
    Zap,
    Cpu,
    Activity,
    UserCheck,
    FileCode,
    CheckSquare,
    X,
    ChevronRight,
    Square
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Card, Badge, Button, cn } from '../components/ui';
import { logEntries, findings } from '../data/mockData';
import { toast } from 'sonner';

const ScanDetail = () => {
    const { id: _id } = useParams();
    const [activeTab, setActiveTab] = useState('activity');
    const [scanStep, setScanStep] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => (prev < 65 ? prev + 1 : prev));
            if (progress > 20) setScanStep(1);
            if (progress > 40) setScanStep(2);
        }, 100);
        return () => clearInterval(interval);
    }, [progress]);

    const steps = [
        { label: 'Spidering', icon: Search },
        { label: 'Mapping', icon: Layers },
        { label: 'Testing', icon: Zap },
        { label: 'Validating', icon: CheckCircle2 },
        { label: 'Reporting', icon: FileText },
    ];

    const metadata = [
        { label: 'Scan Type', value: 'Grey Box', icon: Cpu },
        { label: 'Targets', value: 'google.com', icon: Activity },
        { label: 'Started At', value: 'Nov 22, 09:00AM', icon: Clock },
        { label: 'Credentials', value: '2 Active', icon: UserCheck },
        { label: 'Files', value: 'Control.pdf', icon: FileCode },
        { label: 'Checklists', value: '40/350', icon: CheckSquare, extra: 'text-primary' },
    ];

    const dashArray = 283;
    const dashOffset = dashArray - (dashArray * progress) / 100;

    return (
        <DashboardLayout>
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
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
                <div className="flex items-center gap-3">
                    <Button variant="secondary" size="sm" onClick={() => toast.success('Report export started')}>
                        <Download className="w-4 h-4 mr-2" /> Export Report
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => toast.error('Scan stopped by user')}>
                        <Square className="w-4 h-4 mr-2" /> Stop Scan
                    </Button>
                </div>
            </div>

            {/* Progress & Steps Card */}
            <Card className="p-8 mb-6">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Circular Progress */}
                    <div className="relative w-40 h-40 flex-shrink-0">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle
                                cx="50" cy="50" r="45"
                                className="stroke-gray-100 dark:stroke-gray-800 fill-none"
                                strokeWidth="8"
                            />
                            <circle
                                cx="50" cy="50" r="45"
                                className="stroke-primary fill-none transition-all duration-500 ease-out"
                                strokeWidth="8"
                                strokeDasharray={dashArray}
                                strokeDashoffset={dashOffset}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold dark:text-white">{progress}%</span>
                            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">In Progress</span>
                        </div>
                    </div>

                    {/* Steps Tracker */}
                    <div className="flex-1 w-full">
                        <div className="relative flex justify-between w-full">
                            {/* Connector Lines */}
                            <div className="absolute top-6 left-0 w-full h-0.5 bg-gray-100 dark:bg-gray-800 -z-10" />

                            {steps.map((step, idx) => (
                                <div key={step.label} className="flex flex-col items-center gap-3 relative">
                                    <div className={cn(
                                        "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 border-4",
                                        idx === scanStep
                                            ? "bg-primary text-white border-white dark:border-dark-surface shadow-lg shadow-primary/20 scale-110"
                                            : idx < scanStep
                                                ? "bg-primary text-white border-white dark:border-dark-surface"
                                                : "bg-white dark:bg-dark-bg text-gray-400 border-white dark:border-dark-surface shadow-sm"
                                    )}>
                                        <step.icon size={20} />
                                    </div>
                                    <span className={cn(
                                        "text-xs font-bold uppercase tracking-wider",
                                        idx === scanStep ? "text-primary dark:text-primary" : "text-gray-400"
                                    )}>
                                        {step.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Metadata Row */}
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 mt-12 bg-gray-50 dark:bg-white/5 p-6 rounded-2xl">
                            {metadata.map((item) => (
                                <div key={item.label} className="space-y-1">
                                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{item.label}</p>
                                    <p className={cn("text-xs font-bold dark:text-gray-200", item.extra)}>{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Card>

            {/* Console & Log Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
                {/* Left: Terminal Console */}
                <Card className="lg:col-span-2 flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-light-border dark:border-dark-border flex items-center justify-between bg-gray-50/50 dark:bg-dark-bg/50">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <h3 className="text-sm font-bold dark:text-white">Live Scan Console</h3>
                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase">
                                <Activity size={10} /> Running...
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                                <ChevronRight size={18} className="rotate-90" />
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="flex border-b border-light-border dark:border-dark-border">
                        <button
                            onClick={() => setActiveTab('activity')}
                            className={cn(
                                "px-6 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all",
                                activeTab === 'activity'
                                    ? "border-primary text-primary bg-primary/5"
                                    : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            )}
                        >
                            Activity Log
                        </button>
                        <button
                            onClick={() => setActiveTab('loops')}
                            className={cn(
                                "px-6 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition-all",
                                activeTab === 'loops'
                                    ? "border-primary text-primary bg-primary/5"
                                    : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            )}
                        >
                            Verification Loops
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 bg-white dark:bg-dark-surface font-mono text-sm leading-relaxed space-y-4">
                        {logEntries.map((entry, idx) => (
                            <div key={idx} className="flex gap-4 group">
                                <span className="text-gray-400 dark:text-gray-600 select-none">[{entry.time}]</span>
                                <p className="text-gray-700 dark:text-gray-300">
                                    {entry.text.split(' ').map((word, wIdx) => {
                                        const isHighlight = entry.highlights?.some(h => word.includes(h)) ||
                                            (word.startsWith('/') && word.length > 2) ||
                                            (word.includes('vulnerability')) ||
                                            (word.includes(':'));

                                        return (
                                            <span key={wIdx} className={cn(
                                                isHighlight && "text-primary font-semibold px-1 rounded bg-primary/5",
                                                word.includes('vulnerability') && "text-severity-critical bg-severity-critical/5"
                                            )}>
                                                {word}{' '}
                                            </span>
                                        );
                                    })}
                                </p>
                            </div>
                        ))}
                        <div className="flex gap-4 animate-pulse">
                            <span className="text-gray-400 dark:text-gray-600">[{new Date().toLocaleTimeString('en-GB')}]</span>
                            <div className="w-2 h-5 bg-primary/50" />
                        </div>
                    </div>
                </Card>

                {/* Right: Finding Log */}
                <Card className="flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-light-border dark:border-dark-border flex items-center justify-between bg-gray-50/50 dark:bg-dark-bg/50">
                        <h3 className="text-sm font-bold dark:text-white">Finding Log</h3>
                        <span className="text-[10px] text-gray-400 font-bold uppercase">{findings.length} findings</span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30 dark:bg-dark-bg/30">
                        {findings.map((finding) => (
                            <Card key={finding.id} className="p-4 border shadow-none hover:shadow-md transition-all cursor-pointer group">
                                <div className="flex justify-between items-start mb-2">
                                    <Badge variant={finding.severity}>
                                        {finding.severity.charAt(0).toUpperCase() + finding.severity.slice(1)}
                                    </Badge>
                                    <span className="text-[10px] text-gray-400 font-mono tracking-tighter">{finding.time}</span>
                                </div>
                                <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1 leading-tight group-hover:text-primary transition-colors">
                                    {finding.title}
                                </h4>
                                <p className="text-[11px] text-primary font-mono mb-2 truncate">{finding.path}</p>
                                <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                                    {finding.description}
                                </p>
                            </Card>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Bottom Status Bar */}
            <div className="mt-8 flex flex-col md:flex-row items-center justify-between p-4 bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-xl text-[10px] uppercase font-bold tracking-widest text-gray-500 dark:text-gray-400 shadow-sm transition-all hover:bg-gray-50 dark:hover:bg-white/5">
                <div className="flex flex-wrap items-center gap-6 mb-4 md:mb-0">
                    <div className="flex items-center gap-2">
                        <Cpu size={14} className="text-primary" />
                        <span>Sub-agents: <span className="text-gray-900 dark:text-white">8 Active</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Zap size={14} className="text-primary" />
                        <span>Parallel Executions: <span className="text-gray-900 dark:text-white">12/20</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Activity size={14} className="text-primary" />
                        <span>Operations/sec: <span className="text-gray-900 dark:text-white">142</span></span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-severity-critical" />
                        <span className="text-severity-critical">02</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-severity-high" />
                        <span className="text-severity-high">04</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-severity-medium" />
                        <span className="text-severity-medium">08</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-severity-low" />
                        <span className="text-severity-low">01</span>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ScanDetail;
