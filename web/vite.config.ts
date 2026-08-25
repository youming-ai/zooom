import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: { port: 3000 },
  resolve: { tsconfigPaths: true },
  build: {
    // The dedicated `livekit` vendor chunk is ~522KB minified; that size is
    // inherent to the LiveKit client and it is cached independently of app code.
    chunkSizeWarningLimit: 800,
    rolldownOptions: {
      output: {
        // LiveKit client libs are only used by the room page; isolate them into
        // their own chunk so the vendor bundle is cached separately from app code.
        codeSplitting: {
          groups: [
            {
              name: "livekit",
              test: /node_modules[\\/](@livekit[\\/]|livekit-client[\\/])/,
            },
          ],
        },
      },
    },
  },
  plugins: [tailwindcss(), tanstackStart(), viteReact()],
});
