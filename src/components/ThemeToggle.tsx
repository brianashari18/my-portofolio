import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const currentTheme = theme === 'dark' ? 'dark' : 'light';
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return <button
    className="nova-theme-toggle"
    type="button"
    aria-label={`${currentTheme === 'dark' ? 'Dark' : 'Light'} mode`}
    aria-pressed={theme === 'dark'}
    title={`Switch to ${nextTheme} mode`}
    onClick={toggleTheme}
  >
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      {theme === 'light'
        ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>
        : <path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5 8.5 8.5 0 1 0 20.5 15.5Z" />}
    </svg>
    <span>{currentTheme === 'dark' ? 'Dark' : 'Light'}</span>
  </button>;
}
