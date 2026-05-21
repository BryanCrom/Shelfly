import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

function useIsOverflowing<T extends HTMLElement>(
  openReview: boolean,
): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);

  const check = useCallback(() => {
    if (ref.current) {
      setIsOverflowing(ref.current.scrollWidth > ref.current.clientWidth);
    }
  }, []);

  useLayoutEffect(() => {
    check();
  }, [openReview, check]);

  useEffect(() => {
    check();
    const ro = new ResizeObserver(check);
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, [check]);

  return [ref, isOverflowing];
}

export default useIsOverflowing;
