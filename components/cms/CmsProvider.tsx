/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

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
  journalPosts: any[];
  loadJournalPosts: () => Promise<void>;
  createJournalPost: (post: any) => Promise<any>;
  updateJournalPost: (slug: string, post: any) => Promise<boolean>;
  deleteJournalPost: (slug: string) => Promise<boolean>;
  teamMembers: any[];
  loadTeamMembers: () => Promise<void>;
  updateTeamMember: (slug: string, member: any) => Promise<boolean>;
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
  const [journalPosts, setJournalPosts] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  // Pages requested by getContentValue during render, flushed from an effect
  // below so the resulting fetch + setState never lands mid-render.
  const pendingPageLoadsRef = useRef<Set<string>>(new Set());
  const loadingPagesRef = useRef<Set<string>>(new Set());

  const loadJournalPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/cms/journal");
      if (res.ok) {
        const data = await res.json();
        if (data.posts) {
          setJournalPosts(data.posts);
        }
      }
    } catch (err) {
      console.error("Failed to load journal posts:", err);
    }
  }, []);

  const createJournalPost = useCallback(async (post: any) => {
    try {
      const res = await fetch("/api/cms/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.post) {
          setJournalPosts((prev) => [...prev, data.post]);
          return data.post;
        }
      }
    } catch (err) {
      console.error("Failed to create journal post:", err);
    }
    return null;
  }, []);

  const updateJournalPost = useCallback(async (slug: string, updatedFields: any) => {
    try {
      const res = await fetch("/api/cms/journal", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, ...updatedFields }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setJournalPosts((prev) =>
            prev.map((p) => (p.slug === slug ? { ...p, ...updatedFields } : p))
          );
          return true;
        }
      }
    } catch (err) {
      console.error("Failed to update journal post:", err);
    }
    return false;
  }, []);

  const deleteJournalPost = useCallback(async (slug: string) => {
    try {
      const res = await fetch(`/api/cms/journal?slug=${slug}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setJournalPosts((prev) => prev.filter((p) => p.slug !== slug));
          return true;
        }
      }
    } catch (err) {
      console.error("Failed to delete journal post:", err);
    }
    return false;
  }, []);

  const loadTeamMembers = useCallback(async () => {
    try {
      const res = await fetch("/api/cms/team");
      if (res.ok) {
        const data = await res.json();
        if (data.members) {
          setTeamMembers(data.members);
        }
      }
    } catch (err) {
      console.error("Failed to load team members:", err);
    }
  }, []);

  const updateTeamMember = useCallback(async (slug: string, updatedFields: any) => {
    try {
      const res = await fetch("/api/cms/team", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, ...updatedFields }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setTeamMembers((prev) =>
            prev.map((m) => (m.slug === slug ? { ...m, ...updatedFields } : m))
          );
          return true;
        }
      }
    } catch (err) {
      console.error("Failed to update team member:", err);
    }
    return false;
  }, []);

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

  const loadPageContent = useCallback(async (pageId: string) => {
    // Client-only: the server has no origin to resolve this relative URL
    // against (Node's fetch, unlike the browser's, requires an absolute URL),
    // and there's nothing to preview server-side anyway.
    if (typeof window === "undefined") return;
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
  }, [originalContents]);

  // Flushes pages queued by getContentValue during render. Running this from
  // an effect (rather than a microtask fired mid-render) means the fetch's
  // eventual setState always lands after the component has mounted.
  useEffect(() => {
    if (pendingPageLoadsRef.current.size === 0) return;
    const toLoad = Array.from(pendingPageLoadsRef.current);
    pendingPageLoadsRef.current.clear();
    toLoad.forEach((pageId) => {
      if (loadingPagesRef.current.has(pageId)) return;
      loadingPagesRef.current.add(pageId);
      loadPageContent(pageId).finally(() => {
        loadingPagesRef.current.delete(pageId);
      });
    });
  });

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
      // Queue the page (a ref mutation, not a state update — safe during
      // render) and let the effect above flush it. Loading from an effect
      // instead of synchronously/via microtask means the fetch's eventual
      // setState always lands after the component has mounted.
      if (typeof window !== "undefined" && !loadingPagesRef.current.has(pageId)) {
        pendingPageLoadsRef.current.add(pageId);
      }
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
        journalPosts,
        loadJournalPosts,
        createJournalPost,
        updateJournalPost,
        deleteJournalPost,
        teamMembers,
        loadTeamMembers,
        updateTeamMember,
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
