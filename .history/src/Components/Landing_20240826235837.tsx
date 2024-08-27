import gsap from 'gsap';
import React, { useEffect } from 'react';
import img from "../assets/first.jpg";

const mapClasses = [
  "varient-1",
  "varient-2",
  "varient-3",
  "varient-1",
  "varient-2",
  "varient-3",
  "varient-1",
  "varient-2",
  "varient-3",
  "varient-1",
];

const previews = [
  {
    img: "",
    title: "Ra",
    tags: "Futuristic Fashion , Minimal Design",
    description: "Exploring the intersection of minimalism and future fashion trends in web design."
  },
  {
    img: "",
    title: "Uptask",
    tags: "Fashion Innovation , Graphic Simplicity",
    description: "Innovative fashion web design with a core focus on simplicity and elegance."
  },
  // Add other previews as necessary
];

const Landing = () => {

  useEffect(() => {
    const container = document.querySelector(".container");
    const previewBg = document.querySelector(".preview-bg");
    const items = document.querySelectorAll(".item");

    let activePreview = document.querySelector(".preview-default");
    let isMouseOverItem = false;

    const defaultClipPath = {
      "varient-1": "polygon(0% 100% , 100% 100% , 100% 100% , 0% 100%)",
      "varient-2": "polygon(100% 0% , 100% 0% , 100% 100% , 100% 100%)",
      "varient-3": "polygon(0% 0% ,0% 0% , 0% 100% , 0% 100%)",
    };

    const varientTransform = {
      "varient-1": {
        title: { x: 75, opacity: 0 },
        tags: { y: -75, opacity: 0 },
        description: { x: -75, opacity: 0 },
      },
      "varient-2": {
        title: { x: -75, opacity: 0 },
        tags: { y: -75, opacity: 0 },
        description: { y: 75, opacity: 0 },
      },
      "varient-3": {
        title: { x: 75, opacity: 0 },
        tags: { y: 75, opacity: 0 },
        description: { x: 75, opacity: 0 },
      }
    };

    function getDefaultClipPath(previewElement) {
      for (const varient in defaultClipPath) {
        if (previewElement.classList.contains(varient)) {
          return defaultClipPath[varient];
        }
      }
      return "polygon(100% 0%, 0% 0%, 0% 100% , 100% 100%)";
    }

    function applyVarientStyle(previewElement) {
      const varient = previewElement.className.split(" ").find((className) => className.startsWith("varient-"));
      if (varient && varientTransform[varient]) {
        Object.entries(varientTransform[varient]).forEach(([elementClass, transform]) => {
          const element = previewElement.querySelector(`.preview-${elementClass}`);
          if (element) {
            gsap.set(element, transform);
          }
        });
      }
    }

    function changeBg(newImgSrc) {
      const newImg = document.createElement("img");
      newImg.src = newImgSrc;
      newImg.style.position = "absolute";
      newImg.style.top = "0";
      newImg.style.left = "0";
      newImg.style.width = "100%";
      newImg.style.height = "100%";
      newImg.style.objectFit = "cover";
      newImg.style.opacity = "0";
      previewBg?.appendChild(newImg);
      gsap.to(newImg, { opacity: 1, duration: 0.5 });

      if (previewBg?.children.length > 1) {
        const oldImg = previewBg?.children[0];
        gsap.to(oldImg, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            previewBg?.removeChild(oldImg);
          }
        });
      }
    }

    previews.forEach((preview, index) => {
      const previewElement = document.createElement("div");
      previewElement.className = `preview ${mapClasses[index]} preview-${index + 1}`;
      previewElement.innerHTML = `
        <div className="preview-img"><img src="${preview.img}" alt=""/></div>
        <div className="preview-title"><h1>${preview.title}</h1></div>
        <div className="preview-tags"><p>${preview.tags}</p></div>
        <div className="preview-description"><p>${preview.description}</p></div>
      `;

      container?.appendChild(previewElement);
      applyVarientStyle(previewElement);
    });

    items.forEach((item, index) => {
      item.addEventListener("mouseenter", () => {
        isMouseOverItem = true;
        const newBg = `./assets/bg-${index + 1}.jpg`;
        changeBg(newBg);

        const newActivePreview = document.querySelector(`.preview-${index + 1}`);
        if (activePreview && activePreview !== newActivePreview) {
          const previousActivePreview = activePreview.querySelector(".preview-img");
          const previousDefaultClipPath = getDefaultClipPath(activePreview);
          gsap.to(previousActivePreview, {
            clipPath: previousDefaultClipPath,
            duration: 0.75,
            ease: "power3.out"
          });
          gsap.to(activePreview, {
            opacity: 0,
            duration: 0,
            delay: 0.2,
          });
          applyVarientStyle(activePreview, true);
        }
        gsap.to(newActivePreview, { opacity: 1, duration: 0.1 });

        const elementsToAnimate = ["title", "tags", "description"];
        elementsToAnimate.forEach((el) => {
          const element = newActivePreview?.querySelector(`.preview-${el}`);
          if (element) {
            gsap.to(element, { x: 0, y: 0, opacity: 1, duration: 0.5 });
          }
        });
        const activePreviewImg = activePreview?.querySelector(".preview-img");
        gsap.to(activePreviewImg, {
          clipPath: "polygon(0% 0% , 100% 0%, 100% 100% , 0% 100%)",
          duration: 1,
          ease: "power3.out"
        });
        activePreview = newActivePreview;
      });

      item.addEventListener("mouseleave", () => {
        isMouseOverItem = false;
        applyVarientStyle(activePreview, true);
        setTimeout(() => {
          if (!isMouseOverItem) {
            changeBg("./assets/default-bg.jpg");
            if (activePreview) {
              gsap.to(activePreview, { opacity: 0, duration: 0.1 });
              const defaultPreview = document.querySelector(".preview.default");
              activePreview = defaultPreview;

              const activePreviewImg = activePreview?.querySelector(".preview-img");
              const defaultClipPath = getDefaultClipPath(activePreview);
              gsap.to(activePreviewImg, {
                clipPath: defaultClipPath,
                duration: 1,
                ease: "power3.out"
              });
            }
          }
        }, 100);
      });
    });
  }, []);

  return (
    <div className='w-full h-screen overflow-hidden fixed text-white bg-black'>
      {/* NavBar */}
      <nav className='w-full fixed px-10 flex items-center justify-around text-xl'>
        <div className='menu-btn w-fit bg-zinc-700 rounded-[40px] backdrop-blur-[20px] px-[20px] py-[6px]'>
          <h1>Menu</h1>
        </div>
        <div className='logo text-2xl'>
          <h1>NikoChan</h1>
        </div>
        <div className='local-time text-[12px]'>
          <h1>ON 3:55PM</h1>
        </div>
      </nav>
      {/* Footer */}
      <div className='footer fixed px-10 bottom-0 text-xl flex items-center justify-between w-full'>
        <p>Watch Showreel</p>
        <p>Collection 2024</p>
      </div>
      {/* Items */}
      <div className='items fixed w-[30%] z-30 h-full flex flex-col px-[3em] text-[23px] leading-none capitalize justify-center'>
        {Array.from({ length: 10 }).map((_, idx) => (
          <div key={idx} className="item w-fit py-[0.25em] cursor-pointer">
            <h1 className='leading-none'>Item-{idx + 1}</h1>
          </div>
        ))}
      </div>
      {/* Background and Preview */}
      <div className="preview-bg w-full fixed h-full z-[-1]"></div>
      <div className="container"></div>
    </div>
  );
}

export default Landing;
