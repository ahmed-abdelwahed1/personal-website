import React from 'react';

type CredlyBadgesProps = {
  badgeIds: string[];
  iframeWidth?: number;
  iframeHeight?: number;
  host?: string; // e.g. https://www.credly.com
  className?: string;
};

export const CredlyBadges: React.FC<CredlyBadgesProps> = ({
  badgeIds,
  iframeWidth = 150,
  iframeHeight = 270,
  host = 'https://www.credly.com',
  className,
}) => {
  const normalizedHost = host.replace(/\/+$/, '');
  const aspectPercent = (iframeHeight / iframeWidth) * 100;

  return (
    <div
      className={[
        'grid grid-cols-2 gap-4 place-items-center',
        'sm:grid-cols-[repeat(auto-fit,minmax(160px,1fr))] sm:justify-items-center',
        className ?? '',
      ].join(' ')}
    >
      {badgeIds.map((id) => (
        <div
          key={id}
          className="w-full max-w-[140px] sm:max-w-none flex justify-center"
        >
          <div className="w-full max-w-[140px] sm:max-w-[176px] group overflow-hidden rounded-2xl border border-slate-200/70 bg-white/60 p-2 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft dark:border-slate-800/70 dark:bg-slate-950/20">
            <div
              className="relative w-full overflow-hidden rounded-xl"
              style={{ paddingBottom: `${aspectPercent}%` }}
            >
              <iframe
                name={`credly-badge-${id}`}
                frameBorder={0}
                scrolling="no"
                loading="lazy"
                src={`${normalizedHost}/embedded_badge/${id}`}
                title="View my verified achievement on Credly."
                className="absolute inset-0 left-0 top-0 h-full w-full dark:invert dark:hue-rotate-180"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

