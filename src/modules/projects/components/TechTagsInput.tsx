import React, { useState, useRef, KeyboardEvent } from 'react';
import { X, Plus } from 'lucide-react';
import { TECHNOLOGY_SUGGESTIONS } from '../constants/project.constants';

interface TechTagsInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
  placeholder?: string;
  error?: string;
  label?: string;
}

export const TechTagsInput: React.FC<TechTagsInputProps> = ({
  value,
  onChange,
  suggestions = TECHNOLOGY_SUGGESTIONS,
  placeholder = 'Type and press Enter…',
  error,
  label,
}) => {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredSuggestions = input.trim()
    ? suggestions.filter(
        (s) =>
          s.toLowerCase().includes(input.toLowerCase()) &&
          !value.includes(s)
      ).slice(0, 8)
    : [];

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed || value.includes(trimmed)) return;
    onChange([...value, trimmed]);
    setInput('');
    setShowSuggestions(false);
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (['Enter', ',', 'Tab'].includes(e.key) && input.trim()) {
      e.preventDefault();
      addTag(input);
    } else if (e.key === 'Backspace' && !input && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-slate-300">{label}</label>
      )}
      <div
        className={`min-h-[44px] flex flex-wrap gap-2 p-2 rounded-xl bg-slate-800 border cursor-text transition-all ${
          error ? 'border-red-500/50' : 'border-slate-700 focus-within:border-sky-500 focus-within:ring-1 focus-within:ring-sky-500/30'
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 pl-2.5 pr-1.5 py-0.5 rounded-lg bg-sky-500/15 text-sky-300 text-xs font-medium border border-sky-500/25"
          >
            {tag}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); removeTag(tag); }}
              className="w-4 h-4 rounded flex items-center justify-center text-sky-400 hover:text-white hover:bg-sky-500/30 transition-colors"
            >
              <X size={10} />
            </button>
          </span>
        ))}
        <div className="relative flex-1 min-w-[140px]">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => { setInput(e.target.value); setShowSuggestions(true); }}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            placeholder={value.length === 0 ? placeholder : ''}
            className="w-full bg-transparent text-sm text-slate-200 placeholder-slate-500 focus:outline-none py-0.5"
          />
          {/* Suggestions dropdown */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 mt-1 w-56 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-20 overflow-hidden">
              {filteredSuggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); addTag(s); }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors text-left"
                >
                  <Plus size={12} className="text-sky-400 shrink-0" />
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
      <p className="text-xs text-slate-600">Press Enter, comma, or Tab to add a tag</p>
    </div>
  );
};

export default TechTagsInput;
