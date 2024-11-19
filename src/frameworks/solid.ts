import { ReactiveFramework } from "../util/reactiveFramework";
import {
  batch as withBatch,
  createEffect as effect,
  createMemo,
  createRoot as withBuild,
  createSignal,
} from "solid-js/dist/solid.cjs";

export const solidFramework: ReactiveFramework = {
  name: "SolidJS",
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
  withBatch,
  withBuild,
};
