import assert from "node:assert/strict";
import { test } from "node:test";
import {
  createUrlHashStore,
  matchCatalogGroupId,
  type UrlHashTarget,
} from "./url-hash.ts";

const GROUP_IDS = ["dich-vu-thuong-mai", "ban-le-tmdt"] as const;

function createMockWindow(initialHash = ""): UrlHashTarget {
  const listeners = new Map<string, Set<() => void>>();
  const target: UrlHashTarget = {
    location: { hash: initialHash },
    history: {
      pushState(_data, _unused, url) {
        applyUrl(target, url);
      },
      replaceState(_data, _unused, url) {
        applyUrl(target, url);
      },
    },
    addEventListener(type, listener) {
      let set = listeners.get(type);
      if (!set) {
        set = new Set();
        listeners.set(type, set);
      }
      set.add(listener);
    },
    removeEventListener(type, listener) {
      listeners.get(type)?.delete(listener);
    },
  };
  return target;
}

function applyUrl(target: UrlHashTarget, url?: string | URL | null) {
  if (typeof url !== "string") return;
  const hashIndex = url.indexOf("#");
  target.location.hash = hashIndex >= 0 ? url.slice(hashIndex) : "";
}

test("matchCatalogGroupId reads category id from hash", () => {
  assert.equal(
    matchCatalogGroupId("#dich-vu-thuong-mai", GROUP_IDS),
    "dich-vu-thuong-mai",
  );
  assert.equal(matchCatalogGroupId("ban-le-tmdt", GROUP_IDS), "ban-le-tmdt");
  assert.equal(matchCatalogGroupId("", GROUP_IDS), null);
  assert.equal(matchCatalogGroupId("#unknown", GROUP_IDS), null);
});

test("store notifies when pushState sets a hash (Next.js Link)", async () => {
  const win = createMockWindow();
  const store = createUrlHashStore(win);
  let snapshot = store.getSnapshot();
  const unsubscribe = store.subscribe(() => {
    snapshot = store.getSnapshot();
  });

  assert.equal(snapshot, "");
  win.history.pushState(null, "", "/san-pham#dich-vu-thuong-mai");
  await Promise.resolve();
  assert.equal(snapshot, "dich-vu-thuong-mai");
  assert.equal(
    matchCatalogGroupId(snapshot, GROUP_IDS),
    "dich-vu-thuong-mai",
  );

  unsubscribe();
});

test("store notifies when replaceState clears the hash", async () => {
  const win = createMockWindow("#ban-le-tmdt");
  const store = createUrlHashStore(win);
  let snapshot = store.getSnapshot();
  store.subscribe(() => {
    snapshot = store.getSnapshot();
  });

  win.history.replaceState(null, "", "/san-pham");
  await Promise.resolve();
  assert.equal(snapshot, "");
  assert.equal(matchCatalogGroupId(snapshot, GROUP_IDS), null);
});
