import shellStyles from "../styles/resume-shell.module.css";
import visualStyles from "../styles/resume-visuals.module.css";

export function OutSystemsBadge() {
  return (
    <aside
      className={shellStyles.expertBadge}
      aria-label="OutSystems certification"
    >
      <div className={shellStyles.osLine}>
        <span className={visualStyles.osMark} aria-hidden="true" />
        <span className={shellStyles.osName}>outsystems</span>
      </div>
      <p className={shellStyles.expertTitle}>EXPERT</p>
      <p className={shellStyles.expertRole}>EXPERT DEVELOPER</p>
      <p className={shellStyles.stars} aria-label="Three star certification">
        <span aria-hidden="true">&#9733; &#9733; &#9733;</span>
      </p>
      <p className={shellStyles.certSmall}>
        OutSystems Certified
        <br />
        Expert Developer
      </p>
    </aside>
  );
}
