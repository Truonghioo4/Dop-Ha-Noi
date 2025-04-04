import React, { useState, useEffect } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeadCell,
	TableRow,
	Button,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
} from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

const DashTours = () => {
	const [tours, setTours] = useState([]);
	const [showMore, setShowMore] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [tourIdToDelete, setTourIdToDelete] = useState("");

	useEffect(() => {
		const fetchTours = async () => {
			try {
				const res = await fetch("/api/tour/get-tours");
				const data = await res.json();
				if (res.ok) {
					setTours(data.tours);
					if (data.tours.length < 9) {
						setShowMore(false);
					}
				}
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchTours();
	}, []);

	const handleShowMore = async () => {
		const startIndex = tours.length;
		try {
			const res = await fetch(`/api/tour/get-tours?startIndex=${startIndex}`);
			const data = await res.json();
			if (res.ok) {
				setTours((prev) => [...prev, ...data.tours]);
				if (data.tours.length < 8) {
					setShowMore(false);
				}
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	const handleDeletePost = async () => {
		setShowModal(false);
		try {
			const res = await fetch(`/api/tour/delete-tour/${tourIdToDelete}`, {
				method: "DELETE",
			});
			const data = await res.json();
			if (!res.ok) {
				console.log(data.message);
			} else {
				setTours((prev) => prev.filter((tour) => tour._id !== tourIdToDelete));
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className="px-4">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-semibold">Quản lý Tour</h1>
				<Link to="/create-tour">
					<Button gradientDuoTone="purpleToBlue">Tạo Tour</Button>
				</Link>
			</div>
			<Table hoverable className="shadow-md">
				<TableHead>
					<TableHeadCell>Date updated</TableHeadCell>
					<TableHeadCell>Tour thumbnail</TableHeadCell>
					<TableHeadCell>Tour title</TableHeadCell>
					<TableHeadCell>Category</TableHeadCell>
					<TableHeadCell>Delete</TableHeadCell>
					<TableHeadCell>Edit</TableHeadCell>
				</TableHead>
				<TableBody className="divide-y">
					{tours.map((tour) => (
						<TableRow
							key={tour._id}
							className="bg-white dark:border-gray-700 dark:bg-gray-800"
						>
							<TableCell>
								{new Date(tour.updatedAt).toLocaleDateString()}
							</TableCell>
							<TableCell>
								<Link to={`/tour/${tour.slug}`}>
									<img
										src={tour.image[0]}
										alt={tour.title}
										className="w-20 h-10 object-cover bg-gray-500"
									/>
								</Link>
							</TableCell>
							<TableCell>
								<Link
									className="font-medium text-gray-900 dark:text-white"
									to={`/tour/${tour.slug}`}
								>
									{tour.title}
								</Link>
							</TableCell>
							<TableCell>{tour.category[0]}</TableCell>
							<TableCell>
								<span
									onClick={() => {
										setShowModal(true);
										setTourIdToDelete(tour._id);
									}}
									className="font-medium text-red-500 hover:underline cursor-pointer"
								>
									Delete
								</span>
							</TableCell>
							<TableCell>
								<Link
									className="text-orange-500 hover:underline"
									to={`/update-tour/${tour._id}`}
								>
									Edit
								</Link>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			{showMore && (
				<button
					onClick={handleShowMore}
					className="w-full text-orange-500 self-center text-sm py-7"
				>
					Xem thêm
				</button>
			)}
			<Modal
				show={showModal}
				onClose={() => setShowModal(false)}
				popup
				size="md"
			>
				<ModalHeader />
				<ModalBody>
					<div className="text-center">
						<HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
						<h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
							Are you sure you want to delete this tour?
						</h3>
						<div className="flex justify-center gap-4">
							<Button color="failure" onClick={handleDeletePost}>
								Yes, I'm sure
							</Button>
							<Button color="gray" onClick={() => setShowModal(false)}>
								No, cancel
							</Button>
						</div>
					</div>
				</ModalBody>
			</Modal>
		</div>
	);
};

export default DashTours;
