import { spawnSync } from "node:child_process";

const steps = ["npm run typecheck", "vite build"];

for (const step of steps) {
  const result = spawnSync(step, {
    stdio: "inherit",
    shell: true,
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
