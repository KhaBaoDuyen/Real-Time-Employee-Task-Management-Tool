import logo from "/assets/images/logo-light.png";
import { motion } from "framer-motion";
//COMPONENTS
import { Search } from "~/components/UI/Search";
import { ButtonAnimation } from "~/components/UI/buttonAnimation/buttonAnimation";
import { ImagesForcus } from "~/components/UI/ImagesForcus/ImagesForcus";
import { CategoryBannerSlide } from "~/components/UI/ImagesBannerSlider/ImagesBannerSlider";
import { ProductByCategogy, SliderProductByCategogy } from "~/components/UI/ProductByCategogy/ProductByCategogy";

//UTILS
import { useMediaQuery } from "~/hooks/useMediaQuery";

//DATA
import { dataButton } from "./home.data";
import { use } from "framer-motion/client";
export default function HomePage() {
  const isMobile = useMediaQuery("(max-width: 1023px)");

  return (
    <>

      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="lg:w-10/12 w-full mx-auto lg:my-5 ">
            <div className="min-h-full lg:py-20 py-10 bg-banner bg-no-repeat flex items-center justify-center 
      lg:rounded-4xl  shadow-lg flex-col">
              <img src={logo} alt="Logo" className="lg:w-3/12 w-6/12" />
              <h1 className="font-bold px-5 py-3 text-center title-lg-primary-600 lg:text-[4rem] text-[2rem]">
                Chào mừng đến với cửa hàng thiết bị gaming <span className="text-accent-600">Yejara</span>
              </h1>
              <span className="lg:w-7/12 w-10/12 bg-white/20 p-3 rounded-md shadow-lg">
                <Search showOnMobile={true} width="w-12/12" />
              </span>
              <span className="flex flex-wrap lg:w-6/12 w-10/12 justify-center mt-5 lg:gap-3 gap-2">
                {dataButton.map((button, index) => (
                  <ButtonAnimation
                    key={index}
                    name={button.name}
                    path={button.path}
                    imageAlt={button.imageAlt} />
                ))}
              </span>
            </div>
          </div>
        </motion.div>

        <div className="absolute lg:-bottom-40 mt-5  lg:w-[70%] w-[90%] left-[5%]
       lg:left-[15%] lg:p-5 rounded-md lg:rounded-3xl  bg-white to-transparent">
          {isMobile ? <CategoryBannerSlide /> : <ImagesForcus />}
        </div>
      </div>

      <div className=" py-5 lg:mt-52 mt-20 mb-10 mx-auto px-5">
        <SliderProductByCategogy />
      </div>
    </>
  );
}