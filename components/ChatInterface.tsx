import React, { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { ChatMessage, ProfessorMood } from '../types';
import ProfessorAvatar from './ProfessorAvatar';

interface Props {
  messages: ChatMessage[];
  isLoading: boolean;
}

const ChatInterface: React.FC<Props> = ({ messages, isLoading }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    };

    // Immediate scroll
    scrollToBottom();

    // Delayed scroll to account for layout shifts (markdown rendering, images)
    const timeoutId = setTimeout(scrollToBottom, 100);

    return () => clearTimeout(timeoutId);
  }, [messages, isLoading]);

  const speakMessage = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    // Stop any current speech
    window.speechSynthesis.cancel();

    // Simple cleanup of markdown symbols for smoother reading
    const cleanText = text
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/__/g, '')
      .replace(/`/g, '')
      .replace(/\[Slide \d+\]/g, ''); // Remove citations for flow

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Attempt to select a male/stern voice
    // Note: getVoices() behavior varies by browser (async in Chrome), 
    // but usually works on click events if voices are loaded.
    const voices = window.speechSynthesis.getVoices();
    
    // Prioritize known male voices or voices explicitly labeled "male"
    const maleKeywords = ['male', 'david', 'daniel', 'google us english'];
    
    // Sort voices to prioritize "Google US English" or "Microsoft David" if available
    const preferredVoice = voices.find(v => 
        v.lang.startsWith('en') && 
        maleKeywords.some(keyword => v.name.toLowerCase().includes(keyword))
    );

    if (preferredVoice) {
        utterance.voice = preferredVoice;
        // If we found a likely male voice, lower pitch slightly for sternness
        utterance.pitch = 0.9;
    } else {
        // If we are using a default voice (which might be female), lower pitch significantly
        utterance.pitch = 0.7;
    }

    utterance.rate = 1.0;

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6 w-full max-w-4xl mx-auto pb-24">
      {messages.length === 0 && (
        <div className="text-center text-stone-500 mt-20">
          <h2 className="text-2xl font-bold mb-2">Professor Complexity is waiting.</h2>
          <p>Don't ask trivial questions.</p>
        </div>
      )}

      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
        >
          {msg.role === 'professor' ? (
            <div className="flex-shrink-0">
               <ProfessorAvatar mood={msg.mood || ProfessorMood.NEUTRAL} />
            </div>
          ) : (
             <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl border-2 border-blue-200">
                🎓
             </div>
          )}

          <div
            className={`flex flex-col max-w-[80%] ${
              msg.role === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`p-4 rounded-xl shadow-sm text-sm md:text-base leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-blue-50 text-blue-900 border border-blue-100'
                  : msg.mood === ProfessorMood.ANGRY
                  ? 'bg-red-50 text-red-900 border border-red-200'
                  : 'bg-white text-stone-800 border border-stone-200'
              }`}
            >
              <div className="prose prose-sm max-w-none break-words">
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>

            {msg.chalkboardImage && (
                <div className="mt-3 bg-stone-900 p-2 rounded-lg border-4 border-amber-800 shadow-xl max-w-full">
                    <div className="text-stone-400 text-xs font-mono mb-1 text-center">Chalkboard</div>
                    <img src={msg.chalkboardImage} alt="Chalkboard diagram" className="rounded opacity-90 invert" />
                </div>
            )}

            <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-stone-400">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
                
                {msg.role === 'professor' && (
                  <button
                    onClick={() => speakMessage(msg.content)}
                    className="text-stone-400 hover:text-stone-600 transition-colors p-1 rounded-full hover:bg-stone-200 focus:outline-none"
                    title="Read answer aloud"
                    aria-label="Read answer aloud"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    </svg>
                  </button>
                )}
            </div>
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex gap-4">
           <ProfessorAvatar mood={ProfessorMood.NEUTRAL} />
           <div className="flex items-center space-x-2 mt-4">
              <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
           </div>
        </div>
      )}
      <div ref={scrollRef} />
    </div>
  );
};

export default ChatInterface;