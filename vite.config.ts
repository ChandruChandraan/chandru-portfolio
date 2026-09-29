import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** Ensure PDF files from public directory are always served as application/pdf with inline disposition in dev */
function pdfServePlugin(): Plugin {
  return {
    name: "pdf-serve-plugin",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const rawUrl = req.url ? req.url.split("?")[0].split("#")[0] : "";
        if (rawUrl.endsWith(".pdf")) {
          const fileName = path.basename(decodeURIComponent(rawUrl));
          const filePath = path.resolve(__dirname, "public", fileName);
          if (fs.existsSync(filePath)) {
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `inline; filename="${fileName}"`);
            const fileStream = fs.createReadStream(filePath);
            return fileStream.pipe(res);
          }
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [pdfServePlugin(), react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    watch: {
      ignored: ["**/*.pdf"],
    },
  },
});
