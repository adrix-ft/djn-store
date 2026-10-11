import React from 'react';

interface DjnLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'dark' | 'light';
}

export const DjnLogo: React.FC<DjnLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  variant = 'dark',
}) => {
  const imageSizes = {
    sm: 'h-8 w-auto',
    md: 'h-10 w-auto',
    lg: 'h-12 w-auto',
    xl: 'h-16 w-auto',
  }[size];

  const primaryColor = variant === 'light' ? '#ffffff' : '#111827';
  const subtitleColor = variant === 'light' ? '#9ca3af' : '#6b7280';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official Brand Logo Image */}
      <img
        src="/logo-icon.png"
        alt="DJN Tech Logo"
        className={`${imageSizes} max-w-[160px] object-contain transition-transform group-hover:scale-105 duration-200`}
        loading="eager"
        decoding="async"
      />

      {showText && (
        <div className="flex flex-col justify-center">
          <span
            style={{ color: primaryColor }}
            className="text-lg sm:text-xl font-bold tracking-tight leading-tight"
          >
            DJN TECH
          </span>
          <span
            style={{ color: subtitleColor }}
            className="text-[10px] tracking-[0.18em] font-medium uppercase leading-tight"
          >
            Gaming Store
          </span>
        </div>
      )}
    </div>
  );
};
