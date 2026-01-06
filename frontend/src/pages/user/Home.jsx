import BestsellerProducts from "../../components/user/home/BestsellerProducts";
import Carousel from "../../components/user/home/Carousel";
import OurProducts from "../../components/user/home/OurProducts";
import ProductBanner from "../../components/user/home/ProductBanner";
import ProductList from "../../components/user/home/ProductList";
import ProductOffers from "../../components/user/home/ProductOffers";
import ServicesBar from "../../components/user/home/ServicesBar";

export default function Home() {
	return (
		<>
			<Carousel />
			<ServicesBar />
			<ProductOffers />
			<OurProducts />
			<ProductBanner />
			<ProductList />
			<BestsellerProducts />
		</>
	);
}
