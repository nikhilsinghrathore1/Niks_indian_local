import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.jpg';
import img6 from '../assets/img6.jpg';
import img7 from '../assets/img7.jpg';
import img8 from '../assets/img8.jpg';
import img9 from '../assets/img9.jpg';
import img10 from '../assets/img10.jpg';

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
  {
    img: img2,
    title: 'Akira',
    tags: 'Japanese Culture, Anime Aesthetics',
    description:
      'A deep dive into the cultural impact of Japanese anime in modern design.',
    bg: img2,
  },
  {
    img: img3,
    title: 'Aurora',
    tags: 'Nature, Gradient Colors',
    description:
      'The inspiration of natural phenomena in the gradient design trend.',
    bg: img3,
  },
  {
    img: img4,
    title: 'Neon City',
    tags: 'Cyberpunk, Urban Landscapes',
    description:
      'The gritty, neon-soaked world of cyberpunk as an urban design inspiration.',
    bg: img4,
  },
  {
    img: img5,
    title: 'Eclipse',
    tags: 'Dark Mode, Celestial Events',
    description:
      'The allure of dark mode and celestial events in contemporary web design.',
    bg: img5,
  },
  {
    img: img6,
    title: 'Sakura',
    tags: 'Cherry Blossoms, Seasonal Aesthetics',
    description:
      'Capturing the ephemeral beauty of cherry blossoms in seasonal web design.',
    bg: img6,
  },
  {
    img: img7,
    title: 'Retro Vibes',
    tags: '80s, Retro Design',
    description:
      'Bringing back the bold colors and patterns of the 80s in modern web design.',
    bg: img7,
  },
  {
    img: img8,
    title: 'Ocean Depths',
    tags: 'Marine Life, Cool Tones',
    description:
      'Diving deep into marine life as a source of inspiration for cool-toned designs.',
    bg: img8,
  },
  {
    img: img9,
    title: 'Solar Flare',
    tags: 'Space, Solar Events',
    description:
      'Exploring the fiery beauty of the sun and space in design elements.',
    bg: img9,
  },
  {
    img: img10,
    title: 'Mountain Mist',
    tags: 'Nature, Foggy Aesthetics',
    description:
      'The serene and mysterious vibes of foggy mountains in design.',
    bg: img10,
  },
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
        });
      }
    });

    // Set default image and content
    const defaultBg = img1;
    changeBg(defaultBg);
    if (titleRef.current && tagsRef.current && descriptionRef.current) {
      titleRef.current.textContent = previews[0]?.title || '';
      tagsRef.current.textContent = previews[0]?.tags || '';
      descriptionRef.current.textContent = previews[0]?.description || '';
    }

    return () => {
      itemsRef.current.forEach((item) => {
        if (item) {
          item.removeEventListener('mouseenter', () => {});
          item.removeEventListener('mouseleave', () => {});
        }
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="landing-container">
      <div ref={previewBgRef} className="preview-bg"></div>

      <div className="preview-content">
        <div ref={titleRef} className="preview-title"></div>
        <div ref={tagsRef} className="preview-tags"></div>
        <div ref={descriptionRef} className="preview-description"></div>
      </div>

      <div className="gallery">
        {previews.map((preview, index) => (
          <div
            key={index}
            ref={(el) => (itemsRef.current[index] = el)}
            className={`gallery-item variant-${(index % 3) + 1}`}
          >
            <img src={preview.img} alt={preview.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Landing;
