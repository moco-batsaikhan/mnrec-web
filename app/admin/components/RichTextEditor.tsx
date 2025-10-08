"use client";

import { useState, useRef } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  height?: number;
  placeholder?: string;
}

export default function RichTextEditor({ 
  value, 
  onChange, 
  height = 400,
  placeholder = "Энд бичнэ үү..." 
}: RichTextEditorProps) {
  const [isPreview, setIsPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertText = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    
    const newText = text.substring(0, start) + before + selectedText + after + text.substring(end);
    onChange(newText);

    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const formatButtons = [
    { label: 'B', title: 'Bold', action: () => insertText('**', '**') },
    { label: 'I', title: 'Italic', action: () => insertText('*', '*') },
    { label: 'H1', title: 'Heading 1', action: () => insertText('# ') },
    { label: 'H2', title: 'Heading 2', action: () => insertText('## ') },
    { label: 'H3', title: 'Heading 3', action: () => insertText('### ') },
    { label: '•', title: 'List', action: () => insertText('- ') },
    { label: '1.', title: 'Numbered List', action: () => insertText('1. ') },
    { label: '""', title: 'Quote', action: () => insertText('> ') },
    { label: 'Link', title: 'Link', action: () => insertText('[', '](url)') },
    { label: 'Code', title: 'Code', action: () => insertText('`', '`') },
  ];

  const renderPreview = (text: string) => {
    // Simple markdown-like preview
    return text
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      .replace(/^1\. (.*$)/gim, '<li>$1</li>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className="rich-text-editor border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex items-center gap-1 flex-wrap">
        {formatButtons.map((button, index) => (
          <button
            key={index}
            type="button"
            onClick={button.action}
            title={button.title}
            className="px-2 py-1 text-sm bg-white border border-gray-200 rounded hover:bg-gray-100 transition-colors"
          >
            {button.label}
          </button>
        ))}
        
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPreview(false)}
            className={`px-3 py-1 text-sm rounded ${
              !isPreview 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Засах
          </button>
          <button
            type="button"
            onClick={() => setIsPreview(true)}
            className={`px-3 py-1 text-sm rounded ${
              isPreview 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Урьдчилан харах
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div style={{ height: `${height}px` }}>
        {!isPreview ? (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-full p-4 resize-none border-0 focus:outline-none focus:ring-0 font-mono text-sm leading-relaxed"
          />
        ) : (
          <div 
            className="w-full h-full p-4 overflow-auto prose max-w-none"
            dangerouslySetInnerHTML={{ __html: renderPreview(value) }}
          />
        )}
      </div>

      {/* Helper Text */}
      <div className="bg-gray-50 border-t border-gray-300 px-4 py-2 text-xs text-gray-600">
        <strong>Markdown хэлбэржүүлэлт:</strong> **bold**, *italic*, # heading, - list, {'>'} quote, `code`, [link](url)
      </div>
    </div>
  );
}