interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_API_ORIGIN: string;
  readonly VITE_API_CABLE_URL: string;
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
