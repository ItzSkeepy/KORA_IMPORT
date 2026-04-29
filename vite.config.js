import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/KORA_IMPORT/",
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three")) {
            return "three-core";
          }
          if (id.includes("@react-three/fiber")) {
            return "r3f-core";
          }
          if (id.includes("@react-three/drei")) {
            return "drei-helpers";
          }
          if (id.includes("@react-three/postprocessing") || id.includes("postprocessing")) {
            return "post-stack";
          }
          if (id.includes("node_modules/react") || id.includes("react-router-dom")) {
            return "react-stack";
          }
          if (id.includes("framer-motion") || id.includes("gsap") || id.includes("lenis")) {
            return "motion-stack";
          }
          return undefined;
        },
      },
    },
  },
});
