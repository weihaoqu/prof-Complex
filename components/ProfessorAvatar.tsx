import React from 'react';
import { ProfessorMood } from '../types';

interface Props {
  mood: ProfessorMood;
}

const ProfessorAvatar: React.FC<Props> = ({ mood }) => {
  const getEmoji = () => {
    switch (mood) {
      case ProfessorMood.ANGRY:
        return '🤬';
      case ProfessorMood.HELPFUL:
        return '👨‍🏫';
      case ProfessorMood.NEUTRAL:
      default:
        return '🧐';
    }
  };

  const getColor = () => {
    switch (mood) {
      case ProfessorMood.ANGRY:
        return 'bg-red-600 border-red-800 animate-shake';
      case ProfessorMood.HELPFUL:
        return 'bg-emerald-600 border-emerald-800';
      case ProfessorMood.NEUTRAL:
      default:
        return 'bg-stone-600 border-stone-800';
    }
  };

  return (
    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl border-4 transition-all duration-300 shadow-lg ${getColor()}`}>
      <span className="drop-shadow-md">{getEmoji()}</span>
    </div>
  );
};

export default ProfessorAvatar;