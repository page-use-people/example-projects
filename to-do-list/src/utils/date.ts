const dateFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric"
});

export function getTodayIsoDate(): string {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 10);
}

export function formatIsoDate(isoDate: string): string {
  if (!isoDate) {
    return "No date";
  }

  return dateFormatter.format(new Date(`${isoDate}T00:00:00`));
}

export function isPastDue(isoDate: string): boolean {
  return isoDate < getTodayIsoDate();
}

export function isDueToday(isoDate: string): boolean {
  return isoDate === getTodayIsoDate();
}
