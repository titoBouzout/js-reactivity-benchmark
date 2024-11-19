import { ReactiveFramework } from "../util/reactiveFramework";
import {
  batch as withBatch,
  effect,
  memo,
  root as withBuild,
  signal,
} from "pota";

export const potaFramework: ReactiveFramework = {
  name: "pota",
  signal,
  computed: (fn) => {
    const m = memo(fn);
    return {
      read: m,
    };
  },
  effect,
  withBatch,
  withBuild,
};
