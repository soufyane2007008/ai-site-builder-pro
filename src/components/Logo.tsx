import { Sparkles } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ size = 'md' }: LogoProps) {
  const sizes = {
    sm: { icon: 20, text: 'text-xl' },
    md: { icon: 28, text: 'text-2xl' },
    lg: { icon: 40, text: 'text-4xl' },
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full" />
        <div className="relative bg-gradient-to-br from-primary to-secondary p-2 rounded-xl">
          <Sparkles size={sizes[size].icon} className="text-primary-foreground" />
        </div>
      </div>
      <span className={`font-bold gradient-text ${sizes[size].text}`}>
        NTFly AI
      </span>
    </div>
  );
}
