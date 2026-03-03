export interface Scan {
    id: string;
    name: string;
    type: 'Greybox' | 'Blackbox';
    status: 'Completed' | 'Scheduled' | 'Failed';
    progress: number;
    vulnerabilities: {
        critical: number;
        high: number;
        medium: number;
        low: number;
    };
    lastScan: string;
}

export const mockScans: Scan[] = [
    {
        id: '1',
        name: 'Web App Servers',
        type: 'Greybox',
        status: 'Completed',
        progress: 100,
        vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 },
        lastScan: '4d ago',
    },
    {
        id: '2',
        name: 'IoT Devices',
        type: 'Blackbox',
        status: 'Failed',
        progress: 10,
        vulnerabilities: { critical: 2, high: 4, medium: 8, low: 1 },
        lastScan: '3d ago',
    },
    {
        id: '3',
        name: 'Temp Data',
        type: 'Blackbox',
        status: 'Failed',
        progress: 10,
        vulnerabilities: { critical: 2, high: 4, medium: 8, low: 1 },
        lastScan: '3d ago',
    },
    {
        id: '4',
        name: 'Cloud Storage',
        type: 'Greybox',
        status: 'Scheduled',
        progress: 0,
        vulnerabilities: { critical: 0, high: 0, medium: 0, low: 0 },
        lastScan: '1w ago',
    },
];

for (let i = 0; i < 6; i++) {
    mockScans.push({
        ...mockScans[0],
        id: `scan-${i + 5}`,
    });
}

export const stats = [
    { label: 'Critical Severity', count: 86, change: '+2% increase than yesterday', variant: 'critical' as const },
    { label: 'High Severity', count: 16, change: '+0.9% increase than yesterday', variant: 'high' as const },
    { label: 'Medium Severity', count: 26, change: '+0.9% decrease than yesterday', variant: 'medium' as const },
    { label: 'Low Severity', count: 16, change: '+0.9% increase than yesterday', variant: 'low' as const },
];

export const logEntries = [
    { time: '09:00:00', text: "I'll begin a systematic penetration test on helpdesk.democorp.com. Let me start with reconnaissance and enumeration.", highlights: ['helpdesk.democorp.com'], type: 'info' },
    { time: '09:01:00', text: "Good! target is online. Now let me perform port scanning to identify running services.", type: 'success' },
    { time: '09:02:00', text: "Excellent reconnaissance results: - helpdesk.democorp.com: Apache httpd 2.4.65 on port 80 (web server) Let me probe the web server on target first to understand its structure.", highlights: ['2.4.65', 'port 80'], type: 'info' },
    { time: '09:03:00', text: "Great! I found a login page for a Help Desk Platform. I can see a useful comment: \"TODO: Delete the testing account (test:test)\". Let me test this credential. The login redirects to /password/test. Let me follow that path and explore it.", highlights: ['test:test', '/password/test'], type: 'info' },
    { time: '09:04:00', text: "The POST method is not allowed on /password/test. Let me check what the JavaScript does - it posts to '#' which means the current page. Let me try a different approach.", highlights: ['POST'], type: 'info' },
    { time: '09:05:00', text: "It redirects back to /password/test. Let me check if there's an /api endpoint or look for other paths. Let me also try exploring with the test:test password directly on other endpoints.", highlights: ['/api'], type: 'info' },
    { time: '09:06:00', text: "Great! I can access the dashboard using the 'X-UserId: 10032' header. The dashboard shows \"Welcome, John Doe\". This suggests an **IDOR vulnerability** - I can access any user's dashboard by just changing the X-UserId header. Let me explore more of the application...", highlights: ['X-UserId: 10032', 'IDOR vulnerability'], type: 'warning' },
];

export const findings = [
    {
        id: 'f1',
        severity: 'critical' as const,
        title: 'SQL Injection in Authentication Endpoint',
        path: '/api/users/profile',
        time: '10:45:23',
        description: 'Time-based blind SQL injection confirmed on user-controlled input during authentication flow. Exploitation allows database-level access.'
    },
    {
        id: 'f2',
        severity: 'high' as const,
        title: 'Unauthorized Access to User Metadata',
        path: '/api/auth/login',
        time: '10:45:23',
        description: 'Authenticated low-privilege user was able to access metadata of other users. Access control checks were missing.'
    },
    {
        id: 'f3',
        severity: 'medium' as const,
        title: 'Broken Authentication Rate Limiting',
        path: '/api/search',
        time: '10:45:23',
        description: 'No effective rate limiting detected on login attempts. Automated brute-force attempts possible.'
    }
];
