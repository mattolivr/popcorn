import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { config } from "dotenv";

config({ path: process.cwd().replace("\client", "").concat(".env") })

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  return {
    define: {
      'process.env.TMDB_TOKEN': JSON.stringify(process.env.TMDB_TOKEN)
    },
    plugins: [react()]
  }
})
