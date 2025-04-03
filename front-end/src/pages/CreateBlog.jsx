import React from "react";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const CreateBlog = () => {
	return (
		<div className="p-3 max-w-3xl mx-auto min-h-screen">
			<h1 className="text-center text-3xl my-7 font-semibold">Create a blog</h1>
			<form className="flex flex-col gap-4">
				<div className="flex flex-col gap-4 justify-between">
					<TextInput
						type="text"
						placeholder="Title"
						required
						id="title"
						className="flex-1"
						onChange={(e) =>
							setFormData({ ...formData, title: e.target.value })
						}
					/>
					<Select
						onChange={(e) =>
							setFormData({ ...formData, category: e.target.value })
						}
					>
						<option value="uncategorized">Select a category</option>
						<option value="javascript">JavaScript</option>
						<option value="reactjs">React.js</option>
						<option value="nextjs">Next.js</option>
					</Select>
					<div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
						<FileInput
							type="file"
							accept="image/*"
							onChange={(e) => setFile(e.target.files[0])}
						/>
						<Button
							type="button"
							gradientDuoTone="purpleToBlue"
							size="sm"
							outline
						>
							Upload
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default CreateBlog;
