export const hourClock = (): string => {
  const time = new Date();
  return time.toLocaleString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const dateFormat = (date: string | null) => {
  if (!date) return null;
  const time = new Date(date);
  return time.toLocaleString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
