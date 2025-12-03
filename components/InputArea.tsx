import React, { useState } from 'react';

interface Props {
  onSend: (text: string) => void;
  disabled: boolean;
  placeholder?: string;
  buttonText?: string;
  buttonIcon?: string;
}

const InputArea: React.FC<Props> = ({ 
  onSend, 
  disabled, 
  placeholder = "Type your question...", 
  buttonText = "Raise Hand",
  buttonIcon = "✋"
}) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-stone-200 sticky bottom-0 w-full max-w-4xl mx-auto shadow-lg rounded-t-xl z-30">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={disabled}
          placeholder={placeholder}
          className="flex-1 p-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 font-mono text-sm disabled:opacity-50 transition-all"
        />
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="bg-stone-800 text-white px-6 py-3 rounded-lg hover:bg-stone-700 disabled:opacity-50 disabled:cursor-not-allowed font-serif font-bold transition-colors flex items-center gap-2 min-w-fit"
        >
          <span>{buttonIcon}</span>
          <span className="hidden sm:inline">{buttonText}</span>
        </button>
      </div>
    </form>
  );
};

export default InputArea;