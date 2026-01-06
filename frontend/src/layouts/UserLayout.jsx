import { Outlet } from "react-router-dom";
import Header from "../components/user/partial/Header";
import Navbar from "../components/user/partial/Navbar";
import Footer from "../components/user/partial/Footer";
import Spinner from "../components/user/partial/Spinner";

export default function UserLayout() {
	return (
		<>
			<Spinner />
			<Header />
			<Navbar />
			<Outlet />
			<Footer />
		</>
	);
}
