import React from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ProfessorProfile: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-0 relative overflow-hidden border border-stone-300 max-h-[90vh] overflow-y-auto">
        
        {/* Header background pattern */}
        <div className="h-24 bg-stone-900 w-full relative shrink-0">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-chalk.png')]"></div>
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-stone-300 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-1 transition-all"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        </div>

        <div className="px-6 pb-6 relative">
            {/* Avatar overlapping header */}
            <div className="-mt-12 mb-4 flex justify-center">
                 <div className="w-24 h-24 rounded-full bg-stone-100 border-4 border-white shadow-lg flex items-center justify-center text-5xl">
                    👨‍🏫
                 </div>
            </div>

            <div className="text-center mb-6">
            <h2 className="text-2xl font-bold font-serif text-stone-900">Prof. A. Complexity</h2>
            <p className="text-stone-500 font-mono text-xs uppercase tracking-wider">Dept. of Theoretical CS</p>
            </div>

            <div className="space-y-4 text-stone-700">
            <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 shadow-sm">
                <h3 className="font-bold text-stone-900 mb-2 text-sm uppercase tracking-wide flex items-center gap-2">
                    <span className="text-lg">ℹ️</span> About
                </h3>
                <p className="text-sm italic text-stone-600">
                "I do not have time for O(n^2) minds in an O(n) world."
                </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 shadow-sm">
                <h3 className="font-bold text-blue-900 mb-2 text-sm uppercase tracking-wide flex items-center gap-2">
                    <span className="text-lg">📚</span> Course Materials
                </h3>
                <a 
                    href="https://monmouth.desire2learn.com/d2l/le/content/349218/viewContent/4396865/View"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:text-blue-900 hover:underline text-sm flex items-center gap-2 font-medium"
                >
                    <span>📄</span> Lecture Slides (D2L)
                </a>
            </div>

            <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 shadow-sm">
                <h3 className="font-bold text-stone-900 mb-2 text-sm uppercase tracking-wide flex items-center gap-2">
                    <span className="text-lg">🎻</span> Hobbies
                </h3>
                <ul className="text-sm space-y-2">
                <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full"></span>
                    Restoring antique slide rules
                </li>
                <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full"></span>
                    Playing the Theremin (passionate, but terrible)
                </li>
                <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full"></span>
                    Competitive Sudoku
                </li>
                </ul>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 shadow-sm">
                <h3 className="font-bold text-amber-900 mb-2 text-sm uppercase tracking-wide flex items-center gap-2">
                    <span className="text-lg">🍬</span> Favorites (Bribes)
                </h3>
                <p className="text-xs text-amber-700 mb-2">
                    Use these if he gets too angry...
                </p>
                <ul className="text-sm space-y-2 text-amber-900 font-medium">
                <li className="flex items-center gap-2">
                    <span>🍫</span> 99% Dark Chocolate
                </li>
                <li className="flex items-center gap-2">
                    <span>🍬</span> Crystallized Ginger
                </li>
                <li className="flex items-center gap-2">
                    <span>☕</span> Triple-shot Espresso
                </li>
                </ul>
            </div>

            <div className="pt-2">
                <a 
                    href="https://docs.google.com/forms/d/e/1FAIpQLScW-fWdXjSBnHZ2SQ4SMO_ImDIqP49DeHr9jckEzwgD1eMKdw/viewform?usp=sharing&ouid=113013872270547245854"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-md group"
                >
                    <span className="group-hover:scale-110 transition-transform">📝</span>
                    Rate this Professor
                </a>
                <p className="text-xs text-stone-400 text-center mt-2">
                    (Anonymous feedback is preferred)
                </p>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessorProfile;