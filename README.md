# CoolNameHere Design System

Standalone Expo + React Native Storybook repo for the CoolNameHere design system.

This project is intentionally separate from the main application. It keeps the reusable UI, design tokens, and higher-level patterns in one place without app routes, auth, or API wiring.

## What This Repo Is

- React Native components rendered through Expo
- Storybook as the main entry point
- Web preview wrapped in a phone-sized frame for reviewing mobile UI in the browser
- Neutral sample content so stories stay application-agnostic

## Stack

- Expo
- React Native
- React Native Web
- `@storybook/react-native`
- TypeScript

## Getting Started

Install dependencies:

```bash
npm install
```

Generate the Storybook story index:

```bash
npm run storybook-generate
```

Start Storybook:

```bash
npm run storybook
```

Useful commands:

```bash
npm run web
npm run ios
npm run android
npm run typecheck
```

## How It Works

- Storybook is the app root.
- Story registration is generated into `.rnstorybook/storybook.requires.ts`.
- The Storybook UI is configured in [.rnstorybook/index.ts](./.rnstorybook/index.ts).
- Shared preview decorators, sorting, phone framing, and theme toggle live in [.rnstorybook/preview.tsx](./.rnstorybook/preview.tsx).

On web, stories render inside a phone shell so component and screen previews read more like an actual mobile app. On native, stories render normally inside the React Native Storybook UI.

## Story Organization

Stories are organized into these top-level sections:

- `Design System/Foundations`
- `Design System/Layout`
- `Components/Actions`
- `Components/Data Display`
- `Components/Disclosure`
- `Components/Feedback`
- `Components/Forms`
- `Components/Media`
- `Components/Surfaces`
- `Patterns/Cards`
- `Patterns/Content`
- `Patterns/Forms`
- `Patterns/Profiles`
- `Patterns/States`
- `Internal/Shared`

Use these categories consistently:

- `Foundations`: tokens, primitives, color, type, spacing, radius, elevation, motion
- `Layout`: app-level containers and structural layout pieces
- `Components`: reusable building blocks
- `Patterns`: composed UI made from multiple components
- `Internal`: tooling, labs, and stories that are useful for development but not part of the public system

## Repo Structure

```text
.rnstorybook/         Storybook setup and preview configuration
contexts/             Shared providers such as theme preference
constants/            Theme and app constants
hooks/                Shared hooks
src/design-system/    Tokens, foundations, layout primitives, and core components
src/features/         Larger feature-oriented patterns used in stories
src/shared/           Shared app-level utilities and components
src/storybook/        Storybook-specific helpers and wrappers
```

## Theming

- Theme preference is managed in [contexts/theme-context.tsx](./contexts/theme-context.tsx)
- The default preference is light
- Stories can be switched between `System`, `Light`, and `Dark` from the preview toggle

## Notes

- `app.json` uses `web.output: "single"` so Expo web does not expect `expo-router`
- Small component stories often use `src/storybook/story-section.tsx` to give them realistic vertical context inside the phone frame
- Some code still uses feature-oriented folders under `src/features/`; that is about implementation grouping, not Storybook taxonomy

## Workflow

When adding or changing stories:

1. Put the story in the correct taxonomy bucket.
2. Prefer neutral sample content over app-specific copy.
3. Use realistic composition for small controls instead of rendering them in isolation.
4. Run:

```bash
npm run storybook-generate
npm run typecheck
```
