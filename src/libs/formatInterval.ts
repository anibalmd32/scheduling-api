export function formatInterval (hours: number): number {
  const interval = (hours * 60) / 45

  if (interval % 2 === 0) {
    return interval + 1
  } else {
    return Math.ceil(interval) + 1
  }
}
