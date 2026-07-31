"use client";

import React, { useState } from "react";
import { useCms } from "./CmsProvider";

export function CmsActionBar() {
  const {
    isAdmin,
    isEditMode,
    setEditMode,
    hasChanges,
    saveChanges,
    discardChanges,
    logout,
  } = useCms();
  const [isSaving, setIsSaving] = useState(false);

  // Check if any page has unsaved changes
  const activePageIds = Object.keys(hasChanges).filter((id) => hasChanges[id]);
  const dirty = activePageIds.length > 0;

  const handleSaveAll = async () => {
    setIsSaving(true);
    for (const pageId of activePageIds) {
      await saveChanges(pageId);
    }
    setIsSaving(false);
  };

  const handleDiscardAll = () => {
    if (confirm("Discard all unsaved edits?")) {
      for (const pageId of activePageIds) {
        discardChanges(pageId);
      }
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-[999] w-[90%] max-w-4xl -translate-x-1/2 rounded-2xl border border-mint-200/50 bg-[#faf2ef]/85 px-6 py-4 shadow-xl backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
      {/* Brand & Status */}
      <div className="flex items-center gap-3">
        <span className="flex size-3.5 items-center justify-center rounded-full bg-mint-500 animate-pulse" />
        <div>
          <h4 className="text-xs font-bold tracking-wide uppercase text-green-950">Resilience CMS</h4>
          <p className="text-[10px] text-green-700">
            {isEditMode ? "Edit Mode Active" : "Previewing Site"}
          </p>
        </div>
      </div>

      {/* Mode Toggle Switch */}
      <div className="flex items-center gap-3 bg-white/60 rounded-full px-4 py-1.5 border border-mint-100/50">
        <span className="text-xs font-semibold text-green-800">Preview</span>
        <button
          type="button"
          onClick={() => setEditMode(!isEditMode)}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            isEditMode ? "bg-mint-600" : "bg-gray-300"
          }`}
        >
          <span
            className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              isEditMode ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
        <span className="text-xs font-semibold text-green-950">Visual Editor</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {dirty && (
          <>
            <button
              type="button"
              onClick={handleDiscardAll}
              className="rounded-lg border border-transparent px-3 py-1.5 text-xs font-semibold text-green-700 hover:bg-green-100/50 transition-colors"
            >
              Discard
            </button>
            <button
              type="button"
              disabled={isSaving}
              onClick={handleSaveAll}
              className="rounded-lg bg-green-800 px-4 py-1.5 text-xs font-semibold text-white hover:bg-green-900 shadow-md transition-colors disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </>
        )}
        <button
          type="button"
          onClick={logout}
          className="rounded-lg border border-green-200 bg-white/40 px-3 py-1.5 text-xs font-semibold text-green-800 hover:bg-white/80 transition-colors"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
