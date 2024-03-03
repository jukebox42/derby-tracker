"use client";
import { AppStore, createAppStore } from "@/store/appStore";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type Store = AppStore;

export const useStore = create<Store>()(devtools((...a) => ({
  ...createAppStore(...a),
})));