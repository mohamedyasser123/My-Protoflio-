import React from 'react';

type BadgeVariant = 'emerald' | 'sky' | 'slate' | 'violet' | 'pink' | 'orange' | 'cyan' | 'yellow' | 'green';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  dot?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  emerald: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  sky: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
  slate: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
  violet: 'bg-violet-500/15 text-violet-400 border-violet-500/30',
  pink: 'bg-pink-500/15 text-pink-400 border-pink-500/30',
  orange: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  cyan: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  yellow: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  green: 'bg-green-500/15 text-green-400 border-green-500/30',
};

const dotClasses: Record<BadgeVariant, string> = {
  emerald: 'bg-emerald-400',
  sky: 'bg-sky-400',
  slate: 'bg-slate-400',
  violet: 'bg-violet-400',
  pink: 'bg-pink-400',
  orange: 'bg-orange-400',
  cyan: 'bg-cyan-400',
  yellow: 'bg-yellow-400',
  green: 'bg-green-400',
};

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'slate',
  dot = false,
  icon,
  className = '',
}) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantClasses[variant]} ${className}`}
    >
      {icon && <span className="flex items-center justify-center -ml-0.5">{icon}</span>}
      {dot && !icon && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotClasses[variant]}`} />
      )}
      {label}
    </span>
  );
};

export default Badge;
