import { create } from "zustand";

export const useThemeStore = create((set) => {
  const initialTheme = localStorage.getItem("data-theme") || "light";

  if (typeof window !== "undefined") {
    document.documentElement.setAttribute("data-theme", initialTheme);
  }

  return {
    theme: initialTheme,
    setTheme: (theme) => {
      localStorage.setItem("chat-theme", theme);
      if (typeof window !== "undefined") {
        document.documentElement.setAttribute("data-theme", theme);
      }

      set({ theme });
    },
  };
});
