# chat-app-front

シンプルなチャットアプリのサンプル（認証、ユーザー登録なし）

## 起動方法

```
npm run dev
```

## 使用技術

- Vue 3
- TypeScript
- vite

## 開発環境(vite の推奨)

- [VSCode](https://code.visualstudio.com/)
- [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can use the following:
