import React from "react";
import { Search, ChevronDown, Heart, User } from 'lucide-react';
const Footer = () => {
	return (
		<footer className="mt-8 py-6 border-t">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div>
						<div className="text-orange-500 font-bold text-xl mb-4">
							<div>ĐỚP</div>
							<div>ĐỚP ĐỚP</div>
						</div>
						<div className="space-y-2 text-sm">
							<p>Email: dopdopdop@gmail.com</p>
							<p>Hotline: 0123456789</p>
							<p>Địa chỉ: Nghiêm Xuân Yêm - Đại Kim - Hoàng Mai - Hà Nội</p>
						</div>
					</div>

					<div>
						<h3 className="text-orange-500 font-bold mb-4">Dịch vụ</h3>
						<ul className="space-y-2 text-sm">
							<li>Tìm kiếm & Đặt lịch foodtour</li>
							<li>Hệ thống quản lý foodtour</li>
							<li>Dịch vụ quảng cáo</li>
						</ul>
					</div>

					<div>
						<h3 className="text-orange-500 font-bold mb-4">
							Theo dõi chúng tôi trên
						</h3>
						<div className="flex space-x-4">
							<a
								href="#"
								className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
							>
								<svg
									viewBox="0 0 24 24"
									width="16"
									height="16"
									fill="currentColor"
								>
									<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
								</svg>
							</a>
							<a
								href="#"
								className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
							>
								<svg
									viewBox="0 0 24 24"
									width="16"
									height="16"
									fill="currentColor"
								>
									<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
									<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
									<line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
								</svg>
							</a>
							<a
								href="#"
								className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
							>
								<svg
									viewBox="0 0 24 24"
									width="16"
									height="16"
									fill="currentColor"
								>
									<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
								</svg>
							</a>
							<a
								href="#"
								className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
							>
								<svg
									viewBox="0 0 24 24"
									width="16"
									height="16"
									fill="currentColor"
								>
									<circle cx="12" cy="12" r="10"></circle>
									<polygon points="10 8 16 12 10 16 10 8"></polygon>
								</svg>
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
