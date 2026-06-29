import type { ContactLink } from "../types";
import { Icon } from "./Icon";
import shellStyles from "../styles/resume-shell.module.css";

type ContactListProps = Readonly<{
  contacts: ContactLink[];
}>;

export function ContactList({ contacts }: ContactListProps) {
  return (
    <address className={shellStyles.contact} aria-label="Contact details">
      {contacts.map((contact) => {
        const isExternal = contact.href?.startsWith("http");

        return (
          <div className={shellStyles.contactItem} key={contact.label}>
            <Icon name={contact.icon} />
            {contact.href ? (
              <a
                aria-label={`${contact.label}: ${contact.value}`}
                className={shellStyles.contactValue}
                href={contact.href}
                rel={isExternal ? "noreferrer" : undefined}
                target={isExternal ? "_blank" : undefined}
              >
                {contact.value}
              </a>
            ) : (
              <span
                aria-label={`${contact.label}: ${contact.value}`}
                className={shellStyles.contactValue}
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
