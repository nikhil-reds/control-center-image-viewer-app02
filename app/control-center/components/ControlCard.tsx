import type { ControlOption } from "../control-options";
import styles from "../control-center.module.css";

type ControlCardProps = {
  option: ControlOption;
  index: number;
  onSelect: () => void;
};

function getCardIcon(id: string) {
  switch (id) {
    case "bhrt":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.arrow}
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      );
    case "use-case":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.arrow}
        >
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      );
    case "what-lies-inside":
    default:
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.arrow}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <path d="M12 17h.01" />
        </svg>
      );
  }
}

export function ControlCard({ option, index, onSelect }: ControlCardProps) {
  const displayNum = String(index + 1).padStart(2, "0");

  return (
    <button type="button" className={styles.control} onClick={onSelect}>
      <div className={styles.controlHeader}>
        <span className={styles.controlNumber}>{displayNum}</span>
        <div className={styles.controlIcon}>
          {getCardIcon(option.id)}
        </div>
      </div>
      <div className={styles.controlBody}>
        <span className={styles.controlLabel}>{option.label}</span>
        <p className={styles.controlTagline}>{option.tagline}</p>
      </div>
      <div className={styles.controlFooter}>
        <span>Control Screen</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={styles.arrow}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}
