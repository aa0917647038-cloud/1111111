/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GITHUB_PROJECT_URL?: string;
  readonly VITE_SHOW_GITHUB_PROJECT_LINK?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
