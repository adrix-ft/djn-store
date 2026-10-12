import React, { useState } from 'react';

interface GameCaseFrameProps {
  imageUrl?: string;
  name: string;
  platform?: string; // 'PS5' | 'PS4' | 'Xbox' | string
  size?: 'sm' | 'md' | 'lg' | 'detail';
  className?: string;
  showGlare?: boolean;
}

/**
 * 100% Official Sony PlayStation 5 Logo & Wordmark Vector
 * Features the official standing P + shadow S PlayStation Family Mark,
 * official Sony Zrnic/PlayStation brand font for "PS5", and "™" symbol.
 */
export const OfficialPS5Logo: React.FC<{ className?: string }> = ({ className = 'h-full w-auto' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 990.96 215.56"
    className={className}
    fill="currentColor"
    aria-label="PlayStation 5 Official Logo"
  >
    <g id="ps5_logo">
      {/* Official PlayStation Family Emblem */}
      <path
        id="ps_logo"
        fillRule="evenodd"
        d="M20.79,183C-1,176.77-4.7,163.91,5.26,156.5c9.21-6.87,24.87-12,24.87-12L94.8,121.4v26.32L48.26,164.45c-8.23,3-9.49,7.16-2.8,9.35s18.78,1.57,27-1.39l22.32-8.14v23.55c-1.41.26-3,.51-4.45.75A145.79,145.79,0,0,1,20.79,183Zm136.44,2.74,72.57-25.9c8.24-3,9.5-7.14,2.81-9.33s-18.78-1.57-27,1.4l-48.36,17.06V141.78l2.8-.95a165.71,165.71,0,0,1,33.61-7.13c19.65-2.17,43.71.3,62.59,7.46,21.29,6.74,23.69,16.67,18.28,23.51s-18.67,11.71-18.67,11.71l-98.61,35.49Zm8.49-168.57c38.21,13.19,51.16,29.61,51.16,66.61,0,36.05-22.14,49.72-50.26,36.07V52.62c0-7.88-1.44-15.14-8.8-17.2-5.64-1.82-9.14,3.45-9.14,11.33V215l-45.12-14.4V0c19.19,3.58,47.14,12,62.16,17.13Zm97,184.15a1.64,1.64,0,0,1-.54,1.43,2.84,2.84,0,0,1-1.65.42h-3.47v-3.59h3.68a2.79,2.79,0,0,1,1.2.22,1.53,1.53,0,0,1,.78,1.52Zm2.49,8.18a.79.79,0,0,1-.37-.56,4.21,4.21,0,0,1-.1-1l-.07-1.63a2.93,2.93,0,0,0-.44-1.69,2.73,2.73,0,0,0-.75-.62,3.37,3.37,0,0,0,.95-.93,3.6,3.6,0,0,0,.49-1.94,3.16,3.16,0,0,0-1.85-3.12,5.71,5.71,0,0,0-2.37-.43h-5.81v12.7h2.17v-5.21h3.42a3.3,3.3,0,0,1,1.33.2,1.42,1.42,0,0,1,.71,1.35l.1,2a6.68,6.68,0,0,0,.09,1,1.8,1.8,0,0,0,.16.48l.08.15h2.42v-.74Zm-14.89-5.3a9.51,9.51,0,0,1,2.74-6.71,9.23,9.23,0,0,1,13.22,0,9.52,9.52,0,0,1-6.61,16.19,9.23,9.23,0,0,1-6.61-2.78,9.51,9.51,0,0,1-2.74-6.7Zm9.35,11.4a11.05,11.05,0,0,0,7.94-3.35,11.52,11.52,0,0,0,0-16.12,11.08,11.08,0,0,0-7.94-3.34,11.44,11.44,0,0,0-7.94,19.46,11.05,11.05,0,0,0,7.94,3.35Z"
      />
      {/* Official Sony PS5 Brand Wordmark & TM */}
      <path
        id="ps5"
        d="M970.58,172.41h-1.92V159.26h-4.4v-1.84H975v1.84h-4.4Zm13.31-3.48h0L988,157.42h3v15H989V159.88h0l-4.55,12.53h-1.22l-4.53-12.53h0v12.53H976.8v-15h3ZM945,42.94H761V92.82s-.56,19.26,23.26,19.26H896.73a31.57,31.57,0,0,1,12.83,2.61c6.28,2.8,13.34,8.5,13.34,20,0,10.32-5,16.18-9.95,19.46a25,25,0,0,1-13.76,4H761v14H915.09s35-1.42,35-37.39c0-18.29-10.68-27.35-20.29-31.79A47,47,0,0,0,910,98.68H798.53a11.24,11.24,0,0,1-5.34-1.27c-2.38-1.29-5-3.85-5-8.89V56.75H945ZM529.41,158.1v14h78.1a38.71,38.71,0,0,0,25.5-9.23,32.27,32.27,0,0,0,11.38-25.36V78a21.5,21.5,0,0,1,8-17A20,20,0,0,1,665,56.75h68.09V42.94H652s-35,.56-35,37.58v55.57A24.12,24.12,0,0,1,613.46,149a18.78,18.78,0,0,1-16.7,9.13ZM349.09,42.94V56.75h139.2a26.28,26.28,0,0,1,11.22,2.41c5.52,2.59,11.72,7.92,11.72,18.73,0,10.5-6.2,15.75-11.72,18.35a26.78,26.78,0,0,1-11.4,2.44H384.87a39.28,39.28,0,0,0-17.64,4c-8.59,4.31-18.14,14.46-18.14,31.2v38h26.79V134.05a19.66,19.66,0,0,1,1.31-7.2c2.21-5.67,7.8-14.77,20.87-14.77h104.1a37.78,37.78,0,0,0,10.36-1.39c9.56-2.72,25.5-10.58,25.5-32.8,0-34.53-34.37-34.95-34.37-34.95Z"
      />
    </g>
  </svg>
);

/**
 * 100% Official Sony PlayStation 4 Logo & Wordmark Vector
 * Features the official PlayStation Family Mark,
 * official Sony PlayStation brand font for "PS4", and "™" symbol.
 */
export const OfficialPS4Logo: React.FC<{ className?: string }> = ({ className = 'h-full w-auto' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 502.921 104.794"
    className={className}
    fill="currentColor"
    aria-label="PlayStation 4 Official Logo"
  >
    <g id="ps4_logo">
      {/* PlayStation Family Mark */}
      <g id="ps_mark">
        <path d="M50.372,0c5.858,1.092,11.616,2.652,17.346,4.278c3.278,0.952,6.547,1.937,9.795,2.986 c5.102,1.625,10.182,3.465,14.803,6.209c2.07,1.257,4.058,2.677,5.757,4.409c1.841,1.799,3.348,3.933,4.454,6.255 c2.015,4.208,2.705,8.909,2.909,13.531c0.096,3.016,0.09,6.058-0.473,9.035c-0.468,2.587-1.3,5.138-2.684,7.385 c-1.222,1.985-2.921,3.701-4.983,4.807c-1.978,1.066-4.243,1.574-6.486,1.529c-3.402,0.036-6.703-1.049-9.756-2.47 c-0.055-10.153-0.008-20.308-0.024-30.46c-0.022-1.837,0.103-3.693-0.267-5.505c-0.26-1.404-0.833-2.819-1.935-3.772 c-0.731-0.659-1.678-1.031-2.63-1.232c-0.963-0.183-1.99,0.226-2.586,0.999c-0.991,1.238-1.251,2.882-1.296,4.423 c-0.008,27.181,0.01,54.363-0.008,81.542c-7.312-2.317-14.625-4.636-21.935-6.96C50.365,64.659,50.368,32.33,50.372,0z"/>
        <path d="M17.506,68.783c9.533-3.375,19.056-6.782,28.593-10.146c0.015,3.743,0,7.487,0.006,11.233 c-0.006,0.508,0.027,1.018-0.037,1.523c-7.538,2.672-15.061,5.391-22.592,8.08c-1.044,0.394-2.115,0.841-2.92,1.638 c-0.375,0.374-0.68,0.926-0.475,1.462c0.258,0.631,0.902,0.974,1.496,1.234c1.652,0.672,3.458,0.767,5.218,0.848 c1.962-0.031,3.932-0.178,5.854-0.602c1.299-0.255,2.549-0.693,3.787-1.158c3.218-1.165,6.436-2.337,9.659-3.49 c0.024,3.166,0.004,6.334,0.01,9.503c-0.01,0.633,0.029,1.27-0.034,1.901c-3.958,0.711-7.963,1.194-11.986,1.257 c-8.101,0.183-16.221-1.071-23.916-3.603c-2.524-0.731-5.032-1.704-7.139-3.307c-1.16-0.898-2.198-2.027-2.726-3.416 c-0.442-1.176-0.41-2.535,0.141-3.67c0.531-1.132,1.459-2.027,2.481-2.722c2.365-1.633,4.973-2.878,7.616-3.989 C12.819,70.387,15.181,69.631,17.506,68.783z"/>
        <path d="M94.209,64.52c2.162-0.25,4.338-0.309,6.511-0.387c7.151,0.027,14.338,0.917,21.178,3.062 c1.342,0.408,2.642,0.936,3.979,1.362c2.383,0.871,4.769,1.927,6.677,3.64c1.147,1.046,2.135,2.455,2.149,4.064 c0.068,1.309-0.525,2.565-1.374,3.531c-1.616,1.812-3.752,3.057-5.897,4.143c-2.283,1.164-4.737,1.915-7.131,2.801 c-14.612,5.247-29.225,10.492-43.835,15.745c-0.002-4.093,0.004-8.185-0.002-12.276c0.022-0.163-0.068-0.448,0.163-0.491 c11.118-3.956,22.233-7.923,33.349-11.889c1.503-0.562,3.122-0.969,4.398-1.989c0.522-0.41,1.033-1.062,0.777-1.765 c-0.267-0.615-0.905-0.956-1.492-1.21c-1.664-0.659-3.476-0.787-5.246-0.836c-2.771,0.019-5.567,0.361-8.202,1.249 c-7.919,2.775-15.824,5.584-23.745,8.35c0.001-4.395-0.002-8.787,0.002-13.181C82.199,66.432,88.183,65.213,94.209,64.52z"/>
        <g id="ps_registered">
          <path d="M126.692,94.796c1.729-0.216,3.535,0.559,4.571,1.961c1.131,1.446,1.338,3.532,0.539,5.184 c-0.806,1.714-2.65,2.915-4.559,2.852c-1.757,0.039-3.459-0.984-4.324-2.499c-0.782-1.335-0.875-3.044-0.27-4.464 C123.329,96.191,124.931,94.994,126.692,94.796z M126.316,95.719c-0.968,0.22-1.847,0.807-2.425,1.614 c-0.695,0.949-0.958,2.205-0.694,3.354c0.222,1.067,0.897,2.02,1.808,2.611c1.403,0.922,3.37,0.871,4.712-0.142 c1.385-0.978,2.043-2.857,1.567-4.484c-0.294-1.1-1.08-2.036-2.07-2.581C128.334,95.623,127.284,95.488,126.316,95.719z"/>
          <path d="M125.118,96.896c0.901-0.005,1.805-0.001,2.707-0.003c0.51,0.007,1.072,0.126,1.433,0.517 c0.364,0.411,0.393,1.008,0.293,1.523c-0.056,0.34-0.356,0.541-0.573,0.779c0.189,0.167,0.43,0.324,0.475,0.596 c0.104,0.52-0.006,1.068,0.161,1.578c0.105,0.18,0.212,0.362,0.22,0.578c-0.374,0.01-0.747,0.003-1.121,0.009 c-0.252-0.593-0.064-1.26-0.221-1.871c-0.062-0.249-0.32-0.404-0.566-0.396c-0.61-0.026-1.222-0.008-1.83-0.009 c-0.009,0.758,0.022,1.519-0.018,2.276c-0.318-0.005-0.637-0.005-0.955,0.001C125.107,100.612,125.118,98.755,125.118,96.896z M126.096,97.78c0.001,0.513,0.001,1.026,0,1.541c0.545,0.003,1.091,0.007,1.638,0.002c0.271-0.002,0.586-0.053,0.762-0.283 c0.185-0.293,0.181-0.683,0.014-0.981c-0.14-0.235-0.437-0.258-0.681-0.273C127.251,97.769,126.673,97.779,126.096,97.78z"/>
        </g>
      </g>
      {/* Official Sony PS4 Brand Font Wordmark */}
      <g id="ps4_wordmark">
        {/* P */}
        <path d="M181.104,88.513h13.183c0.178-0.063,0.33-0.252,0.33-0.499V68.911c0-6.115,3.454-10.344,8.486-10.344h54.301 c12.242,0,18.176-7.55,18.176-17.441c0-8.864-4.857-15.799-14.813-17.064H180.86c-0.023,0.05-0.062,0.089-0.062,0.152v5.964 c0,0.302,0.15,0.454,0.45,0.454h71.574c6.084,0,8.938,4.379,8.938,10.494c0,6.116-2.854,10.495-8.938,10.495h-56.628 c-8.787,0-15.396,7.476-15.396,17.29v19.103C180.797,88.261,180.903,88.449,181.104,88.513z"/>
        {/* S */}
        <path d="M335.361,71.101V41.126c0-6.115,2.854-10.494,8.941-10.494h37.547c0.23,0,0.451-0.228,0.451-0.454v-5.964 c0-0.052-0.015-0.103-0.035-0.152h-45.909c-9.951,1.265-14.812,8.2-14.812,17.064v29.974c0,6.115-2.934,10.495-8.94,10.495 h-39.652c-0.225,0-0.451,0.151-0.451,0.453v5.965c0,0.247,0.152,0.436,0.33,0.499h45.019 C329.584,88.204,335.361,80.713,335.361,71.101z"/>
        {/* 4 */}
        <path d="M382.08,81.596h72.1c0.221,0,0.371,0.151,0.371,0.302v6.116c0,0.302,0.23,0.453,0.451,0.453h12.996 c0.23,0,0.449-0.151,0.449-0.453v-5.965c0-0.227,0.23-0.453,0.451-0.453h12.916c0.301,0,0.451-0.227,0.451-0.452v-6.041 c0-0.227-0.15-0.453-0.451-0.453h-12.916c-0.221,0-0.451-0.227-0.451-0.453V30.632c0-3.555-1.321-5.819-3.542-6.57h-3.76 c-1.172,0.301-2.446,0.84-3.812,1.661l-77.656,47.945c-3.004,1.887-4.057,4-3.305,5.586 C376.972,80.614,378.695,81.596,382.08,81.596z M393.343,73.593L453.5,36.37c0.379-0.302,1.131-0.226,1.131,0.604v37.223 c0,0.227-0.23,0.453-0.451,0.453h-60.465c-0.521,0-0.752-0.15-0.822-0.302C392.812,74.046,392.962,73.819,393.343,73.593z"/>
        {/* TM */}
        <polygon points="491.427,88.467 492.408,88.467 492.408,82.049 494.73,82.049 494.73,81.218 489.103,81.218 489.103,82.049 491.427,82.049"/>
        <polygon points="496.613,82.577 498.566,88.467 499.537,88.467 501.49,82.577 501.49,88.467 502.3,88.467 502.3,81.218 501.119,81.218 499.085,87.409 496.984,81.218 495.632,81.218 495.632,88.467 496.613,88.467"/>
      </g>
    </g>
  </svg>
);

/**
 * Official Xbox Header Logo
 */
export const OfficialXboxLogo: React.FC<{ className?: string }> = ({ className = 'h-full w-auto' }) => (
  <div className="flex items-center gap-1.5 h-full text-gray-900 select-none">
    <svg viewBox="0 0 100 100" className="h-[75%] w-auto" fill="currentColor">
      <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm25.9 74.2c-5.8 4.7-16.1 1.9-25.9-6.9-9.8 8.8-20.1 11.6-25.9 6.9-3.7-3.1-4.7-9.5-2.6-17.1 7.2-11.7 18.5-27.1 28.5-39.7 10 12.6 21.3 28 28.5 39.7 2.1 7.6 1.1 14-2.6 17.1zM50 18.5c5.3 6.9 11.2 15.2 16.6 23.3-9.9-5.1-23.3-5.1-33.2 0 5.4-8.1 11.3-16.4 16.6-23.3z" />
    </svg>
    <span className="font-sans font-extrabold text-[11px] sm:text-xs tracking-widest">XBOX</span>
  </div>
);

/**
 * GameCaseFrame
 * Automatically wraps any game artwork inside an authentic retail physical console case.
 * Accurate Blu-ray Amaray case proportions, translucent royal blue polycarbonate rims,
 * right opening spine notch, and official vector branding banner.
 */
export const GameCaseFrame: React.FC<GameCaseFrameProps> = ({
  imageUrl,
  name,
  platform = 'PS5',
  size = 'md',
  className = '',
  showGlare = true,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const isXbox = platform?.toLowerCase().includes('xbox');
  const isPS4 = platform?.toLowerCase().includes('ps4');
  const isPS5 = !isXbox && !isPS4; // Default to PS5 as requested

  // Sizing definitions for case dimensions
  const sizeStyles = {
    sm: {
      wrapper: 'h-full max-h-[115px] aspect-[3/4.15] w-auto max-w-full mx-auto',
      outerPadding: 'pt-[2px] pb-[2px] pl-[2px] pr-[3.5px]',
      bannerHeight: 'h-[12%] min-h-[14px]',
      logoHeight: 'h-[62%]',
      bannerPadding: 'px-1.5',
      roundedOuter: 'rounded-[5px]',
      roundedInner: 'rounded-[3px]',
    },
    md: {
      wrapper: 'h-full max-h-full aspect-[3/4.15] w-auto max-w-full mx-auto',
      outerPadding: 'pt-[3.5px] pb-[3.5px] pl-[3px] pr-[5.5px]',
      bannerHeight: 'h-[12.2%] min-h-[22px]',
      logoHeight: 'h-[65%]',
      bannerPadding: 'px-2.5 sm:px-3',
      roundedOuter: 'rounded-lg sm:rounded-xl',
      roundedInner: 'rounded-[5px] sm:rounded-[7px]',
    },
    lg: {
      wrapper: 'h-full max-h-full aspect-[3/4.15] w-auto max-w-full mx-auto',
      outerPadding: 'pt-[4.5px] pb-[4.5px] pl-[4px] pr-[7px]',
      bannerHeight: 'h-[12.2%] min-h-[26px]',
      logoHeight: 'h-[65%]',
      bannerPadding: 'px-3 sm:px-4',
      roundedOuter: 'rounded-xl sm:rounded-2xl',
      roundedInner: 'rounded-[6px] sm:rounded-[8px]',
    },
    detail: {
      wrapper: 'h-full max-h-[460px] sm:max-h-[520px] aspect-[3/4.15] w-auto max-w-full mx-auto',
      outerPadding: 'pt-[6px] pb-[6px] pl-[5px] pr-[9px]',
      bannerHeight: 'h-[12.2%] min-h-[34px] sm:min-h-[40px]',
      logoHeight: 'h-[68%]',
      bannerPadding: 'px-4 sm:px-5',
      roundedOuter: 'rounded-xl sm:rounded-2xl',
      roundedInner: 'rounded-[8px] sm:rounded-[10px]',
    },
  }[size];

  // Case Casing Colors (Translucent Blue Polycarbonate for PS5/PS4, Emerald for Xbox)
  const caseBorderColor = isXbox
    ? 'bg-gradient-to-r from-[#107c10] via-[#16a34a] to-[#0d5c0d] border-[#22c55e]/70 shadow-[0_12px_28px_-6px_rgba(16,124,16,0.35)]'
    : isPS4
    ? 'bg-gradient-to-r from-[#003791] via-[#0050d8] to-[#00286b] border-[#3b82f6]/70 shadow-[0_12px_28px_-6px_rgba(0,55,145,0.4)]'
    : 'bg-gradient-to-r from-[#035fe6] via-[#086ff7] to-[#0142b3] border-[#60a5fa]/60 shadow-[0_14px_32px_-6px_rgba(3,95,230,0.4),0_4px_10px_rgba(0,0,0,0.18)]';

  // Banner Background Colors
  const bannerClasses = isXbox
    ? 'bg-white text-gray-900 border-b border-gray-300'
    : isPS4
    ? 'bg-[#003791] text-white border-b border-[#00286b]'
    : 'bg-white text-black border-b border-[#cfd4dc]';

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${sizeStyles.wrapper} ${className}`}
      style={{ filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.18))' }}
    >
      {/* Outer Polycarbonate Physical Case */}
      <div
        className={`relative w-full h-full flex flex-col ${sizeStyles.outerPadding} ${sizeStyles.roundedOuter} ${caseBorderColor} border transition-transform duration-300 group-hover:scale-[1.02]`}
      >
        {/* Physical Case Top Plastic Gleam */}
        <div className="absolute top-0 inset-x-2 h-[2px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none rounded-full" />
        
        {/* Right Opening Spine Latch Notch (Exact physical Blu-ray Amaray case indentation) */}
        <div className="absolute top-[28%] right-[1px] w-[2.5px] h-7 sm:h-9 bg-white/40 rounded-full pointer-events-none" />

        {/* Paper Inlay Insert (Sitting inside the translucent plastic sleeve) */}
        <div
          className={`relative w-full h-full flex flex-col overflow-hidden bg-white ${sizeStyles.roundedInner} shadow-inner`}
        >
          {/* 1. Header Banner (The official PS5 / PS4 / Xbox top ribbon) */}
          <div
            className={`w-full ${sizeStyles.bannerHeight} ${bannerClasses} flex items-center justify-start ${sizeStyles.bannerPadding} shrink-0 z-10 transition-colors`}
          >
            {isXbox ? (
              <OfficialXboxLogo className={sizeStyles.logoHeight} />
            ) : isPS4 ? (
              <div className="flex items-center h-full w-full">
                <OfficialPS4Logo className={`${sizeStyles.logoHeight} max-w-[55%] text-white`} />
              </div>
            ) : (
              // Official Sony PlayStation 5 Logo & Wordmark
              <div className="flex items-center h-full w-full">
                <OfficialPS5Logo className={`${sizeStyles.logoHeight} max-w-[55%] text-black`} />
              </div>
            )}
          </div>

          {/* 2. Artwork Poster Area (Where the game image seamlessly fits) */}
          <div className="relative flex-1 w-full bg-slate-900 overflow-hidden">
            {imageUrl && !hasError ? (
              <img
                src={imageUrl}
                alt={name}
                loading="lazy"
                referrerPolicy="no-referrer"
                onLoad={() => setImageLoaded(true)}
                onError={() => setHasError(true)}
                className={`w-full h-full object-cover object-top transition-all duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center text-white/80">
                <OfficialPS5Logo className="h-6 w-auto text-white/40 mb-1" />
                <span className="text-[10px] sm:text-xs font-semibold line-clamp-2 px-1">{name}</span>
              </div>
            )}

            {/* Cellophane Physical Case Glare Overlay */}
            {showGlare && (
              <>
                {/* Diagonal plastic gloss reflection */}
                <div
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"
                  style={{ mixBlendMode: 'screen' }}
                />
                {/* Left spine shadow reflection */}
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
                {/* Right edge reflection */}
                <div className="absolute top-0 bottom-0 right-0 w-1 bg-gradient-to-l from-white/20 to-transparent pointer-events-none" />
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
