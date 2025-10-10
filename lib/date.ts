import { format } from "date-fns";

interface FormatDateProps {
  date: Date;
  formatStr?: string;
}

export function formatDate({
  date,
  formatStr = "MMMM d, yyyy",
}: FormatDateProps) {
  if (!date) {
    return "";
  }

  return format(date, formatStr);
}
