import React from 'react';

interface SkeletonProps {
  className?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', rounded = 'md' }) => {
  const roundedMap = {
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-xl',
    full: 'rounded-full',
  };

  return (
    <div
      className={`relative overflow-hidden bg-slate-700/50 ${roundedMap[rounded]} ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-slate-600/30 to-transparent" />
    </div>
  );
};

export default Skeleton;
