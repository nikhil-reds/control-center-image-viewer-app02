"use client";

import { useState, useEffect } from "react";
import { mediaDocuments } from "@/lib/pdf-control";
import type { PdfDirection } from "@/lib/pdf-control";
import type { ControlOption } from "../control-options";
import styles from "../control-center.module.css";
import { ControlCard } from "./ControlCard";
import { DetailScreen } from "./DetailScreen";

type ControlCenterProps = {
  options: ControlOption[];
};

export function ControlCenter({ options }: ControlCenterProps) {
  const [selectedOption, setSelectedOption] = useState<ControlOption | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("");

  // Sync state from server on option change and periodically while active
  useEffect(() => {
    if (!selectedOption) return;

    const pdfId = selectedOption.pdfId;
    let active = true;

    async function syncState() {
      try {
        const response = await fetch("/api/pdf-control", { cache: "no-store" });
        if (!response.ok) throw new Error("Sync failed");
        
        const data = await response.json();
        if (active && data.documents?.[pdfId]) {
          setCurrentPage(data.documents[pdfId].page);
        }
      } catch {
        // Silently ignore sync failures in background
      }
    }

    // Run immediately on select
    void syncState();

    // Poll state every 1 second
    const interval = setInterval(syncState, 1000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [selectedOption]);

  async function selectOption(option: ControlOption) {
    if (isSending) return;

    setIsSending(true);
    setStatus("Connecting…");

    try {
      const response = await fetch("/api/pdf-control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "activate", pdfId: option.pdfId }),
      });

      if (!response.ok) throw new Error("Activation failed");
      
      const data = await response.json();
      const initialPage = data.documents?.[option.pdfId]?.page ?? 1;
      
      setCurrentPage(initialPage);
      setSelectedOption(option);
      setStatus("");
    } catch {
      setStatus("Unable to open preview");
    } finally {
      setIsSending(false);
    }
  }

  async function sendCommand(direction: PdfDirection) {
    if (!selectedOption || isSending) return;

    setIsSending(true);
    setStatus("Sending…");

    try {
      const response = await fetch("/api/pdf-control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "navigate",
          pdfId: selectedOption.pdfId,
          direction,
        }),
      });

      if (!response.ok) throw new Error("Command failed");
      
      const data = await response.json();
      if (data.document) {
        setCurrentPage(data.document.page);
      }
      
      setStatus("");
    } catch {
      setStatus("Unable to reach preview");
    } finally {
      setIsSending(false);
    }
  }

  async function closePreview() {
    if (isSending) return;

    setIsSending(true);
    setStatus("Disconnecting…");

    try {
      const response = await fetch("/api/pdf-control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "clear" }),
      });

      if (!response.ok) throw new Error("Clear failed");
      setSelectedOption(null);
      setStatus("");
    } catch {
      setStatus("Unable to close preview");
    } finally {
      setIsSending(false);
    }
  }

  async function sendPlayback(playback: "play" | "pause") {
    if (!selectedOption || isSending) return;

    setIsSending(true);
    setStatus(playback === "play" ? "Playing…" : "Pausing…");

    try {
      const response = await fetch("/api/pdf-control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "playback", playback }),
      });

      if (!response.ok) throw new Error("Playback command failed");
      setStatus(playback === "play" ? "Video playing" : "Video paused");
    } catch {
      setStatus("Unable to control video");
    } finally {
      setIsSending(false);
    }
  }

  const activeDoc = selectedOption
    ? mediaDocuments.find((d) => d.id === selectedOption.pdfId)
    : null;
  const totalPages = activeDoc?.kind === "images" ? activeDoc.images.length : 0;

  return (
    <main className={styles.page}>
      {!selectedOption && (
        <header className={styles.header}>
          <h1 className={styles.headerTitle}>RUBENIUS SCREEN CONTROL</h1>
          <p className={styles.headerSubtitle}>
            Select a sequence below to broadcast and control on the main presentation display.
          </p>
          <div className={styles.statusBadge}>
            <span className={styles.statusDot} />
            <span>Live Sync Connected</span>
          </div>
        </header>
      )}

      {selectedOption ? (
        <DetailScreen
          option={selectedOption}
          currentPage={currentPage}
          totalPages={totalPages}
          isSending={isSending}
          status={status}
          onNavigate={sendCommand}
          onPlayback={sendPlayback}
          onBack={closePreview}
        />
      ) : (
        <section className={styles.controls} aria-label="Treatment options">
          {options.map((option, index) => (
            <ControlCard
              key={option.id}
              option={option}
              index={index}
              onSelect={() => void selectOption(option)}
            />
          ))}
          {status ? (
            <p className={styles.selectionStatus} aria-live="polite">
              {status}
            </p>
          ) : null}
        </section>
      )}
    </main>
  );
}
