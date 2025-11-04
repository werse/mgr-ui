import { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/useTheme.ts';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export function NightModeToggle() {
  const { theme, setTheme } = useTheme();
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);

  // Track system preference so "system" theme can reflect real state
  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setSystemPrefersDark(e.matches);
    setSystemPrefersDark(mql.matches);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  const effectiveTheme = theme === 'system' ? (systemPrefersDark ? 'dark' : 'light') : theme;
  const isDark = effectiveTheme === 'dark';

  const toggleTheme = () => {
    // Toggle only between explicit light/dark
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <div className="flex items-center space-x-2 opacity-100">
      <Switch id="night-mode" checked={isDark} onCheckedChange={toggleTheme} />
      <Label htmlFor="night-mode">Night Mode</Label>
    </div>
  );
}
