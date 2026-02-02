/**
 * Icon Components
 * Centralized icon mapping for consistency
 */

import { 
  BookOpen, 
  Target, 
  Zap, 
  TrendingUp,
  Lightbulb,
  CheckCircle2,
  XCircle,
  Clock,
  DollarSign,
  Users,
  Flame,
  Check,
  Bell,
  Search,
  Filter,
  Plus,
  Calendar,
  Trophy,
  Eye,
  Settings,
  Menu,
  Brain,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  RotateCcw,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Target,
  Zap,
  TrendingUp,
  Lightbulb,
  CheckCircle2,
  XCircle,
  Clock,
  DollarSign,
  Users,
  Flame,
  Check,
  Bell,
  Search,
  Filter,
  Plus,
  Calendar,
  Trophy,
  Eye,
  Settings,
  Menu,
  Brain,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  RotateCcw,
};

export function DynamicIcon({ 
  name, 
  size = 20,
  className = '',
}: { 
  name: string; 
  size?: number;
  className?: string;
}) {
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon size={size} className={className} />;
}

export { iconMap };
export type { LucideIcon };
