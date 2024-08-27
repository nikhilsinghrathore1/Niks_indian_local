import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import img from '../assets/first.jpg';

type Preview = {
  img: string;
  title: string;
  tags: string;
  description: string;
};

const mapClasses = [
  'varient-1',
  'varient-2',
  'varient-3',
  'varient-1',
  'varient-2',
  'varient-3',
  'varient-1',
  'varient-2',
  'varient-3',
  'varient-1',
];

const previews: Preview[] = [
  {
    img: '',
    title: 'Ra',
    tags: 'Futuristic Fashion , Minimal Design',
    description: 'Exploring the intersection of minimalism and future fashion trends in web design.',
  },
  {
    img: '',
    title: 'Uptask',
    tags: 'Fashion Innovation , Graphic Simplicity',
    description: 'Innovation fashion web design with a core focus on simplicity and elegance.',
  },
  // ... (Other preview objects)
];

const Landing: React.FC = () => {
  const [activePreview, setActivePreview] = useState<HTMLElement | null>(null);
  const [isMouseOverItem, setIsMouseOverItem] = useState<boolean>(false);

  useEffect(() => {
    const container = document.querySelector('.container');
    const previewBg = document.querySelector('.preview-bg') as HTMLElement;
    const items = document.querySelectorAll('.item');

    const defaultClipPath: { [key: string]: string } = {
      'varient-1': 'polygon(0% 100% , 100% 100% , 100% 100% , 0% 100%)',
      'varient-2': 'polygon(100% 0% , 100% 0% , 100% 100% , 100% 100%)',
      'varient-3': 'polygon(0% 0% ,0% 0% , 0% 100% , 0% 100%)',
    };

    const varientTransform: {
      [key: string]: { [key: string]: { x?: number; y?: number; opacity: number } };
    } = {
      'varient-1': {
        title: { x: 75, opacity: 0 },
        tags: { y: -75, opacity: 0 },
        description: { x: -75, opacity: 0 },
      },
      'varient-2': {
        title: { x: -75, opacity: 0 },
        tags: { y: -75, opacity: 0 },
        description: { y: 75, opacity: 0 },
      },
      'varient-3': {
        title: { x: 75, opacity: 0 },
        tags: { y: 75, opacity: 0 },
        description: { x: 75, opacity: 0 },
      },
    };

    const getDefaultClipPath = (previewElement: HTMLElement): string => {
      for (const variant in defaultClipPath) {
        if (previewElement.classList.contains(variant)) {
          return defaultClipPath[variant];
        }
      }
      return 'polygon(100% 0%, 0% 0%, 0% 100% , 100% 100%)';
    };

    const applyVarientStyle = (previewElement: HTMLElement, reset = false): void => {
      const variant = previewElement.className.split(' ').find((className) => className.startsWith('varient-'));
      if (variant && varientTransform[variant]) {
        Object.entries(varientTransform[variant]).forEach(([elementClass, transform]) => {
          const element = previewElement.querySelector(`.preview-${elementClass}`) as HTMLElement;
          if (element) {
            gsap.set(element, reset ? { x: 0, y: 0, opacity: 1 } : transform);
          }
        });
      }
    };

    const changeBg = (newImgSrc: string): void => {
      const newImg = document.createElement('img');
      newImg.src = newImgSrc;
      newImg.style.position = 'absolute';
      newImg.style.top = '0';
      newImg.style.left = '0';
      newImg.style.width = '100%';
      newImg.style.height = '100%';
      newImg.style.objectFit = 'cover';
      newImg.style.opacity = '0';
      previewBg?.appendChild(newImg);
      gsap.to(newImg, { opacity: 1, duration: 0.5 });

      if (previewBg?.children.length > 1) {
        const oldImg = previewBg?.children[0];
        gsap.to(oldImg, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            previewBg?.removeChild(oldImg);
          },
        });
      }
    };

    previews.forEach((preview, index) => {
      const previewElement = document.createElement('div');
      previewElement.className = `preview ${mapClasses[index]} preview-${index + 1}`;
      previewElement.innerHTML = `
        <div class="preview-img"><img src="${preview.img}" alt=""/></div>
        <div class="preview-title"><h1>${preview.title}</h1></div>
        <div class="preview-tags"><p>${preview.tags}</p></div>
        <div class="preview-description"><p>${preview.description}</p></div>
      `;

      container?.appendChild(previewElement);
      applyVarientStyle(previewElement);
    });

    items.forEach((item, index) => {
      item.addEventListener('mouseenter', () => {
        setIsMouseOverItem(true);
        const newBg = `./assets/bg-${index + 1}.jpg`;
        changeBg(newBg);

        const newActivePreview = document.querySelector(`.preview-${index + 1}`) as HTMLElement;
        if (activePreview && activePreview !== newActivePreview) {
          const previousActivePreview = activePreview.querySelector('.preview-img') as HTMLElement;
          const previousDefaultClipPath = getDefaultClipPath(activePreview);
          gsap.to(previousActivePreview, {
            clipPath: previousDefaultClipPath,
            duration: 0.75,
            ease: 'power3.out',
          });
          gsap.to(activePreview, {
            opacity: 0,
            duration: 0,
            delay: 0.2,
          });
          applyVarientStyle(activePreview, true);
        }
        gsap.to(newActivePreview, { opacity: 1, duration: 0.1 });

        const elementsToAnimate = ['title', 'tags', 'description'];
        elementsToAnimate.forEach((el) => {
          const element = newActivePreview.querySelector(`.preview-${el}`) as HTMLElement;
          if (element) {
            gsap.to(element, { x: 0, y: 0, opacity: 1, duration: 0.5 });
          }
        });
        const activePreviewImg = newActivePreview.querySelector('.preview-img') as HTMLElement;
        gsap.to(activePreviewImg, {
          clipPath: 'polygon(0% 0% , 100% 0%, 100% 100% , 0% 100%)',
          duration: 1,
          ease: 'power3.out',
        });

        setActivePreview(newActivePreview);
      });

      item.addEventListener('mouseleave', () => {
        setIsMouseOverItem(false);
        applyVarientStyle(activePreview as HTMLElement, true);
        setTimeout(() => {
          if (!isMouseOverItem) {
            changeBg('./assets/default-bg.jpg');
            if (activePreview) {
              gsap.to(activePreview, { opacity: 0, duration: 0.1 });
              const defaultPreview = document.querySelector('.preview.default') as HTMLElement;
              setActivePreview(defaultPreview);

              const activePreviewImg = activePreview?.querySelector('.preview-img') as HTMLElement;
              const defaultClipPath = getDefaultClipPath(activePreview);
              gsap.to(activePreviewImg, {
                clipPath: defaultClipPath,
                duration: 1,
                ease: 'power3.out',
              });
            }
          }
        }, 100);
      });
    });
  }, [activePreview, isMouseOverItem]);

  return (
    <div className="w-full h-screen f1 overflow-hidden fixed text-white bg-black">
      {/* Nav-bar */}
      <nav className="w-full fixed px-10 flex items-center justify-around text-xl">
        <div className="menu-btn w-fit bg-zinc-700 rounded-[40px] backdrop-blur-[20px] px-[20px] py-[6px]">
          <h1>Menu</h1>
        </div>
        <div className="logo text-2xl">
          <h1>NikoChan</h1>
        </div>
        <div className="local-time text-[12px]">
          <h1>ON 3:55PM</h1>
        </div>
      </nav>
      {/* Footer */}
      <div className="footer fixed px-10 bottom-0 text-xl flex items-center justify-between w-full">
        <p>watch Showreel</p>
        <p>Collection 2024</p>
      </div>
      {/* Items Section */}
      <div className="items fixed w-[30%] h-full right-0 z-50 flex flex-col items-center justify-center">
        <div className="item w-[70%] h-[10%] flex items-center justify-center border-b-[1px] border-t-[1px] border-white">
          <h1 className="text-[24px]">Ra</h1>
        </div>
        <div className="item w-[70%] h-[10%] flex items-center justify-center border-b-[1px] border-white">
          <h1 className="text-[24px]">Uptask</h1>
        </div>
        <div className="item w-[70%] h-[10%] flex items-center justify-center border-b-[1px] border-white">
          <h1 className="text-[24px]">Knights Doodle</h1>
        </div>
        <div className="item w-[70%] h-[10%] flex items-center justify-center border-b-[1px] border-white">
          <h1 className="text-[24px]">Clevest</h1>
        </div>
        <div className="item w-[70%] h-[10%] flex items-center justify-center border-b-[1px] border-white">
          <h1 className="text-[24px]">Revolution</h1>
        </div>
        <div className="item w-[70%] h-[10%] flex items-center justify-center border-b-[1px] border-white">
          <h1 className="text-[24px]">Crayon</h1>
        </div>
        <div className="item w-[70%] h-[10%] flex items-center justify-center border-b-[1px] border-white">
          <h1 className="text-[24px]">Animate X</h1>
        </div>
        <div className="item w-[70%] h-[10%] flex items-center justify-center border-b-[1px] border-white">
          <h1 className="text-[24px]">Inspire</h1>
        </div>
        <div className="item w-[70%] h-[10%] flex items-center justify-center border-b-[1px] border-white">
          <h1 className="text-[24px]">Moonlit</h1>
        </div>
        <div className="item w-[70%] h-[10%] flex items-center justify-center border-b-[1px] border-white">
          <h1 className="text-[24px]">Crossfire</h1>
        </div>
      </div>
      {/* Preview Background */}
      <div className="preview-bg fixed w-[70%] h-full left-0 bg-black"></div>
      {/* Preview Items */}
      <div className="container absolute w-full h-full top-0 left-0"></div>
    </div>
  );
};

export default Landing;
