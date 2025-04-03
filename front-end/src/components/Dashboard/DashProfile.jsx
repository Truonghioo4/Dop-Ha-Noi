import React from 'react';
import { useSelector } from 'react-redux';
const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
	return (
		<main className="flex-1 py-8">
			<div className="container mx-auto max-w-3xl px-4">
				<h2 className="text-xl font-bold mb-6">THÔNG TIN CÁ NHÂN</h2>
				<form className="space-y-4">
					<div>
						<label className="block mb-1">
							Họ và Tên <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							placeholder="User name"
              defaultValue={currentUser.name}
							className="w-full p-2 border rounded-md focus:outline-none"
						/>
					</div>

					<div>
						<label className="block mb-1">Giới tính</label>
						<div className="relative">
							<select className="w-full p-2 border rounded-md appearance-none focus:outline-none">
								<option>Nam</option>
								<option>Nữ</option>
								<option>Khác</option>
							</select>
							<div className="absolute right-3 top-3 pointer-events-none">
							</div>
						</div>
					</div>

					<div>
						<label className="block mb-1">
							Số điện thoại <span className="text-red-500">*</span>
						</label>
						<input
							type="tel"
							placeholder="0123456789"
							className="w-full p-2 border rounded-md focus:outline-none"
						/>
					</div>

					<div>
						<label className="block mb-1">
							Email <span className="text-red-500">*</span>
						</label>
						<input
							type="email"
              defaultValue={currentUser.email}
							className="w-full p-2 border rounded-md focus:outline-none"
						/>
					</div>

					<div>
						<label className="block mb-1">Địa chỉ</label>
						<input
							type="text"
							placeholder="Bắc Kim, Hoàng Mai, Hà Nội"
							className="w-full p-2 border rounded-md focus:outline-none"
						/>
					</div>

					<div>
						<label className="block mb-1">Mật khẩu</label>
						<div className="flex gap-2">
							<input
								type="password"
								placeholder="**************"
								className="flex-1 p-2 border rounded-md focus:outline-none"
							/>
							<button className="bg-orange-500 text-white px-4 py-2 rounded">
								Đổi mật khẩu
							</button>
						</div>
					</div>
				</form>
			</div>
		</main>
	);
};

export default DashProfile;
