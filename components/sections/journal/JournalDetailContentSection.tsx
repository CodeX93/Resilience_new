"use client";

import { useState } from "react";
import Image from "next/image";
import { useCms } from "@/components/cms/CmsProvider";
import { EditableText } from "@/components/cms/EditableText";
import { EditableImage } from "@/components/cms/EditableImage";
import offerLeafLeft from "@/public/images/decor/offer-leaf-left.svg";
import heroBranch from "@/public/images/decor/hero-branch.svg";

import { ContentBlock, JournalPost } from "@/lib/models/journal-post";

// Pure/impure utility defined outside component to avoid react-hooks/purity warnings
function generateBlockId(): string {
  return "b-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6);
}

interface DetailContentProps {
  post: JournalPost;
  setPost: (val: JournalPost) => void;
}

export function JournalDetailContentSection({ post, setPost }: DetailContentProps) {
  const { isEditMode, updateJournalPost } = useCms();
  const [activeInsertIdx, setActiveInsertIdx] = useState<number | null>(null);

  const blocks: ContentBlock[] = post.blocks || [];

  const handleBlockChange = async (blockId: string, value: string, alt?: string) => {
    const newBlocks = blocks.map((b) =>
      b.id === blockId ? { ...b, value, ...(alt !== undefined ? { alt } : {}) } : b
    );
    const updatedPost = { ...post, blocks: newBlocks } as JournalPost;
    setPost(updatedPost);
    await updateJournalPost(post.slug, { blocks: newBlocks });
  };

  const handleMoveUp = async (idx: number) => {
    if (idx === 0) return;
    const newBlocks = [...blocks];
    const temp = newBlocks[idx];
    newBlocks[idx] = newBlocks[idx - 1];
    newBlocks[idx - 1] = temp;

    const updatedPost = { ...post, blocks: newBlocks } as JournalPost;
    setPost(updatedPost);
    await updateJournalPost(post.slug, { blocks: newBlocks });
  };

  const handleMoveDown = async (idx: number) => {
    if (idx === blocks.length - 1) return;
    const newBlocks = [...blocks];
    const temp = newBlocks[idx];
    newBlocks[idx] = newBlocks[idx + 1];
    newBlocks[idx + 1] = temp;

    const updatedPost = { ...post, blocks: newBlocks } as JournalPost;
    setPost(updatedPost);
    await updateJournalPost(post.slug, { blocks: newBlocks });
  };

  const handleDeleteBlock = async (blockId: string) => {
    const newBlocks = blocks.filter((b) => b.id !== blockId);
    const updatedPost = { ...post, blocks: newBlocks } as JournalPost;
    setPost(updatedPost);
    await updateJournalPost(post.slug, { blocks: newBlocks });
  };

  const handleAddBlock = async (
    type: "paragraph" | "header" | "quote" | "image" | "bullet",
    insertIndex: number
  ) => {
    const newBlock: ContentBlock = {
      id: generateBlockId(),
      type,
      value:
        type === "image"
          ? "/images/home/journal-featured.jpg"
          : type === "header"
          ? "Heading Title"
          : type === "quote"
          ? "Quote content here..."
          : type === "bullet"
          ? "Bullet item list text"
          : "Paragraph body text...",
      ...(type === "image" ? { alt: "Image Description" } : {}),
    };

    const newBlocks = [...blocks];
    newBlocks.splice(insertIndex, 0, newBlock);

    const updatedPost = { ...post, blocks: newBlocks };
    setPost(updatedPost);
    await updateJournalPost(post.slug, { blocks: newBlocks });
    setActiveInsertIdx(null);
  };

  const renderBlock = (block: ContentBlock, idx: number) => {
    switch (block.type) {
      case "header":
        return (
          <h2 className="font-heading text-h2 text-green-950 w-full">
            {isEditMode ? (
              <EditableText
                pageId={`journal-${post.slug}`}
                path={`blocks[${idx}].value`}
                value={block.value}
                onChange={(val) => handleBlockChange(block.id, val)}
              />
            ) : (
              block.value
            )}
          </h2>
        );
      case "quote":
        return (
          <div className="rounded-3xl border border-camel-400/80 bg-gradient-to-br from-[#ffffff] to-[#faf6f0] p-8 sm:p-10 text-center shadow-ds2 w-full">
            <blockquote className="font-quote text-quote text-green-950 italic w-full">
              &ldquo;
              {isEditMode ? (
                <EditableText
                  pageId={`journal-${post.slug}`}
                  path={`blocks[${idx}].value`}
                  value={block.value}
                  isTextArea
                  onChange={(val) => handleBlockChange(block.id, val)}
                />
              ) : (
                block.value
              )}
              &rdquo;
            </blockquote>
          </div>
        );
      case "image":
        return (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-camel-400/70 bg-[#ede8df] shadow-ds2">
            {isEditMode ? (
              <EditableImage
                pageId={`journal-${post.slug}`}
                path={`blocks[${idx}].value`}
                src={block.value}
                alt={block.alt || "Article Image"}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                onSave={async (src, alt) => {
                  await handleBlockChange(block.id, src, alt);
                }}
              />
            ) : (
              <Image
                src={block.value}
                alt={block.alt || "Article Image"}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            )}
          </div>
        );
      case "bullet":
        return (
          <div className="flex items-center gap-3 font-body font-bold text-body-lg text-green-950 w-full">
            <span className="text-green-700">✦</span>
            <span className="w-full">
              {isEditMode ? (
                <EditableText
                  pageId={`journal-${post.slug}`}
                  path={`blocks[${idx}].value`}
                  value={block.value}
                  onChange={(val) => handleBlockChange(block.id, val)}
                />
              ) : (
                block.value
              )}
            </span>
          </div>
        );
      default: // paragraph
        return (
          <p className="text-body-base text-green-700/90 leading-relaxed font-body w-full">
            {isEditMode ? (
              <EditableText
                pageId={`journal-${post.slug}`}
                path={`blocks[${idx}].value`}
                value={block.value}
                isTextArea
                onChange={(val) => handleBlockChange(block.id, val)}
              />
            ) : (
              block.value
            )}
          </p>
        );
    }
  };

  // Helper to render inline block insertion triggers
  const renderInsertBar = (insertIndex: number) => {
    if (!isEditMode) return null;
    const isAdding = activeInsertIdx === insertIndex;

    return (
      <div className="my-3 flex flex-col items-center justify-center group/insert py-1">
        {isAdding ? (
          <div className="flex flex-wrap items-center justify-center gap-2 rounded-xl bg-white border border-green-200 p-2 shadow-ds2 animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => handleAddBlock("paragraph", insertIndex)}
              className="px-3 py-1.5 text-xs font-semibold text-green-950 rounded-lg hover:bg-green-50 transition"
            >
              📝 Text
            </button>
            <button
              onClick={() => handleAddBlock("header", insertIndex)}
              className="px-3 py-1.5 text-xs font-semibold text-green-950 rounded-lg hover:bg-green-50 transition"
            >
              🏷️ Heading
            </button>
            <button
              onClick={() => handleAddBlock("quote", insertIndex)}
              className="px-3 py-1.5 text-xs font-semibold text-green-950 rounded-lg hover:bg-green-50 transition"
            >
              💬 Quote
            </button>
            <button
              onClick={() => handleAddBlock("image", insertIndex)}
              className="px-3 py-1.5 text-xs font-semibold text-green-950 rounded-lg hover:bg-green-50 transition"
            >
              🖼️ Image
            </button>
            <button
              onClick={() => handleAddBlock("bullet", insertIndex)}
              className="px-3 py-1.5 text-xs font-semibold text-green-950 rounded-lg hover:bg-green-50 transition"
            >
              ✦ List Item
            </button>
            <span className="h-4 w-px bg-green-200 mx-1" />
            <button
              onClick={() => setActiveInsertIdx(null)}
              className="text-xs font-bold text-red-600 px-2 py-1 rounded hover:bg-red-50 transition"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setActiveInsertIdx(insertIndex)}
            className="opacity-0 group-hover/insert:opacity-100 flex items-center justify-center w-full relative h-6 transition-all"
          >
            <div className="absolute inset-x-0 h-px bg-dashed border-t border-green-700/30" />
            <span className="relative z-10 bg-[#faf2ef] px-3 text-[10px] font-bold text-green-700 hover:text-green-950 border border-green-700/20 rounded-full transition shadow-sm">
              + Insert block
            </span>
          </button>
        )}
      </div>
    );
  };

  return (
    <section className="relative overflow-hidden bg-[#faf2ef] py-12 lg:py-20">
      {/* Decorative leaf branch left */}
      <Image
        src={offerLeafLeft}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-0 top-24 z-0 hidden w-[180px] opacity-70 lg:block"
      />

      {/* Decorative leaf branch right */}
      <Image
        src={heroBranch}
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-0 top-[550px] z-0 hidden w-[220px] opacity-65 lg:block"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 sm:px-10">
        {/* Dynamic blocks rendering */}
        <div className="flex flex-col gap-4">
          {renderInsertBar(0)}
          
          {blocks.map((block, idx) => (
            <div key={block.id} className="relative group/block w-full">
              {/* Block Action Controls Overlay (Top Right of block) */}
              {isEditMode && (
                <div className="absolute -top-3.5 right-2 opacity-0 group-hover/block:opacity-100 flex items-center gap-1.5 rounded-lg border border-green-200 bg-white p-1 shadow-ds2 transition-opacity z-20">
                  <button
                    disabled={idx === 0}
                    onClick={() => handleMoveUp(idx)}
                    className="flex size-6 items-center justify-center rounded text-green-800 hover:bg-green-50 transition disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move block up"
                  >
                    ↑
                  </button>
                  <button
                    disabled={idx === blocks.length - 1}
                    onClick={() => handleMoveDown(idx)}
                    className="flex size-6 items-center justify-center rounded text-green-800 hover:bg-green-50 transition disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move block down"
                  >
                    ↓
                  </button>
                  <button
                    onClick={() => handleDeleteBlock(block.id)}
                    className="flex size-6 items-center justify-center rounded text-red-600 hover:bg-red-50 transition"
                    title="Delete block"
                  >
                    🗑️
                  </button>
                </div>
              )}

              {/* Render the actual block content */}
              <div className={isEditMode ? "p-1.5 border border-dashed border-transparent hover:border-green-200/50 rounded-xl transition-all" : ""}>
                {renderBlock(block, idx)}
              </div>

              {renderInsertBar(idx + 1)}
            </div>
          ))}

          {isEditMode && blocks.length === 0 && (
            <div className="text-center p-8 rounded-2xl border border-dashed border-camel-400 bg-white/40">
              <p className="text-green-800 font-semibold mb-2">This article has no content blocks.</p>
              <button
                onClick={() => setActiveInsertIdx(0)}
                className="rounded-lg bg-green-800 hover:bg-green-900 text-white px-4 py-2 text-xs font-semibold shadow transition"
              >
                Add Content Block
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
