import "./App.css";
import Headers from "@/components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "@/components/Footer/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import CreateBlog from "./pages/CreateBlog";
import BlogDetail from "./pages/BlogDetail";
import BlogPage from "./pages/BlogPage";
import TourPage from "./pages/TourPage";
import TourDetail from "./pages/TourDetail";
import BookingPage from "./pages/BookingPage";
import HomePage from "./pages/HomePage";
function App() {
	return (
		<BrowserRouter>
			<div className="app ">
				<div className="container max-w-[1170px] mx-auto px-4 ">
					<Headers />
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route element={<PrivateRoute />}>
							<Route path="/dashboard" element={<Dashboard />} />
						</Route>
						<Route path="/create-blog" element={<CreateBlog />} />
						<Route path="/blog/:blogSlug" element={<BlogDetail />} />
						<Route path="/blog" element={<BlogPage />} />
						<Route path="/tour" element={<TourPage />} />
						<Route path="/tour/:tourSlug" element={<TourDetail />} />
						<Route path="/booking/:tourSlug" element={<BookingPage />} />
					</Routes>
					<Footer />
				</div>
			</div>
		</BrowserRouter>
	);
}
export default App;
