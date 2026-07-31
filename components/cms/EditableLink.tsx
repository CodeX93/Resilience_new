"use client";

import React, { useState } from "react";
import { useCms } from "./CmsProvider";

interface EditableLinkProps {
  pageId: string;
  path: string;
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}

export function EditableLink({
  pageId,
  path,
  href,
  children,
  className = "",
  target,
  rel,
  "aria-label": ariaLabel,
}: EditableLinkProps) {
  const { isEditMode, updateField } = useCms();
  const [isOpen, setIsOpen] = useState(false);
  const [tempHref, setTempHref] = useState(href);

  const [prevHref, setPrevHref] = useState(href);
  if (href !== prevHref) {
    setTempHref(href);
    setPrevHref(href);
  }

  const handleSave = () => {
    updateField(pageId, path, tempHref);
    setIsOpen(false);
  };

  if (!isEditMode) {
    return (
      <a href={href} className={className} target={target} rel={rel} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`group relative cursor-pointer rounded border border-dashed border-transparent hover:border-mint-500 hover:bg-mint-50/20 transition-all duration-150 ${className}`}
        aria-label={ariaLabel || "Edit link URL"}
      >
        {children}
        <span className="absolute -top-6 left-1/2 -translate-x-1/2 hidden rounded bg-mint-600 px-1.5 py-0.5 text-[8px] font-bold text-white shadow group-hover:block z-50 whitespace-nowrap">
          Edit Link
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-[9999]" onClick={() => setIsOpen(false)}>
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-heading text-lg font-bold text-green-950 mb-4">Edit Redirect Link</h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-green-800 mb-1">Redirect URL</label>
                <input
                  type="text"
                  value={tempHref}
                  onChange={(e) => setTempHref(e.target.value)}
                  className="w-full rounded-lg border border-green-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-mint-500"
                  placeholder="https://example.com"
                />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="rounded-lg bg-green-800 px-4 py-2 text-sm font-semibold text-white hover:bg-green-900 transition-colors"
                >
                  Save Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
