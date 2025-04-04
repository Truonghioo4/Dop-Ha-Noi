import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
	signInStart,
	signInSuccess,
	signInFailure,
} from "../../redux/user/userSlice";
import { useSelector } from "react-redux";
import OAuth from "../OAuth";
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
				setShowLogin(false);
				dispatch(signInSuccess(data));
				navigate("/");
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
						<OAuth setShowLogin={setShowLogin} />
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
