import * as SecureStore from "expo-secure-store";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";

type ThemePreference = "system" | "light" | "dark";
type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
  preference: ThemePreference;
  colorScheme: ResolvedTheme;
  setPreference: (next: ThemePreference) => void;
  hydrated: boolean;
};

const STORAGE_KEY = "coolnamehere.theme-preference";

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemePreferenceProvider({ children }: { children: ReactNode }) {
  const systemScheme = useSystemColorScheme();
  const [preference, setPreferenceState] = useState<ThemePreference>("light");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadPreference() {
      try {
        const stored = await SecureStore.getItemAsync(STORAGE_KEY);
        if (!active) return;
        if (stored === "light" || stored === "dark" || stored === "system") {
          setPreferenceState(stored);
        }
      } catch {
        // Keep light mode if storage is unavailable.
      } finally {
        if (active) setHydrated(true);
      }
    }

    void loadPreference();
    return () => {
      active = false;
    };
  }, []);

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next);
    void SecureStore.setItemAsync(STORAGE_KEY, next).catch(() => {});
  }, []);

  const colorScheme: ResolvedTheme = useMemo(() => {
    if (preference === "system") {
      return systemScheme === "dark" ? "dark" : "light";
    }
    return preference;
  }, [preference, systemScheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      preference,
      colorScheme,
      setPreference,
      hydrated,
    }),
    [colorScheme, hydrated, preference, setPreference],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemePreference() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemePreference must be used inside ThemePreferenceProvider");
  }
  return context;
}
