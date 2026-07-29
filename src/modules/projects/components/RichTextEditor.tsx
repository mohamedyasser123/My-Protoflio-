import React, { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  label?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Write a detailed project description…',
  error,
  label,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const modules = {
    toolbar: [
      [{ header: [2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'blockquote', 'code-block'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'list',
    'bullet',
    'link',
    'blockquote',
    'code-block',
  ];

  return (
    <div className="space-y-1.5" ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-slate-300">{label}</label>
      )}
      
      <div
        className={`rich-text-editor overflow-hidden rounded-xl bg-slate-800 border transition-all ${
          error ? 'border-red-500/50' : 'border-slate-700 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500/30'
        }`}
      >
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          className="text-slate-200"
        />
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      {/* Editor Styles Override */}
      <style dangerouslySetInnerHTML={{ __html: `
        .rich-text-editor .ql-toolbar {
          border: none;
          border-bottom: 1px solid #334155;
          background: #0f172a;
          border-radius: 12px 12px 0 0;
          padding: 12px;
        }
        .rich-text-editor .ql-container {
          border: none;
          background: #1e293b;
          border-radius: 0 0 12px 12px;
          font-family: inherit;
          font-size: 14px;
          min-height: 200px;
        }
        .rich-text-editor .ql-editor {
          padding: 16px;
        }
        .rich-text-editor .ql-editor.ql-blank::before {
          color: #64748b;
          font-style: normal;
        }
        .rich-text-editor .ql-stroke {
          stroke: #94a3b8 !important;
        }
        .rich-text-editor .ql-fill {
          fill: #94a3b8 !important;
        }
        .rich-text-editor button:hover .ql-stroke,
        .rich-text-editor .ql-active .ql-stroke {
          stroke: #38bdf8 !important;
        }
        .rich-text-editor button:hover .ql-fill,
        .rich-text-editor .ql-active .ql-fill {
          fill: #38bdf8 !important;
        }
        .rich-text-editor .ql-picker {
          color: #94a3b8;
        }
        .rich-text-editor .ql-picker-options {
          background-color: #1e293b;
          border-color: #334155;
        }
      `}} />
    </div>
  );
};
