export const mediaDocuments = [
  {
    id: "pdf-1",
    kind: "images",
    images: [
      "/BHRT/Untitled design.png",
    ],
  },
  {
    id: "pdf-2",
    kind: "images",
    images: [
      "/USE CASE/10.png",
      "/USE CASE/11.png",
      "/USE CASE/12.png",
      "/USE CASE/13.png",
      "/USE CASE/14.png",
      "/USE CASE/15.png",
      "/USE CASE/16.png",
    ],
  },
  {
    id: "pdf-3",
    kind: "images",
    images: [
      "/what lies inside/20.png",
      "/what lies inside/21.png",
      "/what lies inside/22.png",
      "/what lies inside/23.png",
      "/what lies inside/24.png",
      "/what lies inside/25.png",
      "/what lies inside/26.png",
    ],
  },
] as const;

export type PdfId = (typeof mediaDocuments)[number]["id"];
export type PdfDirection = "previous" | "next";

export type PdfPageState = {
  page: number;
  totalPages: number | null;
  updatedAt: number;
};

export type PdfControlState = Record<PdfId, PdfPageState>;

export type PdfRemoteState = {
  activePdfId: PdfId | null;
  videoPlaying: boolean;
  documents: PdfControlState;
};

export function isPdfId(value: unknown): value is PdfId {
  return mediaDocuments.some((document) => document.id === value);
}

export function isPdfDirection(value: unknown): value is PdfDirection {
  return value === "previous" || value === "next";
}
