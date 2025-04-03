import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const TourDetail = () => {
	const { tourSlug } = useParams();
	const [error, setError] = useState(false);
	const [tour, setTour] = useState(null);
	useEffect(() => {
		const fetchTour = async () => {
			try {
				const res = await fetch(`/api/tour/get-tours?slug=${tourSlug}`);
				const data = await res.json();
				if (!res.ok) {
					setError(true);
					return;
				}
				if (res.ok) {
					setTour(data.tours[0]);
					setError(false);
				}
			} catch (error) {
				setError(true);
			}
		};
		fetchTour();
	}, [tourSlug]);
	return (
		<div className="max-w-4xl mx-auto p-4">
			{/* Breadcrumbs */}
			<nav className="text-sm mb-4">
				<ul className="flex items-center">
					<li>
						<a href="#" className="text-gray-600">
							Home
						</a>
					</li>
					<li className="mx-1">/</li>
					<li>
						<a href="#" className="text-gray-600">
							Tours
						</a>
					</li>
					<li className="mx-1">/</li>
					<li className="text-gray-800">Tour Title</li>
				</ul>
			</nav>

			{/* Title and Rating */}
			<h1 className="text-2xl font-bold mb-2">{tour && tour.title}</h1>
			<div className="flex items-center mb-6">
				<span className="mr-2">4.7</span>
				<div className="flex text-yellow-500 mr-2">
					<span>★</span>
					<span>★</span>
					<span>★</span>
					<span>★</span>
					<span>★</span>
				</div>
				<span className="text-gray-500">15 đánh giá</span>
			</div>

			{/* Main Content Grid */}
			<div className="flex flex-col md:flex-row gap-4 mb-8">
				{/* Left Side - Images */}
				<div className="md:w-2/3">
					<div className="grid grid-cols-4 gap-2">
						<div className="col-span-1 space-y-2 overflow-hidden h-96">
							{tour &&
								tour.image.slice(1, 5).map((item, index) => (
									<div
										key={index}
										className="border-2 border-orange-500 rounded overflow-hidden h-24"
									>
										<img
											src={item}
											alt="Food thumbnail"
											className="w-full h-full object-cover"
										/>
									</div>
								))}
						</div>
						<div className="col-span-3 border-2 border-orange-500 rounded overflow-hidden h-96">
							<img
								src={tour && tour.image[0]}
								alt="Main food image"
								className="w-full h-full object-cover"
							/>
						</div>
					</div>
				</div>

				{/* Right Side - Booking Info */}
				<div className="md:w-1/3">
					<div className="bg-white p-4 rounded shadow">
						<div className="mb-4">
							<p className="font-medium mb-2">Giá:</p>
							<p className="text-orange-500 font-bold text-xl">
								{tour && tour.price} đ / Khách
							</p>
						</div>
						<div className="mb-4">
							<p className="mb-1">Thời lượng: {tour && tour.duration}</p>
							<p className="mb-1">Số người: {tour && tour.participants}</p>
							<p className="mb-4">Hình thức: Ăn thực truyền thống</p>
						</div>
						<button className="bg-white text-orange-500 border border-orange-500 rounded w-full py-2 mb-2 hover:bg-orange-50">
							Thêm vào yêu thích
						</button>
						<Link to={`/booking/${tourSlug}`}>
							<button className="bg-orange-500 text-white rounded w-full py-2 hover:bg-orange-600">
								ĐẶT LỊCH
							</button>
						</Link>
					</div>
				</div>
			</div>

			{/* Program Highlights */}
			<div className="mb-8">
				<div className="bg-white p-4 rounded shadow">
					<h2 className="text-lg font-bold text-orange-500 mb-4">
						Điểm nhấn của chương trình
					</h2>
					<div
						className="text-gray-700 mb-4"
						dangerouslySetInnerHTML={{ __html: tour && tour.description }}
					></div>
				</div>
			</div>

			{/* Schedule */}
			<div>
				<h2 className="text-lg font-bold mb-4">LỊCH TRÌNH CHI TIẾT</h2>

				{tour &&
					tour.schedule.map((item, index) => (
						<div className="mb-4">
							<div className="bg-gray-200 p-4 rounded">
								<h3 className="font-bold mb-2 text-gray-800">{item.time}</h3>
								<p className="text-gray-700">{item.activity}</p>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default TourDetail;
