// utils/colorUtils.ts
export const getTextColor = (
  isRed: boolean,
  isBlue: boolean,
  isBrown: boolean,
): string => {
  if (isRed) return "text-pink-600";
  if (isBlue) return "text-blue-500";
  if (isBrown) return "text-amber-900";
  return "text-gray-700";
};
