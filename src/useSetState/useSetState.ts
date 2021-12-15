import { useCallback, useState } from 'react';

export const useSetState = <T extends object>(
  initialState: T = {} as T
): [T, (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void] => {
  const [state, set] = useState<T>(initialState);
  const setState = useCallback((patch) => {
    set((prevState) => {
      console.log(prevState, patch);
      const result = {
        ...prevState,
        ...(patch instanceof Function ? patch(prevState) : patch),
      };
      console.log(result);
      return result;
    });
  }, []);

  return [state, setState];
};
