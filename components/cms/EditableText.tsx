"use client";

import React, { useState, useEffect, useRef } from "react";
import { useCms } from "./CmsProvider";

interface EditableTextProps {
  pageId: string;
  path: string;
  value: string;
  as?: "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  isTextArea?: boolean;
  className?: string;
}

export function EditableText({
  pageId,
  path,
  value,
  as: Component = "span",
  isTextArea = false,
  className = "",
}: EditableTextProps) {
  const { isEditMode, updateField } = useCms();
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const [prevValue, setPrevValue] = useState(value);
  if (value !== prevValue) {
    setLocalValue(value);
    setPrevValue(value);
  }

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      // Move cursor to end of text
      if (inputRef.current instanceof HTMLInputElement || inputRef.current instanceof HTMLTextAreaElement) {
        inputRef.current.selectionStart = inputRef.current.value.length;
        inputRef.current.selectionEnd = inputRef.current.value.length;
      }
    }
  }, [isEditing]);

  const handleBlur = () => {
    setIsEditing(false);
    if (localValue !== value) {
      updateField(pageId, path, localValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isTextArea && !e.shiftKey) {
      e.preventDefault();
      inputRef.current?.blur();
    }
    if (e.key === "Escape") {
      setLocalValue(value); // reset
      setIsEditing(false);
    }
  };

  if (!isEditMode) {
    return <Component className={className}>{localValue || value}</Component>;
  }

  if (isEditing) {
    const inputClasses = `w-full bg-mint-50/50 border border-mint-400 rounded px-2 py-1 text-inherit font-inherit leading-inherit focus:outline-none focus:ring-2 focus:ring-mint-500 focus:border-transparent ${className}`;

    return isTextArea ? (
      <textarea
        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={inputClasses}
        rows={Math.max(3, localValue.split("\n").length)}
      />
    ) : (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={inputClasses}
      />
    );
  }

  return (
    <Component
      ref={containerRef}
      onClick={() => setIsEditing(true)}
      className={`group relative cursor-pointer rounded border border-dashed border-transparent hover:border-mint-500 hover:bg-mint-50/20 px-1 -mx-1 transition-all duration-150 ${className}`}
      title="Click to edit text"
    >
      {localValue || <span className="text-gray-400 italic">Empty text</span>}
      <span className="absolute -top-6 right-2 hidden rounded bg-mint-600 px-1.5 py-0.5 text-[10px] font-bold text-white shadow group-hover:block z-50">
        Click to edit
      </span>
    </Component>
  );
}
