import dayjs from "dayjs";

export const now = () => dayjs().toDate();
export const diff = (
  referenceTime: Date | string,
  comparisonTime: Date | string
) => dayjs(referenceTime).diff(comparisonTime);
