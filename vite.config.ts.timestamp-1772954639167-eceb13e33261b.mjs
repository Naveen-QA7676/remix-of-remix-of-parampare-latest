// vite.config.ts
import { defineConfig, loadEnv } from "file:///C:/Users/THINKPAD/Desktop/Parampare-Frontend/remix-of-remix-of-parampare-latest/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/THINKPAD/Desktop/Parampare-Frontend/remix-of-remix-of-parampare-latest/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///C:/Users/THINKPAD/Desktop/Parampare-Frontend/remix-of-remix-of-parampare-latest/node_modules/lovable-tagger/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\THINKPAD\\Desktop\\Parampare-Frontend\\remix-of-remix-of-parampare-latest";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiTarget = env.VITE_API_URL || "http://localhost:5000";
  return {
    server: {
      host: "::",
      port: 8080,
      proxy: {
        "/api": {
          target: apiTarget.replace(/\/$/, ""),
          changeOrigin: true,
          secure: false
        },
        "/uploads": {
          target: apiTarget.replace(/\/$/, ""),
          changeOrigin: true,
          secure: false
        }
      }
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src")
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxUSElOS1BBRFxcXFxEZXNrdG9wXFxcXFBhcmFtcGFyZS1Gcm9udGVuZFxcXFxyZW1peC1vZi1yZW1peC1vZi1wYXJhbXBhcmUtbGF0ZXN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxUSElOS1BBRFxcXFxEZXNrdG9wXFxcXFBhcmFtcGFyZS1Gcm9udGVuZFxcXFxyZW1peC1vZi1yZW1peC1vZi1wYXJhbXBhcmUtbGF0ZXN0XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9USElOS1BBRC9EZXNrdG9wL1BhcmFtcGFyZS1Gcm9udGVuZC9yZW1peC1vZi1yZW1peC1vZi1wYXJhbXBhcmUtbGF0ZXN0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgY29tcG9uZW50VGFnZ2VyIH0gZnJvbSBcImxvdmFibGUtdGFnZ2VyXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgXCJcIik7XG4gIGNvbnN0IGFwaVRhcmdldCA9IGVudi5WSVRFX0FQSV9VUkwgfHwgXCJodHRwOi8vbG9jYWxob3N0OjUwMDBcIjtcblxuICByZXR1cm4ge1xuICAgIHNlcnZlcjoge1xuICAgICAgaG9zdDogXCI6OlwiLFxuICAgICAgcG9ydDogODA4MCxcbiAgICAgIHByb3h5OiB7XG4gICAgICAgIFwiL2FwaVwiOiB7XG4gICAgICAgICAgdGFyZ2V0OiBhcGlUYXJnZXQucmVwbGFjZSgvXFwvJC8sIFwiXCIpLFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICBzZWN1cmU6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICBcIi91cGxvYWRzXCI6IHtcbiAgICAgICAgICB0YXJnZXQ6IGFwaVRhcmdldC5yZXBsYWNlKC9cXC8kLywgXCJcIiksXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgIHNlY3VyZTogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgcGx1Z2luczogW3JlYWN0KCksIG1vZGUgPT09IFwiZGV2ZWxvcG1lbnRcIiAmJiBjb21wb25lbnRUYWdnZXIoKV0uZmlsdGVyKEJvb2xlYW4pLFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJhLFNBQVMsY0FBYyxlQUFlO0FBQ2pkLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyx1QkFBdUI7QUFIaEMsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFO0FBQzNDLFFBQU0sWUFBWSxJQUFJLGdCQUFnQjtBQUV0QyxTQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTCxRQUFRO0FBQUEsVUFDTixRQUFRLFVBQVUsUUFBUSxPQUFPLEVBQUU7QUFBQSxVQUNuQyxjQUFjO0FBQUEsVUFDZCxRQUFRO0FBQUEsUUFDVjtBQUFBLFFBQ0EsWUFBWTtBQUFBLFVBQ1YsUUFBUSxVQUFVLFFBQVEsT0FBTyxFQUFFO0FBQUEsVUFDbkMsY0FBYztBQUFBLFVBQ2QsUUFBUTtBQUFBLFFBQ1Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUyxDQUFDLE1BQU0sR0FBRyxTQUFTLGlCQUFpQixnQkFBZ0IsQ0FBQyxFQUFFLE9BQU8sT0FBTztBQUFBLElBQzlFLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUN0QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
