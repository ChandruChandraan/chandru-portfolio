import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type DocType = "resume" | "cv";

type DocumentModalContextType = {
  isOpen: boolean;
  activeDoc: DocType;
  openDoc: (doc?: DocType) => void;
  closeDoc: () => void;
  setActiveDoc: (doc: DocType) => void;
};

const DocumentModalContext = createContext<DocumentModalContextType | undefined>(undefined);

export function DocumentModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDoc, setActiveDoc] = useState<DocType>("resume");

  const openDoc = (doc: DocType = "resume") => {
    setActiveDoc(doc);
    setIsOpen(true);
  };

  const closeDoc = () => {
    setIsOpen(false);
    if (window.location.hash === "#resume" || window.location.hash === "#cv" || window.location.hash === "#preview-resume" || window.location.hash === "#preview-cv") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  };

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === "#resume" || hash === "#preview-resume") {
        setActiveDoc("resume");
        setIsOpen(true);
      } else if (hash === "#cv" || hash === "#preview-cv") {
        setActiveDoc("cv");
        setIsOpen(true);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <DocumentModalContext.Provider value={{ isOpen, activeDoc, openDoc, closeDoc, setActiveDoc }}>
      {children}
    </DocumentModalContext.Provider>
  );
}

export function useDocumentModal() {
  const ctx = useContext(DocumentModalContext);
  if (!ctx) {
    throw new Error("useDocumentModal must be used within a DocumentModalProvider");
  }
  return ctx;
}
