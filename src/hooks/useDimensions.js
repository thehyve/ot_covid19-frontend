import { useEffect, useState } from 'react';

function useDimensions(ref) {
  const [rect, setRect] = useState({});

  const onResize = () =>
    requestAnimationFrame(() => {
      setRect(ref.current.getBoundingClientRect());
    });

  useEffect(() => {
    const measuredContainer = ref.current;

    setRect(measuredContainer.getBoundingClientRect());
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return rect;
}

export default useDimensions;
