import React, { useState, useEffect } from 'react';
import { generateResponse, generateChalkboardImage } from './services/geminiService';
import { ChatMessage, ProfessorMood } from './types';
import ChatInterface from './components/ChatInterface';
import InputArea from './components/InputArea';
import ProfessorProfile from './components/ProfessorProfile';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showRatingToast, setShowRatingToast] = useState(false);
  const [angryCount, setAngryCount] = useState(0);
  const [isClassDismissed, setIsClassDismissed] = useState(false);

  // Initial Greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: 'init',
        role: 'professor',
        content: "Sit down. I am Professor Complexity. We are discussing **Intractability**. If you ask me something found on Slide 1, I will fail you. Now, what is your question?",
        mood: ProfessorMood.NEUTRAL,
        timestamp: Date.now()
      }]);
    }
  }, []);

  const handleSend = async (text: string) => {
    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, newUserMsg]);

    // --- LOCKED OUT LOGIC ---
    if (isClassDismissed) {
        const lowerText = text.toLowerCase();
        const keywords = ['chocolate', 'ginger', 'espresso', 'coffee', 'theremin', 'slide rule', 'sudoku'];
        const isBribe = keywords.some(k => lowerText.includes(k));

        if (isBribe) {
            // SUCCESS: Unlock the class
            setIsLoading(true);
            setIsClassDismissed(false);
            setAngryCount(0); // Reset strikes
            
            try {
                // Send specific context to AI to force the "Grumpy Acceptance" path
                const history = messages.map(m => ({ role: m.role, content: m.content }));
                history.push({ 
                    role: 'user', 
                    content: `[SYSTEM EVENT: The student has knocked on your door and offered: "${text}". This matches your favorites/hobbies. You MUST accept it, stop being angry, and let them back into class, but remain grumpy about it.]` 
                });

                const response = await generateResponse(history);
                
                const newAiMsg: ChatMessage = {
                    id: (Date.now() + 1).toString(),
                    role: 'professor',
                    content: response.text,
                    mood: ProfessorMood.NEUTRAL, // Force neutral/helpful via system prompt influence usually, but fallback safe
                    timestamp: Date.now(),
                };
                setMessages((prev) => [...prev, newAiMsg]);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        } else {
            // FAILURE: Local rejection (save API tokens)
            setTimeout(() => {
                const rejectionMsg: ChatMessage = {
                    id: (Date.now() + 1).toString(),
                    role: 'professor',
                    content: "*Through the locked door:* **GO AWAY!** I am busy practicing my Theremin! (Hint: Try offering something I actually like...)",
                    mood: ProfessorMood.ANGRY,
                    timestamp: Date.now(),
                };
                setMessages((prev) => [...prev, rejectionMsg]);
            }, 800);
        }
        return;
    }
    // ------------------------

    setIsLoading(true);

    // Check interaction count to show rating prompt
    const userMsgCount = messages.filter(m => m.role === 'user').length + 1;
    // TEST MODE: Trigger after 4st question for immediate testing (per user request)
    if (userMsgCount == 4) {
        setTimeout(() => setShowRatingToast(true), 1500);
    }

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      history.push({ role: 'user', content: text });

      const response = await generateResponse(history);

      let imageUrl: string | undefined = undefined;
      
      // If the professor is helpful and describes a diagram, draw it
      // Also draw if he is neutral but still explaining a technical concept (chalkboard description present)
      if (response.chalkboard_description && (response.mood === ProfessorMood.HELPFUL || response.mood === ProfessorMood.NEUTRAL)) {
         const img = await generateChalkboardImage(response.chalkboard_description);
         if (img) imageUrl = img;
      }

      const newAiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'professor',
        content: response.text,
        mood: response.mood,
        chalkboardImage: imageUrl,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, newAiMsg]);

      // Check anger count
      if (response.mood === ProfessorMood.ANGRY) {
        const newCount = angryCount + 1;
        setAngryCount(newCount);
        if (newCount >= 3) {
             setIsClassDismissed(true);
             setTimeout(() => {
                 setMessages(prev => [...prev, {
                     id: 'dismissed',
                     role: 'professor',
                     content: "**THAT IS IT!** I have lost all patience with this class. Three strikes and you are out. I am going to my office to play the Theremin. Do not follow me. Class dismissed!",
                     mood: ProfessorMood.ANGRY,
                     timestamp: Date.now()
                 }]);
             }, 1000);
        }
      }

    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'professor',
        content: "I cannot answer that right now. (API Error - check console)",
        mood: ProfessorMood.NEUTRAL,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-stone-900 text-stone-100 p-4 shadow-md z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
             <button 
                onClick={() => setIsProfileOpen(true)}
                className="flex items-center gap-3 hover:bg-stone-800 p-2 -ml-2 rounded-lg transition-all duration-300 group"
                aria-label="View Professor Profile"
             >
                <div className="text-3xl group-hover:scale-110 transition-transform">👨‍🏫</div>
                <div className="text-left">
                    <h1 className="font-serif font-bold text-xl tracking-wide group-hover:text-amber-400 transition-colors underline decoration-stone-600 underline-offset-4 group-hover:decoration-amber-400/50">
                        Prof. Complexity
                    </h1>
                    <p className="text-xs text-stone-400 font-mono group-hover:text-stone-300">
                        View Profile & Hobbies
                    </p>
                </div>
             </button>
          </div>

          <div className="flex items-center gap-2">
            <a 
              href="https://monmouth.desire2learn.com/d2l/le/content/349218/viewContent/4396865/View"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-white text-sm font-bold flex items-center gap-2 border border-stone-700 hover:border-stone-500 rounded-full px-4 py-2 transition-all"
              title="View Lecture Slides"
            >
              <span>📄</span>
              <span className="hidden sm:inline">Slides</span>
            </a>

            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLScW-fWdXjSBnHZ2SQ4SMO_ImDIqP49DeHr9jckEzwgD1eMKdw/viewform?usp=sharing&ouid=113013872270547245854"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-amber-400 text-sm font-bold flex items-center gap-2 border border-stone-700 hover:border-amber-400 rounded-full px-4 py-2 transition-all"
              title="Rate this Professor"
            >
              <span>⭐</span>
              <span className="hidden sm:inline">Rate Prof</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 overflow-hidden flex flex-col relative">
        <ChatInterface messages={messages} isLoading={isLoading} />
        
        {/* Banner for Dismissed State */}
        {isClassDismissed && (
             <div className="p-3 bg-red-100 border-t border-b border-red-200 text-center text-red-800 font-bold font-serif w-full z-20 shadow-md animate-pulse">
                ⛔ CLASS DISMISSED. The Professor is in his office.
             </div>
        )}

        <InputArea 
            onSend={handleSend} 
            disabled={isLoading}
            placeholder={isClassDismissed ? "Knock on the door (hint: check his profile for bribes)..." : "Type your question..."}
            buttonText={isClassDismissed ? "Knock" : "Raise Hand"}
            buttonIcon={isClassDismissed ? "✊" : "✋"}
        />
      </main>

      {/* Floating Rating Toast (Appears after interaction) */}
      {showRatingToast && !isClassDismissed && (
        <div className="fixed bottom-32 right-4 md:right-8 z-[100] max-w-xs w-full bg-white rounded-xl shadow-2xl border-l-4 border-amber-500 p-4 animate-bounce ring-1 ring-black/5">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h3 className="font-serif font-bold text-stone-800 text-lg">Class Evaluation</h3>
                    <p className="text-sm text-stone-600 mt-1">The department requests your feedback.</p>
                </div>
                <button 
                    onClick={() => setShowRatingToast(false)}
                    className="text-stone-400 hover:text-stone-600 p-1 -mt-1 -mr-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
            <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLScW-fWdXjSBnHZ2SQ4SMO_ImDIqP49DeHr9jckEzwgD1eMKdw/viewform?usp=sharing&ouid=113013872270547245854"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-2 w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-2.5 px-4 rounded-lg transition-all text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                onClick={() => setShowRatingToast(false)}
            >
                <span>📝</span> Rate Prof. Complexity
            </a>
        </div>
      )}

      {/* Profile Modal */}
      <ProfessorProfile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </div>
  );
};

export default App;