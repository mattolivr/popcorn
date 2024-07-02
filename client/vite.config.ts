import react from "@vitejs/plugin-react";
import { config } from "dotenv";
import { defineConfig } from "vite";

config({ path: process.cwd().replace("client", "").concat(".env") });

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    define: {
      "process.env.external_tmdb_token": JSON.stringify(
        process.env["external.tmdb.token"],
      ),
    },
    plugins: [react()],
  };
});
