import type { PdfId } from "@/lib/pdf-control";

export type ControlOption = {
  id: string;
  pdfId: PdfId;
  label: string;
  shortName: string;
  tagline: string;
  controlKind: "pages" | "video";
};

export const controlOptions: ControlOption[] = [
  {
    id: "bhrt",
    pdfId: "pdf-1",
    label: "01 - BHRT",
    shortName: "01 - BHRT",
    tagline: "BHRT. Lasting impact.",
    controlKind: "pages",
  },
  {
    id: "use-case",
    pdfId: "pdf-2",
    label: "USE CASE",
    shortName: "USE CASE",
    tagline: "Use case. Lasting impact.",
    controlKind: "pages",
  },
  {
    id: "what-lies-inside",
    pdfId: "pdf-3",
    label: "What lies inside",
    shortName: "What lies inside",
    tagline: "What lies inside. Lasting impact.",
    controlKind: "pages",
  },
];
