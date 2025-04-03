import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CreditCard, DollarSign } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingPage = () => {
	// thông tin của tour
	const { tourSlug } = useParams();
	const [error, setError] = useState(false);
	const [tour, setTour] = useState(null);

	// Thông tin của user
	const { currentUser } = useSelector((state) => state.user);
	console.log(currentUser);
	const [name, setName] = useState(currentUser.name || "");
	const [phone, setPhone] = useState(currentUser.phone || "");
	const [email, setEmail] = useState(currentUser.email || "");
	const [address, setAddress] = useState(currentUser.address || "");

	// Traveler counts
	const [adults, setAdults] = useState(1);
	const [children, setChildren] = useState(0);
	const [infants, setInfants] = useState(0);
	const [babies, setBabies] = useState(0);

	// Date selection
	const [selectedDate, setSelectedDate] = useState(new Date()); // March 15, 2025
	const today = new Date();
	const [startTime, setStartTime] = useState(
		new Date(today.setHours(8, 0, 0, 0))
	);
	const [endTime, setEndTime] = useState(new Date(today.setHours(17, 0, 0, 0)));

	// Payment method
	const [paymentMethod, setPaymentMethod] = useState("cash");

	// Coupon
	const [couponCode, setCouponCode] = useState("");
	const [discountApplied, setDiscountApplied] = useState(false);

	// Pricing
	const adultPrice = tour?.price || 0;
	const childPrice = (tour?.price || 0) * 0.7;
	const discount = discountApplied ? 0.1 : 0; // 10% discount if applied

	// Calculate total
	const subtotal = adults * adultPrice + children * childPrice;
	const discountAmount = subtotal * discount;
	const total = subtotal - discountAmount;

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

	// Handle increment/decrement
	const adjustCount = (type, amount) => {
		switch (type) {
			case "adults":
				setAdults(Math.max(0, adults + amount));
				break;
			case "children":
				setChildren(Math.max(0, children + amount));
				break;
			case "infants":
				setInfants(Math.max(0, infants + amount));
				break;
			case "babies":
				setBabies(Math.max(0, babies + amount));
				break;
			default:
				break;
		}
	};

	// Format currency
	const formatCurrency = (amount) => {
		return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	};

	// Format date
	const formatDate = (date) => {
		return `${date.getDate().toString().padStart(2, "0")}/${(
			date.getMonth() + 1
		)
			.toString()
			.padStart(2, "0")}/${date.getFullYear()} ${date
			.getHours()
			.toString()
			.padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
	};

	// Apply coupon
	const applyCoupon = () => {
		if (couponCode.trim().toLowerCase() === "tour10") {
			setDiscountApplied(true);
			toast.success("Mã giảm giá 10% đã được áp dụng!");
		} else {
			toast.error("Mã giảm giá không hợp lệ!");
		}
	};
	// Submit booking
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		const checkInDateTime = new Date(selectedDate);
		checkInDateTime.setHours(
			startTime.getHours(),
			startTime.getMinutes(),
			0,
			0
		);

		const checkOutDateTime = new Date(selectedDate);
		checkOutDateTime.setHours(endTime.getHours(), endTime.getMinutes(), 0, 0);
		if (!currentUser) {
			toast.error("Vui lòng đăng nhập để đặt tour!");
			return;
		}
		try {
			// Prepare booking data
			const bookingData = {
				tourId: tour._id,
				userId: currentUser._id,
				bookingDate: new Date(),
				participants: adults + children + infants + babies,
				checkIn: checkInDateTime,
				checkOut: checkOutDateTime,
				totalPrice: total,
				discountCode: discountApplied ? couponCode : undefined,
				paymentMethod,
			};

			// Make API call
			const res = await fetch("/api/booking/create-booking", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(bookingData),
			});

			const data = await res.json();

			if (!res.ok) {
				toast.error(data.message || "Đặt tour thất bại. Vui lòng thử lại!");
				return;
			}

			// Show success message
			toast.success(
				"Đặt tour thành công! Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi."
			);

			// Optional: Redirect to booking confirmation page after 2 seconds
			setTimeout(() => {
				window.location.href = `/booking-confirmation/${data.data._id}`;
			}, 2000);
		} catch (err) {
			console.error("Booking error:", err);
			toast.error("Đã có lỗi xảy ra. Vui lòng thử lại sau!");
		}
	};

	return (
		<div className="max-w-5xl mx-auto p-4 bg-white font-sans">
			<ToastContainer position="top-right" autoClose={3000} />

			{/* Header */}
			<div className="text-center mb-8">
				<h1 className="text-2xl font-bold">ĐẶT TOUR</h1>
			</div>

			{/* Progress Steps */}
			<div className="flex justify-center items-center mb-10">
				<div className="flex flex-col items-center">
					<div className="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center">
						<Calendar className="h-6 w-6 text-white" />
					</div>
					<span className="text-amber-600 text-sm mt-2 font-medium">
						NHẬP THÔNG TIN
					</span>
				</div>

				<div className="w-16 h-0.5 bg-gray-300 mx-2"></div>

				<div className="flex flex-col items-center">
					<div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
						<CreditCard className="h-6 w-6 text-white" />
					</div>
					<span className="text-gray-500 text-sm mt-2">THANH TOÁN</span>
				</div>

				<div className="w-16 h-0.5 bg-gray-300 mx-2"></div>

				<div className="flex flex-col items-center">
					<div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6 text-white"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>
					<span className="text-gray-500 text-sm mt-2">HOÀN TẤT</span>
				</div>
			</div>

			<div className="flex flex-wrap -mx-4">
				{/* Left Column */}
				<div className="w-full lg:w-2/3 px-4">
					{/* Contact Information */}
					<div className="mb-8">
						<h2 className="text-lg font-bold mb-4">THÔNG TIN LIÊN LẠC</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<input
								type="text"
								placeholder="Nhập tên"
								className="border border-gray-300 rounded px-4 py-2"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
							<input
								type="text"
								placeholder="Nhập số điện thoại"
								className="border border-gray-300 rounded px-4 py-2"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								required
							/>
							<input
								type="email"
								placeholder="Nhập email"
								className="border border-gray-300 rounded px-4 py-2"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
							<input
								type="text"
								placeholder="Nhập Địa chỉ"
								className="border border-gray-300 rounded px-4 py-2"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
							/>
						</div>
					</div>

					{/* Travelers */}
					<div className="mb-8">
						<h2 className="text-lg font-bold mb-4">HÀNH KHÁCH</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="border border-gray-300 rounded p-3 flex justify-between items-center">
								<div>
									<span className="block">Người lớn</span>
									<span className="text-sm text-gray-500">{">"} 12 tuổi</span>
								</div>
								<div className="flex items-center">
									<button
										className="w-8 h-8 bg-gray-100 rounded-l flex items-center justify-center border border-gray-300 hover:bg-gray-200"
										onClick={() => adjustCount("adults", -1)}
									>
										-
									</button>
									<span className="w-8 h-8 flex items-center justify-center border-t border-b border-gray-300">
										{adults}
									</span>
									<button
										className="w-8 h-8 bg-gray-100 rounded-r flex items-center justify-center border border-gray-300 hover:bg-gray-200"
										onClick={() => adjustCount("adults", 1)}
									>
										+
									</button>
								</div>
							</div>
							<div className="border border-gray-300 rounded p-3 flex justify-between items-center">
								<div>
									<span className="block">Trẻ nhỏ</span>
									<span className="text-sm text-gray-500">2 - 12 tuổi</span>
								</div>
								<div className="flex items-center">
									<button
										className="w-8 h-8 bg-gray-100 rounded-l flex items-center justify-center border border-gray-300 hover:bg-gray-200"
										onClick={() => adjustCount("children", -1)}
									>
										-
									</button>
									<span className="w-8 h-8 flex items-center justify-center border-t border-b border-gray-300">
										{children}
									</span>
									<button
										className="w-8 h-8 bg-gray-100 rounded-r flex items-center justify-center border border-gray-300 hover:bg-gray-200"
										onClick={() => adjustCount("children", 1)}
									>
										+
									</button>
								</div>
							</div>
							<div className="border border-gray-300 rounded p-3 flex justify-between items-center">
								<div>
									<span className="block">Trẻ em</span>
									<span className="text-sm text-gray-500">{"<"} 2 tuổi</span>
								</div>
								<div className="flex items-center">
									<button
										className="w-8 h-8 bg-gray-100 rounded-l flex items-center justify-center border border-gray-300 hover:bg-gray-200"
										onClick={() => adjustCount("infants", -1)}
									>
										-
									</button>
									<span className="w-8 h-8 flex items-center justify-center border-t border-b border-gray-300">
										{infants}
									</span>
									<button
										className="w-8 h-8 bg-gray-100 rounded-r flex items-center justify-center border border-gray-300 hover:bg-gray-200"
										onClick={() => adjustCount("infants", 1)}
									>
										+
									</button>
								</div>
							</div>
							<div className="border border-gray-300 rounded p-3 flex justify-between items-center">
								<div>
									<span className="block">Em bé</span>
									<span className="text-sm text-gray-500"> </span>
								</div>
								<div className="flex items-center">
									<button
										className="w-8 h-8 bg-gray-100 rounded-l flex items-center justify-center border border-gray-300 hover:bg-gray-200"
										onClick={() => adjustCount("babies", -1)}
									>
										-
									</button>
									<span className="w-8 h-8 flex items-center justify-center border-t border-b border-gray-300">
										{babies}
									</span>
									<button
										className="w-8 h-8 bg-gray-100 rounded-r flex items-center justify-center border border-gray-300 hover:bg-gray-200"
										onClick={() => adjustCount("babies", 1)}
									>
										+
									</button>
								</div>
							</div>
						</div>
					</div>

					{/* Calendar */}
					<div className="mb-8">
						<h2 className="text-lg font-bold mb-4">CHỌN LỊCH</h2>
						<div className="border border-gray-300 rounded p-4">
							<DatePicker
								selected={selectedDate}
								onChange={(date) => setSelectedDate(date)}
								inline
								minDate={new Date()}
								dateFormat="dd/MM/yyyy"
								highlightDates={[new Date(2025, 2, 15), new Date(2025, 2, 16)]}
								className="w-full"
							/>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
							<div>
								<label className="block text-sm mb-1">Thời gian đi</label>
								<DatePicker
									selected={startTime}
									onChange={(date) => setStartTime(date)}
									showTimeSelect
									showTimeSelectOnly
									timeIntervals={15}
									timeCaption="Giờ"
									dateFormat="HH:mm"
									className="border border-gray-300 rounded px-4 py-2 w-full"
								/>
							</div>
							<div>
								<label className="block text-sm mb-1">Thời gian về</label>
								<DatePicker
									selected={endTime}
									onChange={(date) => setEndTime(date)}
									showTimeSelect
									showTimeSelectOnly
									timeIntervals={15}
									timeCaption="Giờ"
									dateFormat="HH:mm"
									className="border border-gray-300 rounded px-4 py-2 w-full"
								/>
							</div>
						</div>
					</div>

					{/* Payment Methods */}
					<div className="mb-8">
						<h2 className="text-lg font-bold mb-4">PHƯƠNG THỨC THANH TOÁN</h2>
						<div className="space-y-3">
							<div
								className={`border rounded p-3 flex justify-between items-center cursor-pointer ${
									paymentMethod === "cash"
										? "border-amber-600"
										: "border-gray-300"
								}`}
								onClick={() => setPaymentMethod("cash")}
							>
								<div className="flex items-center">
									<DollarSign className="h-5 w-5 text-gray-500" />
									<span className="ml-2">Tiền mặt</span>
								</div>
								<input
									type="radio"
									name="payment"
									className="h-4 w-4"
									checked={paymentMethod === "cash"}
									onChange={() => setPaymentMethod("cash")}
								/>
							</div>
							<div
								className={`border rounded p-3 flex justify-between items-center cursor-pointer ${
									paymentMethod === "bank"
										? "border-amber-600"
										: "border-gray-300"
								}`}
								onClick={() => setPaymentMethod("bank")}
							>
								<div className="flex items-center">
									<CreditCard className="h-5 w-5 text-gray-500" />
									<span className="ml-2">Chuyển khoản ngân hàng</span>
								</div>
								<input
									type="radio"
									name="payment"
									className="h-4 w-4"
									checked={paymentMethod === "bank"}
									onChange={() => setPaymentMethod("bank")}
								/>
							</div>
						</div>

						{paymentMethod === "bank" && (
							<div className="mt-4 p-4 bg-gray-50 rounded border border-gray-200">
								<h3 className="font-medium mb-2">Thông tin chuyển khoản</h3>
								<p className="text-sm">Ngân hàng: Vietcombank</p>
								<p className="text-sm">Số tài khoản: 1234567890</p>
								<p className="text-sm">Chủ tài khoản: Công ty Du lịch XYZ</p>
								<p className="text-sm">Nội dung: [Họ tên] - Thanh toán tour</p>
							</div>
						)}
					</div>
				</div>

				{/* Right Column - Order Summary */}
				<div className="w-full lg:w-1/3 px-4">
					<div className="border border-gray-200 rounded-lg p-4 bg-gray-50 sticky top-4">
						<h2 className="text-lg font-bold mb-4">TÓM TẮT TOUR</h2>
						<div className="flex mb-4">
							<div className="w-1/3">
								<img
									src={tour && tour.image[0]}
									alt="Tour"
									className="rounded"
								/>
							</div>
							<div className="w-2/3 pl-3">
								<h3 className="font-medium text-sm">{tour && tour.title}</h3>
								<p className="text-xs text-gray-600 mt-1">
									Mã Tour: TOURHNCM_01
								</p>
							</div>
						</div>

						<div className="border-t border-gray-200 pt-4">
							<div className="flex justify-between py-1">
								<span>Thời lượng:</span>
								<span className="font-medium">{tour && tour.duration}</span>
							</div>
							<div className="flex justify-between py-1">
								<span>Số người:</span>
								<span className="font-medium">
									{adults + children + infants + babies} người
								</span>
							</div>
							<div className="flex justify-between py-1">
								<span className="font-medium">THỜI GIAN TOUR</span>
							</div>
							<div className="flex justify-between py-1">
								<span>Thời gian đi:</span>
								<span className="font-medium">
									{`${selectedDate.getDate().toString().padStart(2, "0")}/${(
										selectedDate.getMonth() + 1
									)
										.toString()
										.padStart(2, "0")}/${selectedDate.getFullYear()} ${startTime
										.getHours()
										.toString()
										.padStart(2, "0")}:${startTime
										.getMinutes()
										.toString()
										.padStart(2, "0")}`}
								</span>
							</div>
							<div className="flex justify-between py-1">
								<span>Thời gian về:</span>
								<span className="font-medium">
									{`${selectedDate.getDate().toString().padStart(2, "0")}/${(
										selectedDate.getMonth() + 1
									)
										.toString()
										.padStart(2, "0")}/${selectedDate.getFullYear()} ${endTime
										.getHours()
										.toString()
										.padStart(2, "0")}:${endTime
										.getMinutes()
										.toString()
										.padStart(2, "0")}`}
								</span>
							</div>
							<div className="flex justify-between py-1 mt-2">
								<span className="font-medium">THÀNH TIỀN</span>
								<span className="font-medium text-red-500">
									{formatCurrency(subtotal)} đ
								</span>
							</div>
							<div className="flex justify-between py-1">
								<span>Người lớn:</span>
								<span>
									{adults} x {formatCurrency(adultPrice)} đ
								</span>
							</div>
							<div className="flex justify-between py-1">
								<span>Trẻ em:</span>
								<span>
									{children} x {formatCurrency(childPrice)} đ
								</span>
							</div>
							<div className="flex justify-between py-1 mb-2">
								<span className="font-medium">MÃ GIẢM GIÁ</span>
								<div className="flex">
									<input
										type="text"
										placeholder="Nhập mã"
										className="border border-gray-300 rounded px-2 py-1 text-sm w-24"
										value={couponCode}
										onChange={(e) => setCouponCode(e.target.value)}
									/>
									<button
										className="ml-2 bg-amber-600 text-white px-2 py-1 rounded text-sm"
										onClick={applyCoupon}
									>
										Áp dụng
									</button>
								</div>
							</div>

							{discountApplied && (
								<div className="flex justify-between py-1 text-green-600">
									<span>Giảm giá (10%):</span>
									<span>-{formatCurrency(discountAmount)} đ</span>
								</div>
							)}
						</div>

						<div className="border-t border-gray-200 pt-4">
							<div className="flex justify-between py-1">
								<span className="font-bold">TỔNG TIỀN</span>
								<span className="font-bold text-red-500">
									{formatCurrency(total)} đ
								</span>
							</div>
							<button
								className="w-full bg-amber-600 text-white py-3 rounded mt-4 font-medium hover:bg-amber-700 transition-colors"
								onClick={handleSubmit}
							>
								ĐẶT TOUR
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookingPage;
