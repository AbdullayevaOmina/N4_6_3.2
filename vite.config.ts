import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src/*" },
      { find: "@components", replacement: "/src/components" },
      { find: "@containers", replacement: "/src/components/containers" },

      { find: "@images", replacement: "/src/assets/images" },
      { find: "@hooks", replacement: "/src/hooks" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@layout", replacement: "/src/layout" },
      { find: "@context", replacement: "/src/context" },

      { find: "@assets", replacement: "/src/assets" },
      { find: "@hooks", replacement: "/src/hooks" },
      { find: "@router", replacement: "/src/router" },
      { find: "@routes", replacement: "/src/router/routes.tsx" }
      ,
      { find: "@http", replacement: "/src/plugins/axios.js" },
      { find: "@httpModel", replacement: "/src/plugins/httpModels.js" },
      { find: "@auth", replacement: "/src/plugins/auth.js" },
    ],
  },
});
