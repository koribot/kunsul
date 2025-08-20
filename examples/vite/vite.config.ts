import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  return {
    define: {
     KUNSUL_DEBUG: JSON.stringify(mode === "development"),
    },
  };
});
