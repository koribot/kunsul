import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  return {
    define: {
     KUNSUL_IGNORE_IN_BUILD: JSON.stringify(mode === "production"),
    },
  };
});
