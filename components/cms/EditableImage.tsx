/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCms } from "./CmsProvider";

interface EditableImageProps {
  pageId: string;
  path: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
}

export function EditableImage({
  pageId,
  path,
  src,
  alt,
  width,
  height,
  fill,
  sizes,
  className = "",
  priority = false,
}: EditableImageProps) {
  const { isEditMode, updateField } = useCms();
  const [isOpen, setIsOpen] = useState(false);
  const [tempSrc, setTempSrc] = useState(src);
  const [tempAlt, setTempAlt] = useState(alt);
  const [tab, setTab] = useState<"upload" | "url">("upload");
  const [uploading, setUploading] = useState(false);

  const [prevSrc, setPrevSrc] = useState(src);
  const [prevAlt, setPrevAlt] = useState(alt);
  if (src !== prevSrc || alt !== prevAlt) {
    setTempSrc(src);
    setTempAlt(alt);
    setPrevSrc(src);
    setPrevAlt(alt);
  }

  const handleSave = () => {
    updateField(pageId, path, tempSrc);
    updateField(pageId, `${path}Alt`, tempAlt);
    setIsOpen(false);
  };

  const imageProps: any = { src, alt, className };
  if (width !== undefined) imageProps.width = width;
  if (height !== undefined) imageProps.height = height;
  if (fill !== undefined) imageProps.fill = fill;
  if (sizes !== undefined) imageProps.sizes = sizes;
  if (priority) imageProps.priority = true;

  const wrapperClass = fill
    ? "group relative w-full h-full cursor-pointer overflow-hidden rounded border-2 border-transparent hover:border-mint-500 transition-all duration-150"
    : `group relative inline-block cursor-pointer overflow-hidden rounded border-2 border-transparent hover:border-mint-500 transition-all duration-150 ${className}`;

  if (!isEditMode) {
    return <Image {...imageProps} alt={alt} />;
  }

  return (
    <div className={wrapperClass}>
      {/* Renders the actual image */}
      <Image {...imageProps} alt={alt} className={`${className} group-hover:opacity-75`} />

      {/* Edit overlay */}
      <div
        onClick={() => setIsOpen(true)}
        className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-30"
      >
        <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-green-950 shadow-md">
          Change Image
        </span>
      </div>

      {/* Custom Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-[9999]" onClick={() => setIsOpen(false)}>
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-heading text-lg font-bold text-green-950 mb-2">Edit Image Asset</h3>

            <div className="flex border-b border-green-100 mb-4">
              <button
                type="button"
                onClick={() => setTab("upload")}
                className={`flex-1 pb-2 text-sm font-semibold text-center focus:outline-none transition-colors border-b-2 ${
                  tab === "upload" ? "border-green-800 text-green-800" : "border-transparent text-green-600 hover:text-green-800"
                }`}
              >
                Upload File
              </button>
              <button
                type="button"
                onClick={() => setTab("url")}
                className={`flex-1 pb-2 text-sm font-semibold text-center focus:outline-none transition-colors border-b-2 ${
                  tab === "url" ? "border-green-800 text-green-800" : "border-transparent text-green-600 hover:text-green-800"
                }`}
              >
                Image URL
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {tab === "upload" ? (
                <div>
                  <label className="block text-xs font-semibold text-green-800 mb-1">Select File</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setUploading(true);
                      const formData = new FormData();
                      formData.append("file", file);

                      try {
                        const res = await fetch("/api/cms/upload", {
                          method: "POST",
                          body: formData,
                        });
                        const data = await res.json();
                        if (data.success && data.url) {
                          setTempSrc(data.url);
                        } else {
                          alert(data.error || "Upload failed");
                        }
                      } catch {
                        alert("Network upload failed");
                      } finally {
                        setUploading(false);
                      }
                    }}
                    className="w-full text-sm text-green-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  />
                  {uploading && <span className="text-xs text-green-600 mt-1 block">Uploading...</span>}
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-green-800 mb-1">Image URL / Path</label>
                  <input
                    type="text"
                    value={tempSrc}
                    onChange={(e) => setTempSrc(e.target.value)}
                    className="w-full rounded-lg border border-green-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-mint-500"
                    placeholder="/images/example.jpg"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-green-800 mb-1">Alt Text</label>
                <input
                  type="text"
                  value={tempAlt}
                  onChange={(e) => setTempAlt(e.target.value)}
                  className="w-full rounded-lg border border-green-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-mint-500"
                  placeholder="Describe this image..."
                />
              </div>

              {tempSrc && (
                <div className="mt-2">
                  <span className="block text-xs font-semibold text-green-800 mb-1">Preview</span>
                  <div className="relative h-32 w-full overflow-hidden rounded-lg bg-gray-100 border border-green-100 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={tempSrc} alt={tempAlt} className="max-h-full max-w-full object-contain" />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">
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
                  disabled={uploading}
                  className="rounded-lg bg-green-800 px-4 py-2 text-sm font-semibold text-white hover:bg-green-900 transition-colors disabled:opacity-50"
                >
                  Apply Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
