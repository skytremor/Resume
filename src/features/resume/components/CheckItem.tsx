import {
  resumeCheckItemClass,
  resumeCheckMarkClass,
} from "../styles";

type CheckItemProps = Readonly<{
  children: React.ReactNode;
}>;

export function CheckItem({ children }: CheckItemProps) {
  return (
    <li className={resumeCheckItemClass}>
      <span className={resumeCheckMarkClass} aria-hidden="true">
        &#10003;
      </span>
      <span>{children}</span>
    </li>
  );
}
