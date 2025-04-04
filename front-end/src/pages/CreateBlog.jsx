import {
	Alert,
	Button,
	FileInput,
	Select,
	TextInput,
	Textarea,
} from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaImage } from "react-icons/fa";

export default function CreateBlog() {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({
		title: "",
		categoryIds: [],
		content: "",
		thumbnail: null,
	});
	const [publishError, setPublishError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				setLoading(true);
				setError(null);
				const res = await fetch("/api/category/get-categories", {
					method: "GET",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
				});

				const data = await res.json();

				if (!res.ok) {
					setError(data.message || "Không thể tải danh mục");
					return;
				}

				if (data.success && data.categories) {
					const blogCategories = data.categories.filter(
						(category) => category.categoryType === "blog"
					);
					setCategories(blogCategories);
				} else {
					setError("Không tìm thấy danh mục nào");
				}
			} catch (error) {
				setError(error.message || "Đã xảy ra lỗi");
			} finally {
				setLoading(false);
			}
		};

		fetchCategories();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const formDataToSend = new FormData();
			formDataToSend.append("title", formData.title);
			formDataToSend.append("content", formData.content);
			formData.categoryIds.forEach((categoryId) => {
				formDataToSend.append("categoryIds[]", categoryId);
			});
			if (formData.thumbnail) {
				formDataToSend.append("thumbnail", formData.thumbnail);
			}

			const response = await fetch("/api/blog/create-blog", {
				method: "POST",
				body: formDataToSend,
			});

			if (!response.ok) {
				throw new Error("Không thể tạo bài viết");
			}

			const data = await response.json();
			navigate(`/blog/${data.slug}`);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e) => {
		const { name, value, files, type } = e.target;

		if (type === "select-multiple") {
			const selectedOptions = Array.from(e.target.selectedOptions).map(
				(option) => option.value
			);
			setFormData((prev) => ({
				...prev,
				[name]: selectedOptions,
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				[name]: files ? files[0] : value,
			}));
		}
	};

	return (
		<div className="p-3 max-w-4xl mx-auto min-h-screen">
			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
				<h1 className="text-center text-3xl my-7 font-bold text-gray-800 dark:text-white">
					Tạo bài viết mới
				</h1>
				<form className="flex flex-col gap-6" onSubmit={handleSubmit}>
					<div className="flex flex-col gap-4 sm:flex-row justify-between">
						<div className="flex-1">
							<label
								htmlFor="title"
								className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								Tiêu đề bài viết
							</label>
							<TextInput
								type="text"
								placeholder="Nhập tiêu đề bài viết..."
								required
								id="title"
								name="title"
								value={formData.title}
								onChange={handleChange}
								className="w-full"
							/>
						</div>
						<div className="w-full sm:w-48">
							<label
								htmlFor="categoryIds"
								className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
							>
								Danh mục
							</label>
							{loading ? (
								<div className="animate-pulse">
									<div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
								</div>
							) : error ? (
								<div className="text-red-500 text-sm">{error}</div>
							) : (
								<Select
									id="categoryIds"
									name="categoryIds"
									value={formData.categoryIds}
									onChange={handleChange}
									required
									multiple
									className="w-full h-32"
								>
									{categories.map((category) => (
										<option key={category._id} value={category._id}>
											{category.categoryName}
										</option>
									))}
								</Select>
							)}
						</div>
					</div>

					<div>
						<label
							htmlFor="thumbnail"
							className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Ảnh thumbnail
						</label>
						<div className="flex flex-col gap-4">
							<FileInput
								id="thumbnail"
								name="thumbnail"
								onChange={handleChange}
								accept="image/*"
							/>
							{formData.thumbnail && (
								<div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
									<img
										src={URL.createObjectURL(formData.thumbnail)}
										alt="thumbnail preview"
										className="w-full h-full object-cover"
									/>
									<div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
										<FaImage className="text-white text-4xl" />
									</div>
								</div>
							)}
						</div>
					</div>

					<div>
						<label
							htmlFor="content"
							className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
						>
							Nội dung bài viết
						</label>
						<ReactQuill
							theme="snow"
							placeholder="Viết nội dung bài viết..."
							className="h-96 mb-12 bg-white dark:bg-gray-700 rounded-lg"
							required
							onChange={(value) => {
								setFormData({ ...formData, content: value });
							}}
						/>
					</div>

					<div className="flex justify-end gap-4">
						<Button
							type="button"
							color="gray"
							onClick={() => navigate(-1)}
							className="px-6"
						>
							Hủy
						</Button>
						<Button
							type="submit"
							gradientDuoTone="purpleToPink"
							className="px-6"
							disabled={loading}
						>
							{loading ? "Đang tải..." : "Đăng bài"}
						</Button>
					</div>

					{(error || publishError) && (
						<Alert className="mt-5" color="failure">
							{error || publishError}
						</Alert>
					)}
				</form>
			</div>
		</div>
	);
}
