// Landing.tsx
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
import defaultBg from '../assets/default-bg.jpg';

interface TransformProps {
  x?: number;
  y?: number;
  opacity?: number;
}

type VariantTransform = {
  [key: string]: {
    [elementClass: string]: TransformProps;
  };
};

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
    title: 'Uptask',
    tags: 'Fashion Innovation, Graphic Simplicity',
    description:
      'Innovative fashion web design with a core focus on simplicity and elegance.',
    bg: img2,
  },
  {
    img: img3,
    title: 'Nova',
    tags: 'Space Inspired, Modern Aesthetics',
    description:
      'A modern take on space-inspired designs blending technology and art.',
    bg: img3,
  },
  {
    img: img4,
    title: 'Flux',
    tags: 'Dynamic Layouts, Vibrant Colors',
    description:
      'Dynamic and colorful layouts that capture attention and engage users.',
    bg: img4,
  },
  {
    img: img5,
    title: 'Aura',
    tags: 'Serene Designs, Pastel Themes',
    description:
      'Creating calm and soothing user experiences through pastel-themed designs.',
    bg: img5,
  },
  {
    img: img6,
    title: 'Pulse',
    tags: 'Energetic Vibes, Bold Typography',
    description:
      'Harnessing energy and movement with bold typography and striking visuals.',
    bg: img6,
  },
  {
    img: img7,
    title: 'Zenith',
    tags: 'Peak Performance, Sleek Interfaces',
    description:
      'Designs focused on peak performance and sleek, intuitive interfaces.',
    bg: img7,
  },
  {
    img: img8,
    title: 'Echo',
    tags: 'Repetitive Patterns, Minimalist Touch',
    description:
      'Utilizing repetitive patterns to create harmony and balance in design.',
    bg: img8,
  },
  {
    img: img9,
    title: 'Lumen',
    tags: 'Light Themes, Clarity Focused',
    description:
      'Emphasizing clarity and readability through light-themed designs.',
    bg: img9,
  },
  {
    img: img10,
    title: 'Drift',
    tags: 'Fluid Movements, Abstract Forms',
    description:
      'Incorporating fluid movements and abstract forms for a unique user experience.',
    bg: img10,
  },
];

const Landing: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const previewBgRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const defaultClipPath: { [key: string]: string } = {
      'variant-1': 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
      'variant-2': 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
      'variant-3': 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
    };

    const variantTransform: VariantTransform = {
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
      for (const variant in defaultClipPath) {
        if (previewElement.classList.contains(variant)) {
          return defaultClipPath[variant];
        }
      }
      return 'polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)';
    };

    const applyVariantStyle = (
      previewElement: HTMLDivElement,
      reset: boolean = false
    ) => {
      const variant = mapClasses[Array.from(previewElement.classList).findIndex(cls => cls.startsWith('variant-'))];
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

    // Create preview elements
    previews.forEach((preview, index) => {
      const previewElement = document.createElement('div');
      previewElement.className = `preview ${mapClasses[index]} preview-${index + 1}`;
      previewElement.style.opacity = '0';
      previewElement.style.position = 'absolute';
      previewElement.style.top = '50%';
      previewElement.style.left = '50%';
      previewElement.style.transform = 'translate(-50%, -50%)';
      previewElement.style.pointerEvents = 'none';
      previewElement.innerHTML = `
        <div class="preview-img">
          <img src="${preview.img}" alt="${preview.title}" />
        </div>
        <div class="preview-title">
          <h1>${preview.title}</h1>
        </div>
        <div class="preview-tags">
          <p>${preview.tags}</p>
        </div>
        <div class="preview-description">
          <p>${preview.description}</p>
        </div>
      `;
      if (containerRef.current) {
        containerRef.current.appendChild(previewElement);
        applyVariantStyle(previewElement, true);
      }
    });

    let activePreview: HTMLDivElement | null = null;

    itemsRef.current.forEach((item, index) => {
      if (item) {
        item.addEventListener('mouseenter', () => {
          const newBg = previews[index].bg;
          changeBg(newBg);

          const newActivePreview = containerRef.current?.querySelector(
            `.preview-${index + 1}`
          ) as HTMLDivElement;

          if (activePreview && activePreview !== newActivePreview) {
            gsap.to(activePreview, {
              opacity: 0,
              duration: 0.5,
              ease: 'power3.out',
              onComplete: () => applyVariantStyle(activePreview!, true),
            });
          }

          gsap.to(newActivePreview, {
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out',
            onStart: () => applyVariantStyle(newActivePreview, false),
          });

          activePreview = newActivePreview;
        });

        item.addEventListener('mouseleave', () => {
          if (activePreview) {
            gsap.to(activePreview, {
              opacity: 0,
              duration: 0.5,
              ease: 'power3.out',
              onComplete: () => applyVariantStyle(activePreview!, true),
            });
            activePreview = null;
            changeBg(defaultBg);
          }
        });
      }
    });

    // Set initial background
    changeBg(defaultBg);
  }, []);

  return (
    <div className='w-full h-screen overflow-hidden fixed text-white bg-black'>
      {/* Nav Bar */}
      <nav className='w-full fixed flex pt-2 items-center justify-around gap-[300px]  z-50'>
        <div className='menu-btn w-fit bg-zinc-700 rounded-full backdrop-blur-md px-5 py-1 cursor-pointer'>
          <h1 className='text-[13px]'>Menu</h1>
        </div>
        <div className='logo  text-2xl'>
          <h1>NikoChAn</h1>
        </div>
        <div className='local-time text-sm'>
          <h1>ON 3:55PM</h1>
        </div>
      </nav>

      {/* Footer */}
      <div className='footer fixed px-10 bottom-0 text-xl flex items-center justify-between w-full z-50'>
        <p>Watch Showreel</p>
        <p>Collection 2024</p>
      </div>

      {/* Items List */}
      <div
        className='items fixed w-1/3 h-full flex flex-col px-12 text-2xl leading-tight capitalize justify-center z-30'
        >
        {previews.map((preview, index) => (
          <div
            key={index}
            className='item w-fit py-2 cursor-pointer'
            ref={(el) => (itemsRef.current[index] = el)}
          >
            <p>{preview.title}</p>
          </div>
        ))}
      </div>

      {/* Preview Background */}
      <div
        className='preview-bg fixed top-0 left-0 w-full h-full bg-cover bg-center z-10 transition-all duration-500 ease-out'
        ref={previewBgRef}
      ></div>

      {/* Preview Container */}
      <div
        className='preview-container fixed top-0 left-0 w-full h-full pointer-events-none z-20'
        ref={containerRef}
      ></div>
    </div>
  );
};

export default Landing;
