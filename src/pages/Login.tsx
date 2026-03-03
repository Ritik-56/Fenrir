import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, CheckCircle2, Eye, EyeOff, Chrome, Apple } from 'lucide-react';
import { Button, Input } from '../components/ui';
import { useTheme } from '../context/ThemeContext';

const Login = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate loading
        setTimeout(() => {
            setIsLoading(false);
            navigate('/dashboard');
        }, 1000);
    };

    const features = [
        'Effortlessly spider and map targets to uncover hidden security flaws',
        'Deliver high-quality, validated findings in hours, not weeks.',
        'Generate professional, enterprise-grade security reports automatically.'
    ];

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-white dark:bg-dark-bg transition-colors duration-300">
            {/* Left Side - Info */}
            <div className="flex-1 relative overflow-hidden flex flex-col justify-between p-8 md:p-16 lg:p-24 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
                {/* Abstract Background Elements */}
                <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px]" />

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-12">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                            <Shield className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">aps</span>
                    </div>

                    <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                        Expert level <span className="text-primary">Cybersecurity</span> <br />
                        in <span className="text-primary italic">hours</span> not weeks.
                    </h1>

                    <div className="space-y-6 mt-12">
                        <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider">What's included</h3>
                        {features.map((feature, index) => (
                            <div key={index} className="flex gap-4">
                                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <p className="text-gray-300 text-base leading-relaxed">{feature}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 mt-12 md:mt-0">
                    <div className="flex items-center gap-2 text-yellow-500 mb-2">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <svg key={s} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                        <span className="text-white font-medium ml-2">Trustpilot</span>
                    </div>
                    <p className="text-gray-400 text-sm">Rated <span className="text-white font-semibold">4.5/5.0</span> (100k+ reviews)</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 flex flex-col justify-center items-center p-8 bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
                <div className="w-full max-w-md bg-white dark:bg-dark-surface p-8 md:p-10 rounded-2xl shadow-xl border border-light-border dark:border-dark-border">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Sign up</h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            Already have an account? <Link to="#" className="text-primary font-semibold hover:underline">Log in</Link>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">First name*</label>
                                <Input placeholder="John" required />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Last name*</label>
                                <Input placeholder="Doe" required />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Email address*</label>
                            <Input type="email" placeholder="john@example.com" required />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Password (8+ characters)*</label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="pr-12"
                                    required
                                    minLength={8}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 py-2">
                            <input
                                type="checkbox"
                                id="terms"
                                className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary dark:bg-dark-surface dark:border-dark-border"
                                required
                            />
                            <label htmlFor="terms" className="text-xs text-gray-500 dark:text-gray-400 leading-normal">
                                I agree to aps's <Link to="#" className="text-primary hover:underline">Terms & Conditions</Link> and acknowledge the <Link to="#" className="text-primary hover:underline">Privacy Policy</Link>
                            </label>
                        </div>

                        <Button type="submit" className="w-full h-12 text-base" isLoading={isLoading}>
                            {isLoading ? 'Creating account...' : 'Create account'}
                        </Button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-light-border dark:border-dark-border"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white dark:bg-dark-surface px-2 text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <button className="flex items-center justify-center h-12 rounded-xl border border-light-border dark:border-dark-border hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                            <Apple className="w-5 h-5 dark:text-white" />
                        </button>
                        <button className="flex items-center justify-center h-12 rounded-xl border border-light-border dark:border-dark-border hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                            <Chrome className="w-5 h-5" />
                        </button>
                        <button className="flex items-center justify-center h-12 rounded-xl border border-light-border dark:border-dark-border hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-600 fill-current" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Theme Toggle in Login */}
                <button
                    onClick={toggleTheme}
                    className="fixed bottom-6 right-6 p-3 rounded-full bg-white dark:bg-dark-surface shadow-lg border border-light-border dark:border-dark-border text-gray-600 dark:text-gray-300 hover:scale-110 transition-all z-50"
                >
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
            </div>
        </div>
    );
};

export default Login;
