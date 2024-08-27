import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
//... other imports

const mapClasses = [
  'variant-1',
  'variant-2',
  'variant-3',
  'variant-1',
  'variant-2',
  'variant-3',
  'variant-1',
  'variant-2',
  'variant-3',
  'variant-1',
];

const previews = [
  {
    img: img1,
    title: 'Ra',
    tags: 'Futuristic Fashion, Minimal Design',
    description:
      'Exploring the intersection of minimalism and future fashion trends in web design.',
    bg: img1,
  },
  //... other previews
];

const Landing: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previewBgRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const defaultClipPath: { [key: string]: string } = {
      'variant-1': 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
      'variant-2': 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
      'variant-3': 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
    };

    const variantTransform = {
      'variant-1': {
        title: { x: 75, opacity: 0 },
        tags: { y: -75, opacity: 0 },
        description: { x: -75, opacity: 0 },
      },
      'variant-2': {
        title: { x: -75, opacity: 0 },
        tags: { y: -75, opacity: 0 },
        description: { y: 75, opacity: 0 },
      },
      'variant-3': {
        title: { x: 75, opacity: 0 },
        tags: { y: 75, opacity: 0 },
        description: { x: 75, opacity: 0 },
      },
    };

    const getDefaultClipPath = (previewElement: HTMLDivElement): string => {
      if (!previewElement) return '';
      for (const variant in defaultClipPath) {
        if (previewElement.classList.contains(variant)) {
          return defaultClipPath[variant];
        }
      }
      return 'polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)';
    };

    const applyVariantStyle = (
      previewElement: HTMLDivElement | null,
      reset: boolean = false
    ) => {
      if (!previewElement) return;

      const variant = mapClasses.find(cls => previewElement.classList.contains(cls));
      if (variant && variantTransform[variant]) {
        Object.entries(variantTransform[variant]).forEach(
          ([elementClass, transform]) => {
            const element = previewElement.querySelector(
              `.preview-${elementClass}`
            ) as HTMLElement;
            if (element) {
              gsap.set(element, reset ? transform : { x: 0, y: 0, opacity: 1 });
            }
          }
        );
      }
    };

    const changeBg = (newImgSrc: string) => {
      if (previewBgRef.current) {
        gsap.to(previewBgRef.current, {
          backgroundImage: `url(${newImgSrc})`,
          duration: 0.5,
          ease: 'power3.out',
        });
      }
    };

    const changeTextContent = (title: string, tags: string, description: string) => {
      if (titleRef.current && tagsRef.current && descriptionRef.current) {
        gsap.to(titleRef.current, { opacity: 0, y: -20, duration: 0.2, onComplete: () => {
          titleRef.current!.textContent = title;
          gsap.to(titleRef.current!, { opacity: 1, y: 0, duration: 0.5 });
        }});
        gsap.to(tagsRef.current, { opacity: 0, y: -20, duration: 0.2, onComplete: () => {
          tagsRef.current!.textContent = tags;
          gsap.to(tagsRef.current!, { opacity: 1, y: 0, duration: 0.5 });
        }});
        gsap.to(descriptionRef.current, { opacity: 0, y: -20, duration: 0.2, onComplete: () => {
          descriptionRef.current!.textContent = description;
          gsap.to(descriptionRef.current!, { opacity: 1, y: 0, duration: 0.5 });
        }});
      }
    };

    let activePreview: HTMLDivElement | null = null;

    itemsRef.current.forEach((item, index) => {
      if (item) {
        item.addEventListener('mouseenter', () => {
          const newBg = previews[index]?.bg;
          changeBg(newBg);

          const newActivePreview = containerRef.current?.querySelector(
            `.preview-${index + 1}`
          ) as HTMLDivElement;

          if (activePreview && activePreview !== newActivePreview) {
            gsap.to(activePreview, {
              opacity: 0,
              duration: 0.5,
              ease: 'power3.out',
              onComplete: () => applyVariantStyle(activePreview, true),
            });
          }

          gsap.to(newActivePreview, {
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out',
            onStart: () => applyVariantStyle(newActivePreview, false),
          });

          activePreview = newActivePreview;

          // Change text content
          changeTextContent(previews[index].title, previews[index].tags, previews[index].description);
        });

        item.addEventListener('mouseleave', () => {
          if (activePreview) {
            gsap.to(activePreview, {
              opacity: 0,
              duration: 0.5,
              ease: 'power3.out',
              onComplete: () => applyVariantStyle(activePreview, true),
            });
          }
          activePreview = null;
          changeBg(defaultBg);
        });
      }
    });

    // Set default image and content
    changeBg(defaultBg);
    if (titleRef.current && tagsRef.current && descriptionRef.current) {
      titleRef.current.textContent = 'Ra';
      tagsRef.current.textContent = 'Futuristic Fashion, Minimal Design';
      descriptionRef.current.textContent = 'Exploring the intersection of minimalism and future fashion trends in web design.';
    }
  }, []);

  return (
    <div className="container" ref={containerRef}>
      <div className="preview-bg" ref={previewBgRef}></div>
      <div className="preview-content">
        <div className="preview-title" ref={titleRef}></div>
        <div className="preview-tags" ref={tagsRef}></div>
        <div className="preview-description" ref={descriptionRef}></div>
      </div>
      {mapClasses.map((mapClass, index) => (
        <div
          key={index}
          className={`item ${mapClass}`}
          ref={(el) => (itemsRef.current[index] = el)}
        >
          {/* Your item content here */}
        </div>
      ))}
      {/* Previews to apply animation */}
      {mapClasses.map((_, index) => (
        <div key={index} className={`preview-${index + 1} preview`} />
      ))}
    </div>
  );
};

export default Landing;
