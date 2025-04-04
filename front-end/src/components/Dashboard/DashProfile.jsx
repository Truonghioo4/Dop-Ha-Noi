import React from "react";
import { Alert, Modal, ModalBody } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
	updateStart,
	updateSuccess,
	updateFailure,
	signoutSuccess,
} from "@/redux/user/userSlice";
const DashProfile = () => {
	const { currentUser } = useSelector((state) => state.user);
	const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
	const [updateUserError, setUpdateUserError] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [formData, setFormData] = useState({});
	const dispatch = useDispatch();
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setUpdateUserError(null);
		setUpdateUserSuccess(null);
		if (Object.keys(formData).length === 0) {
			setUpdateUserError("No changes made");
			return;
		}
		try {
			dispatch(updateStart());
			const res = await fetch(`/api/user/update/${currentUser._id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			const data = await res.json();
			if (!res.ok) {
				dispatch(updateFailure(data.message));
				setUpdateUserError(data.message);
			} else {
				dispatch(updateSuccess(data));
				setUpdateUserSuccess("User's profile updated successfully");
			}
		} catch (error) {
			dispatch(updateFailure(error.message));
			setUpdateUserError(error.message);
		}
	};
	return (
		<main className="flex-1 py-8">
			<div className="container mx-auto max-w-3xl px-4">
				<h2 className="text-xl font-bold mb-6">THÔNG TIN CÁ NHÂN</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block mb-1">
							Họ và Tên <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							placeholder="User name"
							id="name"
							defaultValue={currentUser.name}
							onChange={handleChange}
							className="w-full p-2 border rounded-md focus:outline-none"
						/>
					</div>

					<div>
						<label className="block mb-1">Giới tính</label>
						<div className="relative">
							<select
								id="gender"
								className="w-full p-2 border rounded-md appearance-none focus:outline-none"
								onChange={handleChange}
								defaultValue={currentUser.gender || ""}
							>
								<option>Nam</option>
								<option>Nữ</option>
								<option>Khác</option>
							</select>
							<div className="absolute right-3 top-3 pointer-events-none"></div>
						</div>
					</div>

					<div>
						<label className="block mb-1">
							Số điện thoại <span className="text-red-500"></span>
						</label>
						<input
							type="tel"
							id="phone"
							placeholder="Nhập số điện thoại"
							defaultValue={currentUser.phone}
							onChange={handleChange}
							className="w-full p-2 border rounded-md focus:outline-none"
						/>
					</div>

					<div>
						<label className="block mb-1">
							Email <span className="text-red-500">*</span>
						</label>
						<input
							type="email"
							id="email"
							defaultValue={currentUser.email}
							onChange={handleChange}
							className="w-full p-2 border rounded-md focus:outline-none"
						/>
					</div>
					<div>
						<label className="block mb-1">Địa chỉ</label>
						<input
							type="text"
							id="address"
							placeholder="Nhập địa chỉ"
							defaultValue={currentUser.address}
							onChange={handleChange}
							className="w-full p-2 border rounded-md focus:outline-none"
						/>
					</div>

					<label className="block mb-1">Mật khẩu</label>
					<div className="flex gap-2">
						<input
							type="password"
							id="password"
							placeholder="**************"
							defaultValue={currentUser.password}
							onChange={handleChange}
							className="flex-1 p-2 border rounded-md focus:outline-none"
						/>
						<button
							type="submit"
							className="bg-orange-500 text-white px-4 py-2 rounded"
						>
							Cập nhật tài khoản
						</button>
					</div>
				</form>
			</div>
			
		</main>
	);
};

export default DashProfile;
