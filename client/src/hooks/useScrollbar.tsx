import { useState, useEffect } from 'react'

function useScrollbar(elementRef: React.RefObject<HTMLElement>) {
  const [containerHasScrollbar, setContainerHasScrollbar] = useState(false)

  useEffect(() => {
    const element = elementRef.current

    const checkScrollbar = () => {
      if (element) {
        const hasScrollbar = element.scrollHeight > element.clientHeight
        setContainerHasScrollbar(hasScrollbar)
      }
    }

    checkScrollbar()

    const resizeObserver = new ResizeObserver(checkScrollbar)

    if (element) {
      resizeObserver.observe(element)
    }

    return () => {
      if (element) {
        resizeObserver.unobserve(element)
      }
    }
  }, [elementRef])

  return [containerHasScrollbar]
}

export default useScrollbar
