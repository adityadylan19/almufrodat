import React from 'react';
import {
  GraduationCap, DoorOpen, Presentation, BookOpen, PenTool, Library,
  Headphones, Briefcase, Shirt, Calendar, Footprints, Zap, Flame,
  Shield, Heart, Feather, Waves, Sparkles, Coffee, Target, Award,
  Stethoscope, Compass, ShieldAlert, Plane, ShieldCheck, Sprout,
  ShoppingBag, Pill, Newspaper, HelpCircle, BookCheck, User
} from 'lucide-react';

interface CategoryIconProps {
  name: string;
  className?: string;
}

const iconMap: Record<string, React.ElementType> = {
  GraduationCap, DoorOpen, Presentation, BookOpen, PenTool, Library,
  Headphones, Briefcase, Shirt, Calendar, Footprints, Zap, Flame,
  Shield, Heart, Feather, Waves, Sparkles, Coffee, Target, Award,
  Stethoscope, Compass, ShieldAlert, Plane, ShieldCheck, Sprout,
  ShoppingBag, Pill, Newspaper, BookCheck, User
};

export const CategoryIcon: React.FC<CategoryIconProps> = ({ name, className = 'w-6 h-6' }) => {
  const IconComponent = iconMap[name] || HelpCircle;
  return <IconComponent className={className} />;
};
