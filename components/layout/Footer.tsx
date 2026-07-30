import Link from "next/link";
import Image from "next/image";
import {
  socialLinks,
  footerContact,
  legalLinks,
  copyright,
  type SocialPlatform,
} from "@/data/navigation";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "@/components/ui/icons";
import footerLogo from "@/public/images/brand/logo-footer.png";

const socialIcon: Record<SocialPlatform, typeof FacebookIcon> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  youtube: YoutubeIcon,
};

/** Small accent bar shown before a footer column heading. */
function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-end gap-3">
      <span className="mb-1 block h-5 w-px bg-white/60" aria-hidden />
      <h2 className="text-body-sm-bold text-white">{children}</h2>
    </div>
  );
}

/**
 * Site footer — rendered ONCE from app/layout.tsx.
 * Source: Figma Home Footer (1724:3434).
 */
export function Footer() {
  return (
    <footer className="bg-green-700 text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-14 sm:px-10 lg:px-20 lg:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[305px_1fr_1fr] lg:gap-16">
          {/* Brand + social card */}
          <div className="flex flex-col gap-10 rounded-[20px] bg-white-5 p-5">
            <Link href="/" aria-label="Resilience Counselling — home">
              <Image
                src={footerLogo}
                alt="Resilience Counselling"
                width={163}
                height={133}
                className="h-auto w-[130px]"
              />
            </Link>
            <ul className="flex items-center gap-4">
              {socialLinks.map((s) => {
                const Icon = socialIcon[s.platform];
                return (
                  <li key={s.platform}>
                    <Link
                      href={s.href}
                      aria-label={s.label}
                      className="flex h-[30px] w-[30px] items-center justify-center text-white transition-opacity hover:opacity-80"
                    >
                      <Icon size={28} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Location & Timing */}
          <div>
            <ColumnHeading>Location &amp; Timing</ColumnHeading>
            <dl className="mt-8 flex flex-col gap-7 text-body-sm">
              <div className="flex flex-col gap-1">
                <dt className="text-body-sm-bold text-white">Office Hours:</dt>
                <dd className="text-white-60">{footerContact.officeHours}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-body-sm-bold text-white">Address:</dt>
                <dd className="max-w-[272px] text-white-60">
                  {footerContact.address}
                </dd>
              </div>
            </dl>
          </div>

          {/* Contact */}
          <div>
            <ColumnHeading>Contact</ColumnHeading>
            <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-7 text-body-sm">
              <div className="flex flex-col gap-1">
                <dt className="text-body-sm-bold text-white">Email:</dt>
                <dd>
                  <a href={footerContact.emailHref} className="text-white-60 hover:text-white">
                    {footerContact.email}
                  </a>
                </dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-body-sm-bold text-white">Phone:</dt>
                <dd>
                  <a href={footerContact.phoneHref} className="text-white-60 hover:text-white">
                    {footerContact.phone}
                  </a>
                </dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-body-sm-bold text-white">Cell:</dt>
                <dd>
                  <a href={footerContact.cellHref} className="text-white-60 hover:text-white">
                    {footerContact.cell}
                  </a>
                </dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-body-sm-bold text-white">Fax:</dt>
                <dd className="text-white-60">{footerContact.fax}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-white-20 pt-6">
          <div className="flex flex-col gap-4 text-body-sm text-white-60 sm:flex-row sm:items-center sm:justify-between">
            <p>{copyright}</p>
            <ul className="flex items-center gap-5">
              {legalLinks.map((link, i) => (
                <li key={link.href} className="flex items-center gap-5">
                  {i > 0 && (
                    <span className="h-1 w-1 rounded-full bg-white-60" aria-hidden />
                  )}
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
