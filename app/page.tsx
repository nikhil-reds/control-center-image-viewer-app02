import Link from "next/link";
import styles from "./home.module.css";

export default function Home() {
  return (
    <main className={styles.homePage}>
      <header className={styles.header}>
        <span className={styles.brandName}>Rubenius System</span>
        <h1 className={styles.title}>
          Welcome to Rubenius
          <span>Screen Control Center</span>
        </h1>
        <p className={styles.description}>
          Orchestrate and broadcast high-fidelity multi-screen sequence presentations from any device. Select an interface below to get started.
        </p>
      </header>

      <div className={styles.portalGrid}>
        <Link href="/control-center" className={styles.portalCard}>
          <div style={{ width: "100%" }}>
            <div className={styles.portalIcon}>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: 28, height: 28 }}
              >
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <circle cx="12" cy="17" r="1.5" />
                <path d="M12 5v7" />
                <path d="M9 8h6" />
              </svg>
            </div>
            <div className={styles.portalContent}>
              <h2 className={styles.portalTitle}>System Controller</h2>
              <p className={styles.portalDescription}>
                Launch the interactive remote control dashboard. Designed for tablets or mobile devices to navigate slide decks and video sequences.
              </p>
            </div>
          </div>
          <div className={`${styles.portalButton} ${styles.btnPrimary}`}>
            <span>Launch Controller</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
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
        </Link>

        <Link href="/preview" className={styles.portalCard}>
          <div style={{ width: "100%" }}>
            <div className={styles.portalIcon}>
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: 28, height: 28 }}
              >
                <rect x="2" y="4" width="20" height="12" rx="2" />
                <path d="M12 16v5" />
                <path d="M8 21h8" />
              </svg>
            </div>
            <div className={styles.portalContent}>
              <h2 className={styles.portalTitle}>Preview Display Wall</h2>
              <p className={styles.portalDescription}>
                Launch the high-resolution projection screen. Best suited for projection walls, TVs, or secondary monitors to display live sequences.
              </p>
            </div>
          </div>
          <div className={`${styles.portalButton} ${styles.btnSecondary}`}>
            <span>Launch Display</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
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
        </Link>
      </div>

      <footer className={styles.systemFooter}>
        Rubenius Engine v2.0 // Live Control Network
      </footer>
    </main>
  );
}
