import gsap from 'gsap';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

function useSmoothScroll<TWrapper = HTMLElement, TContent = HTMLElement>() {
  const wrapperRef = useRef<TWrapper | null>(null)
  const contentRef = useRef<TContent | null>(null)

  useGSAP(() => {
    const body = document.body;
    const wrapper = wrapperRef.current;
    const content = contentRef.current;

    if (
      !(wrapper instanceof HTMLElement)
      || !(content instanceof HTMLElement)
    ) return () => {}

    const tl = gsap.timeline()

    function scroll() {
      if (!wrapper || !content) return
      const { maxScrollY, progress } = getScrollData();
      
      tl.clear()
      tl.to(content, {
        duration: 1,
        ease: 'power4.out',
        y: maxScrollY * -progress,
      })
    }

    function updateSize() {
      if (content instanceof Element) {
        const contentRect = content.getBoundingClientRect();
        const height = contentRect.y + window.scrollY + contentRect.height + 'px';

        if (body.style.height !== height) {
          body.style.height = height;
        }
      }
    }

    function getScrollData() {
      return {
        progress: window.scrollY / (body.scrollHeight - window.innerHeight),
        scrollHeight: body.scrollHeight,
        maxScrollY: body.scrollHeight - window.innerHeight
      };
    }

    wrapper.style.position = 'fixed';
    wrapper.style.width = '100%';
    content.style.position = 'relative';
    content.style.transition = '1s cubic-bezier(.16,.49,.23,1)';
    content.style.willChange = 'transform';

    const data = {
      contentHeight: content.getBoundingClientRect().height || 0
    }

    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach((entry) => {
        const target = entry.target;
        const rect = target.getBoundingClientRect();

        if (rect.height !== data.contentHeight) {
          data.contentHeight = rect.height;
          updateSize();
        }
      });
    });
    resizeObserver.observe(content);
    updateSize();

    window.addEventListener('scroll', scroll);

    return () => {
      window.removeEventListener('scroll', scroll);
    };
  }, [wrapperRef, contentRef])

  return [wrapperRef, contentRef]
}

export default useSmoothScroll;