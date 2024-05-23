export const scaleNumber = (query: any) => {
  const scaledValues: Record<string, number> = {};
  for (const [key, value] of Object.entries(query)) {
    scaledValues[key] = parseInt(value as string);
  }

  return scaledValues;
};
