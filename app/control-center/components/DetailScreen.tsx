import type { PdfDirection } from "@/lib/pdf-control";
import type { ControlOption } from "../control-options";
import styles from "../control-center.module.css";

type DetailScreenProps = {
  option: ControlOption;
  currentPage: number;
  totalPages: number;
  isSending: boolean;
  status: string;
  onNavigate: (direction: PdfDirection) => void;
  onPlayback: (playback: "play" | "pause") => void;
  onBack: () => void;
};

export function DetailScreen({
  option,
  currentPage,
  totalPages,
  isSending,
  status,
  onNavigate,
  onPlayback,
  onBack,
}: DetailScreenProps) {
  return (
    <section className={styles.detail} aria-labelledby="detail-title">
      <button
        type="button"
        className={styles.backButton}
        disabled={isSending}
        onClick={onBack}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: 16, height: 16 }}
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        <span>Back to Hub</span>
      </button>

      <div className={styles.remoteBody}>
        <div className={styles.detailContent}>
          <div className={styles.screenIndicator}>
            <h1 id="detail-title" className={styles.screenTitle}>
              {option.label}
            </h1>
            <p className={styles.screenSubtitle}>{option.tagline}</p>
          </div>

          {totalPages > 0 && (
            <div className={styles.progressWrapper}>
              <div className={styles.progressHeader}>
                <span className={styles.progressLabel}>Active Slide</span>
                <span className={styles.progressCount}>
                  {currentPage} of {totalPages}
                </span>
              </div>
              <div className={styles.progressBarTrack}>
                <div
                  className={styles.progressBarFill}
                  style={{
                    width: `${Math.min(100, Math.max(0, (currentPage / totalPages) * 100))}%`,
                  }}
                />
              </div>
            </div>
          )}

          {option.controlKind === "video" ? (
            <div className={styles.pdfControls} aria-label="Video playback">
              <button
                type="button"
                className={styles.playButton}
                aria-label="Play video"
                disabled={isSending}
                onClick={() => onPlayback("play")}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className={styles.playbackIcon}
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <button
                type="button"
                className={styles.navButtonPrev}
                aria-label="Pause video"
                disabled={isSending}
                onClick={() => onPlayback("pause")}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className={styles.playbackIcon}
                  fill="currentColor"
                >
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              </button>
            </div>
          ) : (
            <div className={styles.pdfControls} aria-label="Content navigation">
              <button
                type="button"
                className={styles.navButtonPrev}
                aria-label="Previous item"
                disabled={isSending || currentPage <= 1}
                onClick={() => onNavigate("previous")}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className={styles.chevron}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                className={styles.navButtonNext}
                aria-label="Next item"
                disabled={isSending || currentPage >= totalPages}
                onClick={() => onNavigate("next")}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className={styles.chevron}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          )}

          <p
            className={`${styles.commandStatus} ${status ? styles.commandStatusActive : ""}`}
            aria-live="polite"
          >
            {status || "Ready"}
          </p>
        </div>
      </div>
    </section>
  );
}
