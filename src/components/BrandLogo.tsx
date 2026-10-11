import React from 'react';

interface BrandLogoProps {
  variant?: 'horizontal' | 'stacked' | 'icon';
  className?: string;
  theme?: 'dark' | 'light' | 'auto';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'horizontal',
  className = '',
  theme = 'auto',
}) => {
  // If explicitly light
  if (theme === 'light') {
    if (variant === 'icon') {
      return (
        <img
          src="/logo-icon.png"
          alt="DJN Tech"
          className={`object-contain select-none shrink-0 ${className || 'h-10 w-auto'}`}
          loading="eager"
          decoding="async"
        />
      );
    }
    if (variant === 'stacked') {
      return (
        <div className={`flex flex-col items-center justify-center ${className}`}>
          <img
            src="/logo.png"
            alt="DJN Tech Console Store"
            className="object-contain select-none max-h-24 sm:max-h-28 w-auto"
            loading="eager"
            decoding="async"
          />
        </div>
      );
    }
    return (
      <div className={`flex items-center select-none ${className}`}>
        <img
          src="/logo-horizontal.png"
          alt="DJN Tech Console Store"
          className="h-8 sm:h-10 md:h-11 lg:h-12 w-auto max-w-[145px] sm:max-w-[220px] md:max-w-[280px] object-contain select-none shrink-0"
          loading="eager"
          decoding="async"
        />
      </div>
    );
  }

  // If explicitly dark
  if (theme === 'dark') {
    if (variant === 'icon') {
      return (
        <img
          src="/logo-icon-dark.png"
          alt="DJN Tech"
          className={`object-contain select-none shrink-0 ${className || 'h-10 w-auto'}`}
          loading="eager"
          decoding="async"
        />
      );
    }
    if (variant === 'stacked') {
      return (
        <div className={`flex flex-col items-center justify-center ${className}`}>
          <img
            src="/logo-dark.png"
            alt="DJN Tech Console Store"
            className="object-contain select-none max-h-24 sm:max-h-28 w-auto drop-shadow-sm"
            loading="eager"
            decoding="async"
          />
        </div>
      );
    }
    return (
      <div className={`flex items-center select-none ${className}`}>
        <img
          src="/logo-horizontal-dark.png"
          alt="DJN Tech Console Store"
          className="h-8 sm:h-10 md:h-11 lg:h-12 w-auto max-w-[145px] sm:max-w-[220px] md:max-w-[280px] object-contain select-none shrink-0 drop-shadow-sm"
          loading="eager"
          decoding="async"
        />
      </div>
    );
  }

  // Default: 'auto' (reacts dynamically to Tailwind .dark class without re-render lag)
  if (variant === 'icon') {
    return (
      <div className={`shrink-0 inline-flex items-center ${className}`}>
        <img
          src="/logo-icon.png"
          alt="DJN Tech"
          className="dark:hidden h-10 w-auto object-contain select-none shrink-0"
          loading="eager"
          decoding="async"
        />
        <img
          src="/logo-icon-dark.png"
          alt="DJN Tech"
          className="hidden dark:block h-10 w-auto object-contain select-none shrink-0"
          loading="eager"
          decoding="async"
        />
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <img
          src="/logo.png"
          alt="DJN Tech Console Store"
          className="dark:hidden object-contain select-none max-h-24 sm:max-h-28 w-auto"
          loading="eager"
          decoding="async"
        />
        <img
          src="/logo-dark.png"
          alt="DJN Tech Console Store"
          className="hidden dark:block object-contain select-none max-h-24 sm:max-h-28 w-auto drop-shadow-sm"
          loading="eager"
          decoding="async"
        />
      </div>
    );
  }

  // Default: Horizontal lockup (ideal for sticky Header and Footer)
  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src="/logo-horizontal.png"
        alt="DJN Tech Console Store"
        className="dark:hidden h-8 sm:h-10 md:h-11 lg:h-12 w-auto max-w-[145px] sm:max-w-[220px] md:max-w-[280px] object-contain select-none shrink-0"
        loading="eager"
        decoding="async"
      />
      <img
        src="/logo-horizontal-dark.png"
        alt="DJN Tech Console Store"
        className="hidden dark:block h-8 sm:h-10 md:h-11 lg:h-12 w-auto max-w-[145px] sm:max-w-[220px] md:max-w-[280px] object-contain select-none shrink-0 drop-shadow-sm"
        loading="eager"
        decoding="async"
      />
    </div>
  );
};


