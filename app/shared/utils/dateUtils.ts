import { format } from "date-fns";

const formatDate = (date: Date): string => {
  return format(new Date(date), "dd MMMM yyyy");
};

export { formatDate };
