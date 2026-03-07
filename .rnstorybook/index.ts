import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { view } from "./storybook.requires";

const memoryStorage = (() => {
  const store = new Map<string, string>();
  return {
    getItem: async (key: string) => store.get(key) ?? null,
    setItem: async (key: string, value: string) => {
      store.set(key, value);
    },
  };
})();

const hasWindow = typeof window !== "undefined";
const storage = hasWindow
  ? {
      getItem: AsyncStorage.getItem,
      setItem: AsyncStorage.setItem,
    }
  : memoryStorage;

const StorybookUIRoot = view.getStorybookUI({
  storage,
  // Land on Storybook home/menu each launch instead of restoring prior story.
  shouldPersistSelection: false,
  // Force the navigator on web for this standalone design-system repo.
  onDeviceUI: true,
});

export default StorybookUIRoot;
