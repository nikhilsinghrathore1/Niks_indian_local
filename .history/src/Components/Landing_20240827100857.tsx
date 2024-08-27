import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import img from "../assets/first.jpg"


interface TransformProps {
  x?: number;
  y?: number;
  opacity?: number;
}

type VarientTransform = {
  [key: string]: {
    [elementClass: string]: TransformProps;
  };
};


const mapClasses =[
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
] 

const previews = [
  {
    img:"",
    title:"Ra",
    tags:"Futuristic Fashion , Minimal Design",
    description:"Exploring the intersection of minimalism and future fashing trends in web design."
  },
  {
    img:"",
    title:"Uptask",
    tags:"Fashion Innovation , Graphic Simplicity",
    description:"Innovation fashion web design with a core focus on simplicity and elegance."
  },
  {
    img:"",
    title:"Ra",
    tags:"Futuristic Fashion , Minimal Design",
    description:"Exploring the intersection of minimalism and future fashing trends in web design."
  },
  {
    img:"",
    title:"Uptask",
    tags:"Fashion Innovation , Graphic Simplicity",
    description:"Innovation fashion web design with a core focus on simplicity and elegance."
  },
  {
    img:"",
    title:"Ra",
    tags:"Futuristic Fashion , Minimal Design",
    description:"Exploring the intersection of minimalism and future fashing trends in web design."
  },
  {
    img:"",
    title:"Uptask",
    tags:"Fashion Innovation , Graphic Simplicity",
    description:"Innovation fashion web design with a core focus on simplicity and elegance."
  },
  {
    img:"",
    title:"Ra",
    tags:"Futuristic Fashion , Minimal Design",
    description:"Exploring the intersection of minimalism and future fashing trends in web design."
  },
  {
    img:"",
    title:"Uptask",
    tags:"Fashion Innovation , Graphic Simplicity",
    description:"Innovation fashion web design with a core focus on simplicity and elegance."
  },
  {
    img:"",
    title:"Ra",
    tags:"Futuristic Fashion , Minimal Design",
    description:"Exploring the intersection of minimalism and future fashing trends in web design."
  },
  {
    img:"",
    title:"Uptask",
    tags:"Fashion Innovation , Graphic Simplicity",
    description:"Innovation fashion web design with a core focus on simplicity and elegance."
  },
]

  const Landing = () => {
    
    const containerRef = useRef<HTMLDivElement>(null);
    const previewBgRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<HTMLDivElement[]>([]);
  
    useEffect(() => {
      const defaultClipPath: { [key: string]: string } = {
        "varient-1": "polygon(0% 100% , 100% 100% , 100% 100% , 0% 100%)",
        "varient-2": "polygon(100% 0% , 100% 0% , 100% 100% , 100% 100%)",
        "varient-3": "polygon(0% 0% ,0% 0% , 0% 100% , 0% 100%)",
      };
  
      const varientTransform: VarientTransform = {
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
        },
      };
  
      function getDefaultClipPath(PreviewElement: HTMLDivElement): string {
        for (const varient in defaultClipPath) {
          if (PreviewElement.classList.contains(varient)) {
            return defaultClipPath[varient];
          }
        }
        return "polygon(100% 0%, 0% 0%, 0% 100% , 100% 100% )";
      }
  
      function applyVarientStyle(
        PreviewElement: HTMLDivElement,
        reset: boolean = false
      ) {
        const varient = PreviewElement.className
          .split(" ")
          .find((className) => className.startsWith("varient-"));
        if (varient && varientTransform[varient]) {
          Object.entries(varientTransform[varient]).forEach(
            ([elementClass, transform]) => {
              const element = PreviewElement.querySelector(
                `.preview-${elementClass}`
              ) as HTMLElement;
              if (element) {
                gsap.set(element, transform);
              }
            }
          );
        }
      }
      function changeBg(newimgSrc: string) {
        const newImg = document.createElement("img");
        newImg.src = newimgSrc;
        newImg.style.position = "absolute";
        newImg.style.top = "0";
        newImg.style.left = "0";
        newImg.style.width = "100%";
        newImg.style.height = "100%";
        newImg.style.objectFit = "cover";
        newImg.style.opacity = "0";
        previewBgRef.current?.appendChild(newImg);
        gsap.to(newImg, { opacity: 1, duration: 0.5 });
      
        if (previewBgRef.current?.children.length! > 1) {
          const oldImg = previewBgRef.current?.children[0] as HTMLImageElement;
          gsap.to(oldImg, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              previewBgRef.current?.removeChild(oldImg);
            },
          });
        }
      }
  
      previews.forEach((preview, index) => {
        const PreviewElement = document.createElement("div");
        PreviewElement.className = `preview ${mapClasses[index]} preview-${
          index + 1
        }`;
        PreviewElement.innerHTML = `
          <div className="preview-img"><img src="${preview.img}" alt=""/></div>
          <div className="preview-title"><h1>${preview.title}</h1></div>
          <div className="preview-tags"><p>${preview.tags}</p></div>
          <div className="preview-description"><p>${preview.description}</p></div>
        `;
  
        containerRef.current?.appendChild(PreviewElement);
        applyVarientStyle(PreviewElement);
      });
  
      itemsRef.current.forEach((item, index) => {
        let activePreview: HTMLDivElement | null = null;
  
        item.addEventListener("mouseenter", () => {
          const newBg = `./assets/bg-${index + 1}.jpg`;
          changeBg(newBg);
  
          const newActivePreview = document.querySelector(
            `.preview-${index + 1}`
          ) as HTMLDivElement;
          if (activePreview && activePreview !== newActivePreview) {
            const previousActivePreview = activePreview.querySelector(
              ".preview-img"
            ) as HTMLElement;
            const previousDefaultClipPath = getDefaultClipPath(activePreview);
            gsap.to(previousActivePreview, {
              clipPath: previousDefaultClipPath,
              duration: 0.75,
              ease: "power3.out",
            });
            gsap.to(activePreview, {
              opacity: 0,
              duration: 0,
              delay: 0.2,
            });
            applyVarientStyle(activePreview, true);
          }
          gsap.to(newActivePreview, { opacity: 1, duration: 0.1 });
  
          const elementToAnimate = ["title", "tags", "description"];
          elementToAnimate.forEach((el) => {
            const element = newActivePreview.querySelector(
              `.preview-${el}`
            ) as HTMLElement;
            if (element) {
              gsap.to(element, { x: 0, y: 0, opacity: 1, duration: 0.5 });
            }
          });
          const activePreviewImg = activePreview?.querySelector(
            ".preview-img"
          ) as HTMLElement;
          gsap.to(activePreviewImg, {
            clipPath: "polygon(0% 0% , 100% 0%, 100% 100% , 0% 100%)",
            duration: 1,
            ease: "power3.out",
          });
  
          activePreview = newActivePreview;
        });
  
        item.addEventListener("mouseleave", () => {
          applyVarientStyle(activePreview!, true);
  
          setTimeout(() => {
            changeBg("./assets/default-bg.jpg");
            if (activePreview) {
              gsap.to(activePreview, { opacity: 0, duration: 0.1 });
              const defaultPreview = document.querySelector(
                ".preview-default"
              ) as HTMLDivElement;
              activePreview = defaultPreview;
  
              const activePreviewImg = activePreview?.querySelector(
                ".preview-img"
              ) as HTMLElement;
              const defaultClipPath = getDefaultClipPath(activePreview);
              gsap.to(activePreviewImg, {
                clipPath: defaultClipPath,
                duration: 1,
                ease: "power3.out",
              });
            }
          }, 100);
        });
      });
    }, []);


  return (
    <div className=' w-full h-screen f1 overflow-hidden fixed text-white bg-black'>
               {/* this is the nav-bar */}
               <nav className='w-full fixed px-10 flex items-center  justify-around text-xl'>
                              <div className='menu-btn w-fit bg-zinc-700 rounded-[40px] backdrop-blur-[20px] px-[20px] py-[6px]'>
                                             <h1>Menu</h1>
                              </div>
                              <div className='logo text-2xl '>
                                             <h1>NikoChan</h1>
                              </div>
                              <div className='local-time text-[12px]'>
                                             <h1>ON 3:55PM</h1>
                              </div>
               </nav>
               {/* this is the footer */}
               <div className='footer fixed px-10 bottom-0 text-xl flex items-center justify-between w-full '>
                              <p>watch Showreel</p>
                              <p>Collection 2024</p>
               </div>
               {/* this is the section that contains all the items name */}
               <div className='items fixed w-[30%] z-30 h-full flex flex-col px-[3em] text-[23px] leading-none capitalize justify-center z-2'>
                              <div className="item w-fit py-[0.25em] cursor-pointer">
                                <p>item name</p>
                              </div>
                              <div className="item w-fit py-[0.25em] cursor-pointer">
                                <p>item name</p>
                              </div>
                              <div className="item w-fit py-[0.25em] cursor-pointer">
                                <p>item name</p>
                              </div>
                              <div className="item w-fit py-[0.25em] cursor-pointer">
                                <p>item name</p>
                              </div>
                              <div className="item w-fit py-[0.25em] cursor-pointer">
                                <p>item name</p>
                              </div>
                              <div className="item w-fit py-[0.25em] cursor-pointer">
                                <p>item name</p>
                              </div>
                              <div className="item w-fit py-[0.25em] cursor-pointer">
                                <p>item name</p>
                              </div>
                              <div className="item w-fit py-[0.25em] cursor-pointer">
                                <p>item name</p>
                              </div>
                              <div className="item w-fit py-[0.25em] cursor-pointer">
                                <p>item name</p>
                              </div>
                              <div className="item w-fit py-[0.25em] cursor-pointer">
                                <p>item name</p>
                              </div>
                           
    
               </div>


                <div className='preview-bg'>
                  <img className='w-full h-full object-cover ' src={img} alt="not showign" />
                </div>

    </div>

  )
}

export default Landing;



