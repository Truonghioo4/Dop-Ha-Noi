import React, { useState, useEffect } from "react";
import { FaStar, FaSearch, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const TourPage = () => {
	const [date, setDate] = useState("20/06/2024");
	const [activeTab, setActiveTab] = useState("Đánh giá");
	const [tours, setTours] = useState([]);
	useEffect(() => {
		const fetchTours = async () => {
			const res = await fetch("/api/tour/get-tours");
			const data = await res.json();
			setTours(data.tours);
		};
		fetchTours();
	}, []);

	const renderStars = (rating) => {
		const stars = [];
		for (let i = 0; i < rating; i++) {
			stars.push(<FaStar key={i} className="text-yellow-400 inline" />);
		}
		return stars;
	};

	return (
		<div className="font-sans">
			{/* Breadcrumb */}
			<div className="container mx-auto px-4 py-2">
				<div className="text-sm">
					<span className="text-gray-600">Home / Tours</span>
				</div>
			</div>

			{/* Main Content */}
			<div className="container mx-auto px-4 py-4">
				<div className="flex flex-wrap">
					{/* Sidebar Filters */}
					<div className="w-full md:w-1/4 pr-4">
						<div className="bg-white p-4 rounded-lg shadow mb-4">
							<h3 className="font-bold mb-2">Giá</h3>
							<div className="mb-2">
								<span className="text-sm">Từ</span>
								<span className="float-right text-sm">{date}</span>
							</div>
							<div className="mb-4">
								<div className="w-full bg-gray-200 rounded-full h-2 mb-2">
									<div className="bg-orange-500 h-2 rounded-full w-1/2"></div>
								</div>
							</div>

							<h3 className="font-bold mb-2">Thời lượng tour</h3>
							<div className="space-y-1">
								<div className="flex items-center">
									<input type="checkbox" id="duration1" className="mr-2" />
									<label htmlFor="duration1" className="text-sm">
										Dưới 6 tiếng
									</label>
								</div>
								<div className="flex items-center">
									<input
										type="checkbox"
										id="duration2"
										className="mr-2"
										checked
									/>
									<label htmlFor="duration2" className="text-sm">
										6 - 12 tiếng
									</label>
								</div>
								<div className="flex items-center">
									<input type="checkbox" id="duration3" className="mr-2" />
									<label htmlFor="duration3" className="text-sm">
										12 - 18 tiếng
									</label>
								</div>
								<div className="flex items-center">
									<input type="checkbox" id="duration4" className="mr-2" />
									<label htmlFor="duration4" className="text-sm">
										Trên 18 tiếng
									</label>
								</div>
							</div>

							<h3 className="font-bold my-2">Số người tham gia</h3>
							<div className="space-y-1">
								<div className="flex items-center">
									<input type="checkbox" id="participants1" className="mr-2" />
									<label htmlFor="participants1" className="text-sm">
										Cá nhân (1 người)
									</label>
								</div>
								<div className="flex items-center">
									<input type="checkbox" id="participants2" className="mr-2" />
									<label htmlFor="participants2" className="text-sm">
										Nhóm 2 - 5 người
									</label>
								</div>
								<div className="flex items-center">
									<input
										type="checkbox"
										id="participants3"
										className="mr-2"
										checked
									/>
									<label htmlFor="participants3" className="text-sm">
										Nhóm 5 - 10 người
									</label>
								</div>
								<div className="flex items-center">
									<input type="checkbox" id="participants4" className="mr-2" />
									<label htmlFor="participants4" className="text-sm">
										Nhóm 10 - 20 người
									</label>
								</div>
								<div className="flex items-center">
									<input type="checkbox" id="participants5" className="mr-2" />
									<label htmlFor="participants5" className="text-sm">
										Nhóm trên 20 người
									</label>
								</div>
							</div>

							<h3 className="font-bold my-2">Hình thức trải nghiệm</h3>
							<div className="space-y-1">
								<div className="flex items-center">
									<input type="checkbox" id="experience1" className="mr-2" />
									<label htmlFor="experience1" className="text-sm">
										Ẩm thực đường phố
									</label>
								</div>
								<div className="flex items-center">
									<input type="checkbox" id="experience2" className="mr-2" />
									<label htmlFor="experience2" className="text-sm">
										Nhà hàng hạng sang
									</label>
								</div>
								<div className="flex items-center">
									<input
										type="checkbox"
										id="experience3"
										className="mr-2"
										checked
									/>
									<label htmlFor="experience3" className="text-sm">
										Ẩm thực truyền thống
									</label>
								</div>
								<div className="flex items-center">
									<input type="checkbox" id="experience4" className="mr-2" />
									<label htmlFor="experience4" className="text-sm">
										Thực phẩm healthy
									</label>
								</div>
							</div>

							<h3 className="font-bold my-2">Đánh giá</h3>
							<div className="space-y-1">
								<div className="flex items-center">
									<input type="checkbox" id="rating1" className="mr-2" />
									<label htmlFor="rating1" className="text-sm">
										Từ 5 sao
									</label>
								</div>
								<div className="flex items-center">
									<input type="checkbox" id="rating2" className="mr-2" />
									<label htmlFor="rating2" className="text-sm">
										Trên 4.5 sao
									</label>
								</div>
								<div className="flex items-center">
									<input
										type="checkbox"
										id="rating3"
										className="mr-2"
										checked
									/>
									<label htmlFor="rating3" className="text-sm">
										Trên 4 sao
									</label>
								</div>
								<div className="flex items-center">
									<input type="checkbox" id="rating4" className="mr-2" />
									<label htmlFor="rating4" className="text-sm">
										Dưới 4 sao
									</label>
								</div>
							</div>
						</div>
					</div>

					{/* Tour Cards */}
					<div className="w-full md:w-3/4">
						{/* Tabs */}
						<div className="mb-4 border-b">
							<ul className="flex flex-wrap -mb-px">
								<li className="mr-2">
									<button
										className={`inline-block p-2 ${
											activeTab === "Giá Cao - Thấp"
												? "border-b-2 border-orange-500 text-orange-500"
												: "text-gray-600"
										}`}
										onClick={() => setActiveTab("Giá Cao - Thấp")}
									>
										Giá Cao - Thấp
									</button>
								</li>
								<li className="mr-2">
									<button
										className={`inline-block p-2 ${
											activeTab === "Giá Thấp - Cao"
												? "border-b-2 border-orange-500 text-orange-500"
												: "text-gray-600"
										}`}
										onClick={() => setActiveTab("Giá Thấp - Cao")}
									>
										Giá Thấp - Cao
									</button>
								</li>
								<li className="mr-2">
									<button
										className={`inline-block p-2 ${
											activeTab === "Đánh giá"
												? "border-b-2 border-orange-500 text-orange-500"
												: "text-gray-600"
										}`}
										onClick={() => setActiveTab("Đánh giá")}
									>
										Đánh giá
									</button>
								</li>
							</ul>
						</div>

						{/* Tour Grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{tours.map((tour, index) => (
								<div
									key={index}
									className="bg-white rounded-lg shadow overflow-hidden"
								>
									<div>
										<Link to={`/tour/${tour.slug}`}>
											<img
												src={tour.image[0]}
												alt={tour.title}
												className="w-full h-48 object-cover"
											/>
											<div className="p-4">
												<h3 className="font-bold text-lg mb-2">{tour.title}</h3>
												<div className="flex items-center mb-1">
													<span className="text-sm font-medium mr-2">
														Thời lượng:
													</span>
													<span className="text-sm">{tour.duration}</span>
												</div>
												<div className="flex items-center mb-1">
													<span className="text-sm font-medium mr-2">
														Số người:
													</span>
													<span className="text-sm">{tour.participants}</span>
												</div>
												<div className="flex items-center mb-2">
													<div className="flex">{renderStars(tour.rating)}</div>
												</div>
												<div className="text-orange-500 font-bold text-lg">
													{tour.price.toLocaleString()} đ / khách
												</div>
											</div>
										</Link>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TourPage;
