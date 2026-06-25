import { Cart } from "@/app/ui/cart";

export function MdCard() {
    return(
        <Cart
        imgSrc="/leonkennedy.jpg"
        imgAlt="s kennedy "
        imgHeight={1000}
        imgWidth={900}
        size="md"
        variant="outlined"
        tone="secondary"
        className="rounded-4xl"
        title="titel"
        description="discription discription discription discription discription discription discription discription">
        </Cart>
    );
}