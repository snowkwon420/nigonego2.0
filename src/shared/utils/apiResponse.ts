export const pickArray = <T>(
  response: unknown,
  keys: string[],
): T[] => {
  if (Array.isArray(response)) {
    return response as T[];
  }

  if (!response || typeof response !== 'object') {
    return [];
  }

  const record = response as Record<string, unknown>;

  for (const key of keys) {
    const value = record[key];
    if (Array.isArray(value)) {
      return value as T[];
    }
  }

  const data = record.data;
  if (Array.isArray(data)) {
    return data as T[];
  }

  if (data && typeof data === 'object') {
    const dataRecord = data as Record<string, unknown>;

    for (const key of keys) {
      const value = dataRecord[key];
      if (Array.isArray(value)) {
        return value as T[];
      }
    }
  }

  return [];
};

export const pickObject = <T>(
  response: unknown,
  keys: string[],
): T | null => {
  if (!response || typeof response !== 'object') {
    return null;
  }

  const record = response as Record<string, unknown>;

  for (const key of keys) {
    const value = record[key];
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return value as T;
    }
  }

  const data = record.data;
  if (data && typeof data === 'object') {
    const dataRecord = data as Record<string, unknown>;

    for (const key of keys) {
      const value = dataRecord[key];
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        return value as T;
      }
    }
  }

  return null;
};
