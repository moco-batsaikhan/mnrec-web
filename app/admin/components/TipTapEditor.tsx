"use client";

import { useEditor, EditorContent, ReactNodeViewRenderer } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import { useEffect } from 'react';
import ResizableImageNode from './ResizableImageNode';

interface TipTapEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

export default function TipTapEditor({
  value,
  onChange,
  placeholder = "Энд бичнэ үү...",
  readOnly = false
}: TipTapEditorProps) {
  
  const editor = useEditor({
    immediatelyRender: false, // Fix SSR hydration mismatch
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4]
        },
        // Disable link from StarterKit since we're using custom Link extension
        link: false,
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
      Image.extend({
        addNodeView() {
          return ReactNodeViewRenderer(ResizableImageNode);
        },
        addAttributes() {
          return {
            ...this.parent?.(),
            width: {
              default: null,
              parseHTML: element => element.getAttribute('width'),
              renderHTML: attributes => {
                if (!attributes.width) {
                  return {};
                }
                return { width: attributes.width };
              },
            },
            height: {
              default: null,
              parseHTML: element => element.getAttribute('height'),
              renderHTML: attributes => {
                if (!attributes.height) {
                  return {};
                }
                return { height: attributes.height };
              },
            },
          };
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'tiptap-table',
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({
        placeholder: placeholder,
      }),
    ],
    content: value,
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  // Update editor content when value prop changes externally
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  // Update editable state when readOnly prop changes
  useEffect(() => {
    if (editor) {
      editor.setEditable(!readOnly);
    }
  }, [readOnly, editor]);

  if (!editor) {
    return (
      <div className="p-4 text-center text-gray-600">
        Editor ачааллаж байна...
      </div>
    );
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL оруулна уу:', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const addImage = () => {
    // Create a file input element
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        alert('Зөвхөн зураг файл ашиглана уу (JPG, PNG, WebP, GIF)');
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Зургийн хэмжээ 5MB-аас хэтэрч болохгүй');
        return;
      }

      // Show loading message
      const loadingMessage = '⏳ Зураг ачаалж байна...';
      alert(loadingMessage);

      try {
        // Upload to API
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch('/api/upload/image', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Зураг ачаалахад алдаа гарлаа');
        }

        // Insert image without asking for size - user can resize visually
        editor.chain().focus().setImage({ src: data.url }).run();
        
        alert('✅ Зураг амжилттай ачаалагдлаа. Зургийн булан дээр чирж хэмжээг өөрчилнө үү.');

      } catch (error) {
        console.error('Image upload error:', error);
        alert(error instanceof Error ? error.message : 'Зураг ачаалахад алдаа гарлаа');
      }
    };

    // Trigger file selection
    input.click();
  };

  return (
    <div className="tiptap-editor-wrapper border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      {!readOnly && (
        <div className="toolbar flex flex-wrap gap-1 p-2 bg-gray-50 border-b border-gray-300">
          {/* Text Formatting */}
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`px-3 py-1.5 text-sm font-medium rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('bold') ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700'
            }`}
            type="button"
            title="Bold (Ctrl+B)"
          >
            <strong>B</strong>
          </button>
          
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`px-3 py-1.5 text-sm font-medium rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('italic') ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700'
            }`}
            type="button"
            title="Italic (Ctrl+I)"
          >
            <em>I</em>
          </button>
          
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`px-3 py-1.5 text-sm font-medium rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('strike') ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700'
            }`}
            type="button"
            title="Strikethrough"
          >
            <s>S</s>
          </button>
          
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`px-3 py-1.5 text-sm font-medium rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('underline') ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700'
            }`}
            type="button"
            title="Underline (Ctrl+U)"
          >
            <u>U</u>
          </button>

          <div className="w-px h-8 bg-gray-300 mx-1"></div>

          {/* Headings */}
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`px-3 py-1.5 text-sm font-medium rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('heading', { level: 1 }) ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700'
            }`}
            type="button"
            title="Heading 1"
          >
            H1
          </button>
          
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`px-3 py-1.5 text-sm font-medium rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('heading', { level: 2 }) ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700'
            }`}
            type="button"
            title="Heading 2"
          >
            H2
          </button>
          
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`px-3 py-1.5 text-sm font-medium rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('heading', { level: 3 }) ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700'
            }`}
            type="button"
            title="Heading 3"
          >
            H3
          </button>

          <div className="w-px h-8 bg-gray-300 mx-1"></div>

          {/* Lists */}
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`px-3 py-1.5 text-sm font-medium rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('bulletList') ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700'
            }`}
            type="button"
            title="Bullet List"
          >
            • List
          </button>
          
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`px-3 py-1.5 text-sm font-medium rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('orderedList') ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700'
            }`}
            type="button"
            title="Numbered List"
          >
            1. List
          </button>

          <div className="w-px h-8 bg-gray-300 mx-1"></div>

          {/* Quote & Code */}
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`px-3 py-1.5 text-sm font-medium rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('blockquote') ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700'
            }`}
            type="button"
            title="Blockquote"
          >
            &quot;
          </button>
          
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`px-3 py-1.5 text-sm font-medium rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('codeBlock') ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700'
            }`}
            type="button"
            title="Code Block"
          >
            {'</>'}
          </button>

          <div className="w-px h-8 bg-gray-300 mx-1"></div>

          {/* Text Alignment */}
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`px-3 py-1.5 text-sm font-medium rounded hover:bg-gray-200 transition-colors ${
              editor.isActive({ textAlign: 'left' }) ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700'
            }`}
            type="button"
            title="Align Left"
          >
            ⬅️
          </button>
          
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`px-3 py-1.5 text-sm font-medium rounded hover:bg-gray-200 transition-colors ${
              editor.isActive({ textAlign: 'center' }) ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700'
            }`}
            type="button"
            title="Align Center"
          >
            ↔️
          </button>
          
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`px-3 py-1.5 text-sm font-medium rounded hover:bg-gray-200 transition-colors ${
              editor.isActive({ textAlign: 'right' }) ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700'
            }`}
            type="button"
            title="Align Right"
          >
            ➡️
          </button>
          
          <button
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`px-3 py-1.5 text-sm font-medium rounded hover:bg-gray-200 transition-colors ${
              editor.isActive({ textAlign: 'justify' }) ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700'
            }`}
            type="button"
            title="Justify"
          >
            ⬌
          </button>

          <div className="w-px h-8 bg-gray-300 mx-1"></div>

          {/* Table */}
          <button
            onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
            className="px-3 py-1.5 text-sm font-medium rounded bg-white text-gray-700 hover:bg-gray-200 transition-colors"
            type="button"
            title="Insert Table (3x3)"
          >
            📊
          </button>
          
          {editor.isActive('table') && (
            <>
              <button
                onClick={() => editor.chain().focus().addColumnBefore().run()}
                className="px-2 py-1.5 text-xs font-medium rounded bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                type="button"
                title="Add Column Before"
              >
                ← Col
              </button>
              
              <button
                onClick={() => editor.chain().focus().addColumnAfter().run()}
                className="px-2 py-1.5 text-xs font-medium rounded bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                type="button"
                title="Add Column After"
              >
                Col →
              </button>
              
              <button
                onClick={() => editor.chain().focus().deleteColumn().run()}
                className="px-2 py-1.5 text-xs font-medium rounded bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                type="button"
                title="Delete Column"
              >
                ❌ Col
              </button>
              
              <button
                onClick={() => editor.chain().focus().addRowBefore().run()}
                className="px-2 py-1.5 text-xs font-medium rounded bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                type="button"
                title="Add Row Before"
              >
                ↑ Row
              </button>
              
              <button
                onClick={() => editor.chain().focus().addRowAfter().run()}
                className="px-2 py-1.5 text-xs font-medium rounded bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                type="button"
                title="Add Row After"
              >
                ↓ Row
              </button>
              
              <button
                onClick={() => editor.chain().focus().deleteRow().run()}
                className="px-2 py-1.5 text-xs font-medium rounded bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                type="button"
                title="Delete Row"
              >
                ❌ Row
              </button>
              
              <button
                onClick={() => editor.chain().focus().deleteTable().run()}
                className="px-2 py-1.5 text-xs font-medium rounded bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                type="button"
                title="Delete Table"
              >
                ❌ Table
              </button>
              
              <button
                onClick={() => editor.chain().focus().mergeCells().run()}
                className="px-2 py-1.5 text-xs font-medium rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                type="button"
                title="Merge Cells"
                disabled={!editor.can().mergeCells()}
              >
                Merge
              </button>
              
              <button
                onClick={() => editor.chain().focus().splitCell().run()}
                className="px-2 py-1.5 text-xs font-medium rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                type="button"
                title="Split Cell"
                disabled={!editor.can().splitCell()}
              >
                Split
              </button>
            </>
          )}

          <div className="w-px h-8 bg-gray-300 mx-1"></div>

          {/* Link & Image */}
          <button
            onClick={setLink}
            className={`px-3 py-1.5 text-sm font-medium rounded hover:bg-gray-200 transition-colors ${
              editor.isActive('link') ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700'
            }`}
            type="button"
            title="Add Link"
          >
            🔗
          </button>
          
          <button
            onClick={addImage}
            className="px-3 py-1.5 text-sm font-medium rounded bg-white text-gray-700 hover:bg-gray-200 transition-colors"
            type="button"
            title="Add Image"
          >
            🖼️
          </button>

          {/* Image resize controls when image is selected */}
          {editor.isActive('image') && (
            <>
              <button
                onClick={() => {
                  const currentAttrs = editor.getAttributes('image');
                  const width = prompt('Зургийн өргөн (pixels):', currentAttrs.width || '');
                  if (width && !isNaN(Number(width))) {
                    editor.chain().focus().updateAttributes('image', { width: Number(width) }).run();
                  }
                }}
                className="px-2 py-1.5 text-xs font-medium rounded bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                type="button"
                title="Set Image Width"
              >
                ↔️ Өргөн
              </button>
              
              <button
                onClick={() => {
                  editor.chain().focus().updateAttributes('image', { width: null, height: null }).run();
                }}
                className="px-2 py-1.5 text-xs font-medium rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                type="button"
                title="Reset Image Size"
              >
                🔄 Анхны хэмжээ
              </button>
              
              <button
                onClick={() => {
                  editor.chain().focus().updateAttributes('image', { 
                    style: 'display: block; margin-left: 0; margin-right: auto;' 
                  }).run();
                }}
                className="px-2 py-1.5 text-xs font-medium rounded bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
                type="button"
                title="Align Left"
              >
                ⬅️
              </button>
              
              <button
                onClick={() => {
                  editor.chain().focus().updateAttributes('image', { 
                    style: 'display: block; margin-left: auto; margin-right: auto;' 
                  }).run();
                }}
                className="px-2 py-1.5 text-xs font-medium rounded bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
                type="button"
                title="Align Center"
              >
                ↔️
              </button>
              
              <button
                onClick={() => {
                  editor.chain().focus().updateAttributes('image', { 
                    style: 'display: block; margin-left: auto; margin-right: 0;' 
                  }).run();
                }}
                className="px-2 py-1.5 text-xs font-medium rounded bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
                type="button"
                title="Align Right"
              >
                ➡️
              </button>
            </>
          )}

          <div className="w-px h-8 bg-gray-300 mx-1"></div>

          {/* Undo & Redo */}
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="px-3 py-1.5 text-sm font-medium rounded bg-white text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
            title="Undo (Ctrl+Z)"
          >
            ↶
          </button>
          
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="px-3 py-1.5 text-sm font-medium rounded bg-white text-gray-700 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
            title="Redo (Ctrl+Y)"
          >
            ↷
          </button>

          <div className="w-px h-8 bg-gray-300 mx-1"></div>

          {/* Clear Formatting */}
          <button
            onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
            className="px-3 py-1.5 text-sm font-medium rounded bg-white text-gray-700 hover:bg-gray-200 transition-colors"
            type="button"
            title="Clear Formatting"
          >
            🧹
          </button>
        </div>
      )}

      {/* Editor Content */}
      <EditorContent editor={editor} className="tiptap-content" />

      {/* Global Styles */}
      <style jsx global>{`
        .tiptap-content {
          min-height: 400px;
          max-height: 600px;
          overflow-y: auto;
        }

        .tiptap-content .ProseMirror {
          padding: 20px;
          min-height: 400px;
          outline: none;
          font-family: 'Manrope', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 15px;
          line-height: 1.7;
          color: #1f2937;
        }

        .tiptap-content .ProseMirror:focus {
          outline: none;
        }

        /* Placeholder */
        .tiptap-content .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #9ca3af;
          pointer-events: none;
          height: 0;
        }

        /* Headings */
        .tiptap-content .ProseMirror h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.5em 0;
          line-height: 1.2;
        }

        .tiptap-content .ProseMirror h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.5em 0;
          line-height: 1.3;
        }

        .tiptap-content .ProseMirror h3 {
          font-size: 1.25em;
          font-weight: bold;
          margin: 0.5em 0;
          line-height: 1.4;
        }

        .tiptap-content .ProseMirror h4 {
          font-size: 1.1em;
          font-weight: bold;
          margin: 0.5em 0;
          line-height: 1.5;
        }

        /* Paragraphs */
        .tiptap-content .ProseMirror p {
          margin: 0.75em 0;
        }

        /* Lists */
        .tiptap-content .ProseMirror ul,
        .tiptap-content .ProseMirror ol {
          padding-left: 1.5em;
          margin: 0.75em 0;
        }

        .tiptap-content .ProseMirror ul li,
        .tiptap-content .ProseMirror ol li {
          margin: 0.25em 0;
        }

        /* Blockquote */
        .tiptap-content .ProseMirror blockquote {
          border-left: 4px solid #d1d5db;
          margin: 1em 0;
          padding-left: 1em;
          font-style: italic;
          color: #6b7280;
        }

        /* Code */
        .tiptap-content .ProseMirror code {
          background-color: #f3f4f6;
          padding: 0.2em 0.4em;
          border-radius: 3px;
          font-family: 'Manrope', monospace;
          font-size: 0.9em;
        }

        .tiptap-content .ProseMirror pre {
          background-color: #1f2937;
          color: #f9fafb;
          padding: 1em;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1em 0;
        }

        .tiptap-content .ProseMirror pre code {
          background-color: transparent;
          color: inherit;
          padding: 0;
        }

        /* Links */
        .tiptap-content .ProseMirror a {
          color: #3b82f6;
          text-decoration: underline;
          cursor: pointer;
        }

        .tiptap-content .ProseMirror a:hover {
          color: #2563eb;
        }

        /* Images */
        .tiptap-content .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1em 0;
          cursor: pointer;
        }

        /* Resizable image selected state */
        .tiptap-content .ProseMirror img.ProseMirror-selectednode {
          outline: 3px solid #3b82f6;
          outline-offset: 2px;
        }

        /* Image resize handles - 8 points: 4 corners + 4 edges */
        .ProseMirror .image-resizer {
          position: relative;
          display: inline-block;
        }

        .ProseMirror .image-resizer img {
          display: block;
          max-width: 100%;
          height: auto;
        }

        .ProseMirror .image-resizer .resize-handle {
          position: absolute;
          width: 12px;
          height: 12px;
          background: #3b82f6;
          border: 2px solid white;
          border-radius: 50%;
          z-index: 10;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        /* Corner handles - diagonal resize */
        .ProseMirror .image-resizer .resize-handle.top-left {
          top: -6px;
          left: -6px;
          cursor: nw-resize;
        }

        .ProseMirror .image-resizer .resize-handle.top-right {
          top: -6px;
          right: -6px;
          cursor: ne-resize;
        }

        .ProseMirror .image-resizer .resize-handle.bottom-left {
          bottom: -6px;
          left: -6px;
          cursor: sw-resize;
        }

        .ProseMirror .image-resizer .resize-handle.bottom-right {
          bottom: -6px;
          right: -6px;
          cursor: se-resize;
        }

        /* Edge handles - width/height only */
        .ProseMirror .image-resizer .resize-handle.top {
          top: -6px;
          left: 50%;
          transform: translateX(-50%);
          cursor: n-resize;
        }

        .ProseMirror .image-resizer .resize-handle.bottom {
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%);
          cursor: s-resize;
        }

        .ProseMirror .image-resizer .resize-handle.left {
          left: -6px;
          top: 50%;
          transform: translateY(-50%);
          cursor: w-resize;
        }

        .ProseMirror .image-resizer .resize-handle.right {
          right: -6px;
          top: 50%;
          transform: translateY(-50%);
          cursor: e-resize;
        }

        /* Horizontal Rule */
        .tiptap-content .ProseMirror hr {
          border: none;
          border-top: 2px solid #e5e7eb;
          margin: 2em 0;
        }

        /* Tables */
        .tiptap-content .ProseMirror table {
          border-collapse: collapse;
          table-layout: fixed;
          width: 100%;
          margin: 1em 0;
          overflow: hidden;
        }

        .tiptap-content .ProseMirror table td,
        .tiptap-content .ProseMirror table th {
          min-width: 1em;
          border: 2px solid #d1d5db;
          padding: 8px 12px;
          vertical-align: top;
          box-sizing: border-box;
          position: relative;
        }

        .tiptap-content .ProseMirror table th {
          font-weight: bold;
          text-align: left;
          background-color: #f3f4f6;
        }

        .tiptap-content .ProseMirror table .selectedCell {
          background-color: #e0f2fe;
        }

        .tiptap-content .ProseMirror table .column-resize-handle {
          position: absolute;
          right: -2px;
          top: 0;
          bottom: 0;
          width: 4px;
          background-color: #3b82f6;
          pointer-events: none;
        }

        .tiptap-content .ProseMirror table p {
          margin: 0;
        }

        /* Text Alignment */
        .tiptap-content .ProseMirror [style*="text-align: left"] {
          text-align: left;
        }

        .tiptap-content .ProseMirror [style*="text-align: center"] {
          text-align: center;
        }

        .tiptap-content .ProseMirror [style*="text-align: right"] {
          text-align: right;
        }

        .tiptap-content .ProseMirror [style*="text-align: justify"] {
          text-align: justify;
        }

        /* Underline */
        .tiptap-content .ProseMirror u {
          text-decoration: underline;
        }

        /* Highlight */
        .tiptap-content .ProseMirror mark {
          background-color: #fef08a;
          padding: 0.1em 0.2em;
          border-radius: 2px;
        }

        /* Readonly state */
        .tiptap-editor-wrapper.readonly .toolbar {
          display: none;
        }

        .tiptap-editor-wrapper.readonly .tiptap-content .ProseMirror {
          background-color: #f9fafb;
          cursor: default;
        }
      `}</style>
    </div>
  );
}
