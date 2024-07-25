import { useCallback } from 'react';

const useCancel = (setSomething: React.Dispatch<React.SetStateAction<boolean>>) => {
  const toggle = useCallback(() => {
    setSomething((prev) => !prev);
  }, [setSomething]);

  const cancel = useCallback(() => {
    setSomething(false);
  }, [setSomething]);

  return { cancel, toggle };
};

export default useCancel;
