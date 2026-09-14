/**
 * URL hash as an external store.
 * Next.js <Link href="/san-pham#groupId"> uses history.pushState, which does
 * not fire `hashchange` — so a hashchange-only listener never sees category
 * clicks. Wrapping pushState/replaceState closes that gap.
 */

export type UrlHashTarget = {
  location: { hash: string };
  history: {
    pushState(data: unknown, unused: string, url?: string | URL | null): void;
    replaceState(data: unknown, unused: string, url?: string | URL | null): void;
  };
  addEventListener(type: string, listener: () => void): void;
  removeEventListener(type: string, listener: () => void): void;
};

export type UrlHashStore = {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => string;
  notify: () => void;
};

export function readHashId(hash: string): string {
  return hash.replace(/^#/, "");
}

export function matchCatalogGroupId(
  hash: string,
  groupIds: readonly string[],
): string | null {
  const id = readHashId(hash);
  if (!id) return null;
  return groupIds.includes(id) ? id : null;
}

export function createUrlHashStore(target: UrlHashTarget): UrlHashStore {
  const listeners = new Set<() => void>();
  let patched = false;

  let originalPush: UrlHashTarget["history"]["pushState"];
  let originalReplace: UrlHashTarget["history"]["replaceState"];

  function notify() {
    listeners.forEach((listener) => listener());
  }

  function scheduleNotify() {
    queueMicrotask(() => {
      notify();
    });
  }

  function ensurePatched() {
    if (patched) return;

    patched = true;

    originalPush = target.history.pushState.bind(target.history);
    originalReplace = target.history.replaceState.bind(target.history);

    target.history.pushState = (data, unused, url) => {
      originalPush(data, unused, url);
      scheduleNotify();
    };

    target.history.replaceState = (data, unused, url) => {
      originalReplace(data, unused, url);
      scheduleNotify();
    };

    target.addEventListener("hashchange", notify);
    target.addEventListener("popstate", notify);
  }

  return {
    subscribe(listener) {
      ensurePatched();
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    getSnapshot() {
      return readHashId(target.location.hash);
    },
    notify,
  };
}

let browserStore: UrlHashStore | undefined;

function getBrowserStore(): UrlHashStore {
  if (!browserStore) {
    browserStore = createUrlHashStore(window);
  }
  return browserStore;
}

export function subscribeToUrlHash(listener: () => void) {
  return getBrowserStore().subscribe(listener);
}

export function getUrlHashSnapshot() {
  return getBrowserStore().getSnapshot();
}

export function getUrlHashServerSnapshot() {
  return "";
}

export function notifyUrlHashListeners() {
  getBrowserStore().notify();
}
