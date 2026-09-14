/**
 * Sticky-header flicker harness.
 *
 * Models layout shift when sticky header height changes by `delta`:
 *   scrolled on  → scrollY -= delta
 *   scrolled off → scrollY += delta
 *
 * Defaults match Header.tsx ENTER_PX / EXIT_PX and sm height delta (96→72).
 * Reproduce the old bug: --enter 8 --exit 8 --delta 24
 *
 * Exit 1 = RED (unstable), 0 = GREEN
 */

function parseArgs(argv) {
  const out = { enter: 48, exit: 8, delta: 24 };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--enter") out.enter = Number(argv[++i]);
    else if (a === "--exit") out.exit = Number(argv[++i]);
    else if (a === "--delta") out.delta = Number(argv[++i]);
  }
  return out;
}

function resolve(scrollY, scrolled, enter, exit) {
  return scrolled ? scrollY > exit : scrollY > enter;
}

function settle(startY, initialScrolled, { enter, exit, delta }) {
  let scrollY = startY;
  let scrolled = initialScrolled;
  const seen = new Set();
  for (let i = 0; i < 20; i++) {
    const key = `${scrollY}|${scrolled}`;
    if (seen.has(key)) {
      return { startY, initialScrolled, scrollY, scrolled, oscillating: true, passes: i };
    }
    seen.add(key);
    const next = resolve(scrollY, scrolled, enter, exit);
    if (next === scrolled) {
      return { startY, initialScrolled, scrollY, scrolled, oscillating: false, passes: i };
    }
    if (next) scrollY = Math.max(0, scrollY - delta);
    else scrollY = scrollY + delta;
    scrolled = next;
  }
  return { startY, initialScrolled, scrollY, scrolled, oscillating: true, passes: 20 };
}

function scan(opts) {
  const failures = [];
  for (let y = opts.enter + 1; y <= opts.enter + opts.delta + 4; y++) {
    const r = settle(y, false, opts);
    if (r.oscillating || !r.scrolled) failures.push({ ...r, kind: "enter" });
  }
  for (let y = Math.max(0, opts.exit - 2); y <= opts.exit; y++) {
    const r = settle(y, true, opts);
    if (r.oscillating || r.scrolled) failures.push({ ...r, kind: "exit" });
  }
  return failures;
}

const opts = parseArgs(process.argv.slice(2));
const failures = scan(opts);
console.log("config:", opts);
console.log("failures:", failures.length);
if (failures.length) {
  console.log("examples:", failures.slice(0, 6));
  console.log("FAIL: header scrolled state unstable near threshold (flicker)");
  process.exit(1);
}
console.log("PASS: enter/exit bands stable under layout shift");
process.exit(0);
