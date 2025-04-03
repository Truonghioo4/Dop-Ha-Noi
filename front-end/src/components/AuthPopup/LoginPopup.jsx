import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
	signInStart,
	signInSuccess,
	signInFailure,
} from "../../redux/user/userSlice";
import { useSelector } from "react-redux";
const LoginPopup = ({ setShowLogin, setShowSignup }) => {
	const [formData, setFormData] = useState({});
	const { error: errorMessage } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			dispatch(signInStart());
			const res = await fetch("/api/auth/sign-in", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			const data = await res.json();
			if (data.success === false) {
				dispatch(signInFailure(data.message));
			}
			if (res.ok) {
				dispatch(signInSuccess(data));
				navigate("/");
				setShowLogin(false);
			}
		} catch (error) {
			dispatch(signInFailure(error.message));
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg shadow-xl w-96 p-6 relative">
				{/* Close button */}
				<button
					onClick={() => {
						setShowLogin(false);
					}}
					className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition duration-300"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<line x1="18" y1="6" x2="6" y2="18"></line>
						<line x1="6" y1="6" x2="18" y2="18"></line>
					</svg>
				</button>

				<h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
					Đăng nhập
				</h2>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<input
							type="email"
							placeholder="Email"
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
							id="email"
							required
						/>
					</div>

					<div>
						<input
							type="password"
							placeholder="Mật khẩu"
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
							id="password"
							required
						/>
						<div className="text-right mt-2">
							<a href="#" className="text-sm text-orange-600 hover:underline">
								Quên mật khẩu?
							</a>
						</div>
					</div>

					<button
						type="submit"
						className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition duration-300"
					>
						Đăng nhập
					</button>

					<div className="text-center mt-4">
						<p className="text-sm text-gray-600 mb-2">
							Hoặc đăng nhập / đăng ký với
						</p>
						<button
							type="button"
							className="w-full border border-gray-300 py-2 rounded-md flex items-center justify-center hover:bg-gray-50 transition duration-300"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								className="mr-2"
							>
								<path
									fill="#4285F4"
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.58c2.08-1.92 3.28-4.74 3.28-8.07z"
								/>
								<path
									fill="#34A853"
									d="M12 23c2.97 0 5.46-1 7.28-2.69l-3.58-2.75c-.99.67-2.26 1.07-3.7 1.07-2.84 0-5.24-1.92-6.1-4.51H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								/>
								<path
									fill="#FBBC05"
									d="M5.9 14.12c-.2-.78-.2-1.62 0-2.4V8.88H2.18A9.999 9.999 0 0 0 2 12c0 1.61.39 3.13 1.1 4.46l3.8-2.94z"
								/>
								<path
									fill="#EA4335"
									d="M12 4.75c1.63 0 3.06.56 4.21 1.64l3.15-3.15A9.987 9.987 0 0 0 12 2C7.7 2 3.99 4.47 2.18 8.88l3.8 2.94c.86-2.59 3.26-4.51 6.1-4.51z"
								/>
							</svg>
							Google
						</button>
					</div>

					<div className="text-center mt-4 flex items-center justify-center">
						<p className="text-sm text-gray-600">Chưa có tài khoản?</p>
						<div
							className="text-orange-600 hover:underline ml-1 cursor-pointer"
							onClick={() => {
								setShowSignup(true);
								setShowLogin(false);
							}}
						>
							Đăng ký
						</div>
					</div>
					{errorMessage && (
						<p className="text-red-500 text-center">{errorMessage}</p>
					)}
				</form>
			</div>
		</div>
	);
};

export default LoginPopup;
