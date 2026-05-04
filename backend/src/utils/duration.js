export const parseDurationToMs = (value) => {
  if (typeof value === 'number') return value;
  if (!value || typeof value !== 'string') throw new Error('Invalid duration format');

  const match = value.match(/^(\d+)([smhd])$/);
  if (!match) {
    throw new Error(`Invalid duration format: ${value}. Expected format like 15m, 7d, 1h, 30s`);
  }

  const [, numStr, unit] = match;
  const num = parseInt(numStr, 10);

  switch (unit) {
    case 's': return num * 1000;
    case 'm': return num * 60 * 1000;
    case 'h': return num * 60 * 60 * 1000;
    case 'd': return num * 24 * 60 * 60 * 1000;
    default: throw new Error(`Invalid duration unit: ${unit}`);
  }
};
