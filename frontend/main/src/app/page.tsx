import { GymPyc } from "./components/gym-pyc";
import { DiscountCart } from "./components/home/discount-cart";
import { HexSection } from "./components/home/movement-section";
import { MovmentSlider } from "./components/home/movement-slider";


export default function Home() {
  return (
    <div>
        <DiscountCart/> 
        <HexSection/>
        <GymPyc/>
        <MovmentSlider/>
    </div>
  )
}