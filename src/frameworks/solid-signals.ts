import { ReactiveFramework } from "../util/reactiveFramework";
import {
  createEffect as effect,
  createMemo,
  createRoot as withBuild,
  createSignal,
} from "this-is-ss";

export const solidSignalsFramework: ReactiveFramework = {
  name: "SolidJS/signals",
  signal: (initialValue) => {
    const [getter, setter] = createSignal(initialValue);
    return {
      write: setter,
      read: getter,
    };
  },
  computed: (fn) => {
    const memo = createMemo(fn);
    return {
      read: memo,
    };
  },
  effect,
  withBatch: (fn) => fn(),
  withBuild,
};
