/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface CmsContextType {
  isAdmin: boolean;
  isEditMode: boolean;
  setEditMode: (val: boolean) => void;
  drafts: Record<string, any>;
  hasChanges: Record<string, boolean>;
  updateField: (pageId: string, path: string, value: any) => void;
  saveChanges: (pageId: string) => Promise<boolean>;
  discardChanges: (pageId: string) => void;
  loadPageContent: (pageId: string) => Promise<void>;
  getContentValue: (pageId: string, path: string, fallbackValue: any) => any;
  login: (password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

// Helper to get nested value from object by dot-notation path
function getNestedValue(obj: any, path: string): any {
  if (!obj) return undefined;
  if (!path) return obj;
  const parts = path.split(".");
  let current = obj;
  for (const part of parts) {
    if (current === null || current === undefined) return undefined;
    // Handle array indexes e.g., categories[0]
    if (part.includes("[") && part.includes("]")) {
      const arrayName = part.split("[")[0];
      const index = parseInt(part.split("[")[1].split("]")[0], 10);
      current = current[arrayName];
      if (Array.isArray(current)) {
        current = current[index];
      } else {
        return undefined;
      }
    } else {
      current = current[part];
    }
  }
  return current;
}

// Helper to set nested value in object by dot-notation path returning a new object
function setNestedValue(obj: any, path: string, value: any): any {
  const newObj = JSON.parse(JSON.stringify(obj));
  const parts = path.split(".");
  let current = newObj;

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (part.includes("[") && part.includes("]")) {
      const arrayName = part.split("[")[0];
      const index = parseInt(part.split("[")[1].split("]")[0], 10);
      if (!current[arrayName]) current[arrayName] = [];
      if (!current[arrayName][index]) current[arrayName][index] = {};
      current = current[arrayName][index];
    } else {
      if (!current[part]) current[part] = {};
      current = current[part];
    }
  }

  const lastPart = parts[parts.length - 1];
  if (lastPart.includes("[") && lastPart.includes("]")) {
    const arrayName = lastPart.split("[")[0];
    const index = parseInt(lastPart.split("[")[1].split("]")[0], 10);
    if (!current[arrayName]) current[arrayName] = [];
    current[arrayName][index] = value;
  } else {
    current[lastPart] = value;
  }

  return newObj;
}

export function CmsProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [originalContents, setOriginalContents] = useState<Record<string, any>>({});
  const [drafts, setDrafts] = useState<Record<string, any>>({});
  const [hasChanges, setHasChanges] = useState<Record<string, boolean>>({});

  // Check auth on mount
  useEffect(() => {
    fetch("/api/cms/auth")
      .then((res) => res.json())
      .then((data) => {
        setIsAdmin(data.authenticated);
      })
      .catch((err) => console.error("Error checking auth status:", err));
  }, []);

  const login = async (password: string) => {
    try {
      const res = await fetch("/api/cms/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAdmin(true);
        setEditMode(true);
        return { success: true };
      }
      return { success: false, error: data.error || "Authentication failed" };
    } catch {
      return { success: false, error: "Network error" };
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/cms/auth", { method: "DELETE" }); // logout is DELETE on auth
    } catch (err) {
      console.error(err);
    }
    setIsAdmin(false);
    setEditMode(false);
    // Clear drafts
    setDrafts({});
    setHasChanges({});
  };

  const loadPageContent = async (pageId: string) => {
    if (originalContents[pageId]) return; // Already loaded

    try {
      const res = await fetch(`/api/cms/content?pageId=${pageId}`);
      if (res.ok) {
        const data = await res.json();
        if (data.content) {
          setOriginalContents((prev) => ({ ...prev, [pageId]: data.content }));
          setDrafts((prev) => ({ ...prev, [pageId]: data.content }));
        }
      }
    } catch (err) {
      console.error(`Failed to load page content for ${pageId}:`, err);
    }
  };

  const updateField = (pageId: string, path: string, value: any) => {
    setDrafts((prev) => {
      const currentDraft = prev[pageId] || {};
      const updatedDraft = setNestedValue(currentDraft, path, value);
      
      setHasChanges((prevHas) => ({
        ...prevHas,
        [pageId]: true, // For simplicity, mark the page as dirty
      }));

      return {
        ...prev,
        [pageId]: updatedDraft,
      };
    });
  };

  const saveChanges = async (pageId: string) => {
    const draft = drafts[pageId];
    if (!draft) return false;

    try {
      const res = await fetch("/api/cms/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageId, content: draft }),
      });

      if (res.ok) {
        setOriginalContents((prev) => ({ ...prev, [pageId]: draft }));
        setHasChanges((prev) => ({ ...prev, [pageId]: false }));
        return true;
      }
      return false;
    } catch (err) {
      console.error(`Failed to save changes for ${pageId}:`, err);
      return false;
    }
  };

  const discardChanges = (pageId: string) => {
    const original = originalContents[pageId];
    if (original) {
      setDrafts((prev) => ({ ...prev, [pageId]: original }));
      setHasChanges((prev) => ({ ...prev, [pageId]: false }));
    }
  };

  const getContentValue = (pageId: string, path: string, fallbackValue: any) => {
    const draft = drafts[pageId];
    if (!draft) {
      // If content hasn't been loaded from API yet, start loading it asynchronously
      loadPageContent(pageId);
      return fallbackValue;
    }
    const val = getNestedValue(draft, path);
    return val !== undefined ? val : fallbackValue;
  };

  return (
    <CmsContext.Provider
      value={{
        isAdmin,
        isEditMode,
        setEditMode,
        drafts,
        hasChanges,
        updateField,
        saveChanges,
        discardChanges,
        loadPageContent,
        getContentValue,
        login,
        logout,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
}

export function useCms() {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error("useCms must be used within a CmsProvider");
  }
  return context;
}
