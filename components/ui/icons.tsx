/**
 * Inline, themeable line icons (stroke = currentColor) matching the
 * icon set used in the Figma design. Sized via width/height props.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 20, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ClockIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Svg>
);

export const MapPinIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21s7-5.686 7-11a7 7 0 1 0-14 0c0 5.314 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </Svg>
);

export const PhoneIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6.5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4.5 6a2 2 0 0 1 2-2Z" />
  </Svg>
);

export const MailIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 6.5 8.5 6 8.5-6" />
  </Svg>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </Svg>
);

export const ArrowUpRightIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </Svg>
);

export const ChevronLeftIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m15 6-6 6 6 6" />
  </Svg>
);

export const ChevronRightIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m9 6 6 6-6 6" />
  </Svg>
);

export const ChevronDownIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m6 9 6 6 6-6" />
  </Svg>
);

export const UsersIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0" />
    <path d="M16 5.2a3 3 0 0 1 0 5.6" />
    <path d="M17.5 19.5a5.5 5.5 0 0 0-2.3-4.4" />
  </Svg>
);

export const FamilyIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="7" cy="6.5" r="2.4" />
    <circle cx="17" cy="6.5" r="2.4" />
    <path d="M3 19v-3a4 4 0 0 1 8 0v3" />
    <path d="M13 19v-3a4 4 0 0 1 8 0v3" />
    <circle cx="12" cy="14" r="1.8" />
    <path d="M9.5 21v-1.5a2.5 2.5 0 0 1 5 0V21" />
  </Svg>
);

export const HandsIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 4v5" />
    <path d="M9.5 6 12 4l2.5 2" />
    <path d="M3 12c1.5-1.5 3.5-1.5 5 0l2 2" />
    <path d="M21 12c-1.5-1.5-3.5-1.5-5 0l-2 2" />
    <path d="M4 12c-.5 3 1 6 4 7.5 1.2.6 2.8.6 4 0 3-1.5 4.5-4.5 4-7.5" />
  </Svg>
);

export const CheckIcon = (p: IconProps) => (
  <Svg {...p}>
    <polyline points="20 6 9 17 4 12" />
  </Svg>
);

export const FileTextIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </Svg>
);

export const UserCheckIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <polyline points="17 11 19 13 23 9" />
  </Svg>
);

export const AwardIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </Svg>
);

export const UserIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </Svg>
);

/* ---- Social (filled, currentColor) ------------------------------------- */

function SolidSvg({ size = 20, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const FacebookIcon = (p: IconProps) => (
  <SolidSvg {...p}>
    <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.9.3-1.5 1.6-1.5H17V4.3C16.6 4.2 15.6 4 14.4 4 12 4 10.5 5.4 10.5 8v2.5H8v3h2.5V21h3Z" />
  </SolidSvg>
);

export const InstagramIcon = (p: IconProps) => (
  <SolidSvg {...p}>
    <path d="M12 2c2.7 0 3 0 4.1.1 1.1 0 1.8.2 2.4.5.7.2 1.2.6 1.7 1.1s.8 1 1.1 1.7c.2.6.4 1.3.5 2.4C22 8.9 22 9.3 22 12s0 3-.1 4.1c0 1.1-.2 1.8-.5 2.4-.2.7-.6 1.2-1.1 1.7s-1 .8-1.7 1.1c-.6.2-1.3.4-2.4.5-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-1.1 0-1.8-.2-2.4-.5-.7-.2-1.2-.6-1.7-1.1s-.8-1-1.1-1.7c-.2-.6-.4-1.3-.5-2.4C2 15 2 14.7 2 12s0-3 .1-4.1c0-1.1.2-1.8.5-2.4.2-.7.6-1.2 1.1-1.7S4.7 2.9 5.4 2.6c.6-.2 1.3-.4 2.4-.5C9 2 9.3 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5.2-8.4a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z" />
  </SolidSvg>
);

export const LinkedinIcon = (p: IconProps) => (
  <SolidSvg {...p}>
    <path d="M6.9 8.5H3.6V21h3.3V8.5ZM5.25 3a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM20.4 21v-6.9c0-3.4-1.8-5-4.2-5-1.9 0-2.8 1.1-3.2 1.8V8.5H9.7c0 .9 0 12.5 0 12.5H13v-7c0-.3 0-.6.1-.8.3-.6.8-1.3 1.8-1.3 1.3 0 1.8 1 1.8 2.4V21h3.7Z" />
  </SolidSvg>
);

export const YoutubeIcon = (p: IconProps) => (
  <SolidSvg {...p}>
    <path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.7-1.7C19.4 5.2 12 5.2 12 5.2s-7.4 0-8.9.4A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.7 1.7c1.5.4 8.9.4 8.9.4s7.4 0 8.9-.4a2.5 2.5 0 0 0 1.7-1.7c.4-1.5.4-4.7.4-4.7Zm-13 3V9l5.2 3-5.2 3Z" />
  </SolidSvg>
);
