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

  return (
    <div
      className={[
        'grid gap-4 justify-items-center',
        'grid-cols-[repeat(auto-fit,minmax(160px,1fr))]',
        className ?? '',
      ].join(' ')}
    >
      {badgeIds.map((id) => (
        <div
          key={id}
          className="group w-full overflow-hidden rounded-2xl border border-slate-200/70 bg-white/60 p-2 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft dark:border-slate-800/70 dark:bg-slate-950/20"
          style={{ maxWidth: `${iframeWidth + 16}px` }}
        >
          <iframe
            name={`credly-badge-${id}`}
            frameBorder={0}
            scrolling="no"
            loading="lazy"
            src={`${normalizedHost}/embedded_badge/${id}`}
            style={{ width: `${iframeWidth}px`, height: `${iframeHeight}px` }}
            title="View my verified achievement on Credly."
            className="mx-auto block"
          />
        </div>
      ))}
    </div>
  );
};

