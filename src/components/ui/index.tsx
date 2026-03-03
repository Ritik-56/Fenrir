import { forwardRef, type FC, type ButtonHTMLAttributes, type InputHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
        const variants = {
            primary: 'bg-primary text-white hover:bg-primary-dark shadow-sm',
            secondary: 'bg-light-surface dark:bg-dark-surface text-gray-900 dark:text-gray-100 border border-light-border dark:border-dark-border hover:bg-gray-50 dark:hover:bg-gray-800',
            outline: 'bg-transparent border border-primary text-primary hover:bg-primary/10',
            ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
            danger: 'bg-severity-critical text-white hover:bg-red-600 shadow-sm',
        };

        const sizes = {
            sm: 'px-3 py-1.5 text-xs font-medium rounded-md',
            md: 'px-4 py-2 text-sm font-semibold rounded-lg',
            lg: 'px-6 py-3 text-base font-semibold rounded-xl',
            icon: 'p-2 rounded-lg',
        };

        return (
            <button
                ref={ref}
                disabled={isLoading || props.disabled}
                className={cn(
                    'inline-flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {isLoading && (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                )}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={cn(
                    'flex h-11 w-full rounded-lg border border-light-border dark:border-dark-border bg-white dark:bg-dark-surface px-4 py-2 text-sm text-gray-900 dark:text-gray-100 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all',
                    className
                )}
                {...props}
            />
        );
    }
);

Input.displayName = 'Input';

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'critical' | 'high' | 'medium' | 'low' | 'completed' | 'scheduled' | 'failed' | 'default';
}

export const Badge: FC<BadgeProps> = ({ className, variant = 'default', ...props }) => {
    const variants = {
        critical: 'bg-severity-critical/10 text-severity-critical border-severity-critical/20',
        high: 'bg-severity-high/10 text-severity-high border-severity-high/20',
        medium: 'bg-severity-medium/10 text-severity-medium border-severity-medium/20',
        low: 'bg-severity-low/10 text-severity-low border-severity-low/20',
        completed: 'bg-green-500/10 text-green-500 border-green-500/20',
        scheduled: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
        failed: 'bg-red-500/10 text-red-500 border-red-500/20',
        default: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700',
    };

    return (
        <div
            className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors',
                variants[variant],
                className
            )}
            {...props}
        />
    );
};

export const Card = ({ className, children }: { className?: string; children: ReactNode }) => (
    <div className={cn('bg-white dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-xl shadow-sm', className)}>
        {children}
    </div>
);
