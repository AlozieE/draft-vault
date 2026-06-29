"use client";

import { useEffect, useState } from "react";

const DEFAULT_TIME_OPTIONS: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
};

type ClientFormattedTimeProps = {
  timestamp: string;
  className?: string;
  options?: Intl.DateTimeFormatOptions;
};

export function ClientFormattedTime({
  timestamp,
  className,
  options = DEFAULT_TIME_OPTIONS,
}: ClientFormattedTimeProps) {
  const [formattedTime, setFormattedTime] = useState<string | null>(null);

  useEffect(() => {
    setFormattedTime(new Date(timestamp).toLocaleTimeString(undefined, options));
  }, [timestamp, options]);

  return (
    <span className={className} suppressHydrationWarning>
      {formattedTime ?? "\u00a0"}
    </span>
  );
}
