import type { ContactLink } from "../types";
import { Icon } from "./Icon";

type ContactListProps = Readonly<{
  contacts: ContactLink[];
}>;

export function ContactList({ contacts }: ContactListProps) {
  return (
    <address
      className="relative z-10 grid gap-[10px] not-italic sm:grid-cols-2 sm:gap-[12px] lg:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] lg:gap-[14px]"
      aria-label="Contact details"
    >
      {contacts.map((contact) => {
        const isExternal = contact.href?.startsWith("http");

        return (
          <div
            className="flex min-h-12 min-w-0 items-center gap-[10px] rounded-lg border border-[rgba(148,163,184,0.16)] bg-[rgba(255,255,255,0.035)] px-[13px] py-3 sm:px-[14px]"
            key={contact.label}
          >
            <Icon graphic={contact.icon} />
            {contact.href ? (
              <a
                aria-label={`${contact.label}: ${contact.value}`}
                className="block min-w-0 [overflow-wrap:anywhere] text-[0.94rem] text-[#eef2f5] no-underline hover:text-white lg:text-[0.86rem] print:no-underline"
                href={contact.href}
                rel={isExternal ? "noreferrer" : undefined}
                target={isExternal ? "_blank" : undefined}
              >
                {contact.value}
              </a>
            ) : (
              <span
                aria-label={`${contact.label}: ${contact.value}`}
                className="block min-w-0 [overflow-wrap:anywhere] text-[0.94rem] text-[#eef2f5] lg:text-[0.86rem]"
              >
                {contact.value}
              </span>
            )}
          </div>
        );
      })}
    </address>
  );
}
