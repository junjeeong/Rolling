import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      // SVGR 옵션 설정: https://react-svgr.com/docs/options/
      svgrOptions: {
        exportType: "default",  // SVG를 default export로 처리
        ref: true,              // ref 지원 활성화
        svgo: false,            // SVG 최적화 비활성화
        titleProp: true         // title 프로퍼티 지원 활성화
      },
      include: "**/*.svg",      // 모든 .svg 파일에 대해 적용
    }),
  ],
});