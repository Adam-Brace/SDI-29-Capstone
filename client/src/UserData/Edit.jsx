import { useState } from "react";
import "./Edit.css";
const API_URL = import.meta.env.VITE_API_URL;

export default function Edit({ id, currentData }) {
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		rank: "",
		email: "",
		phone: "",
		organization: "",
		crew: "",
		position: "",
	});
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleEdit = () => {
		fetch(`${API_URL}/user/${id}`, {
			method: "PATCH",
			mode: "cors",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("server response:", data);
				console.log(data.message);
				if (data.message) {
					//alert("Profile updated!");
					closeModal();
				} else {
					alert("Failed to update");
				}
			})
			.catch((error) => {
				alert("Failed to update");
			});
	};

	const openModal = () => {
		setFormData({
			first_name: currentData.first_name || "",
			last_name: currentData.last_name || "",
			rank: currentData.rank || "",
			email: currentData.email || "",
			phone: currentData.phone || "",
			organization: currentData.organization || "",
			crew: currentData.crew || "",
			position: currentData.position || "",
		});
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div>
			<button className="med-btn" onClick={openModal}>
				Edit
			</button>

			{isModalOpen && (
				<div className="modal-overlay">
					<div className="modal">
						<h2>Edit Item</h2>
						<form onSubmit={(event) => event.preventDefault()}>
							<div>
								<label htmlFor="first_name">First Name:</label>
								<input
									type="text"
									id="first_name"
									name="first_name"
									value={formData.first_name}
									onChange={handleInputChange}
								/>
							</div>

							<div>
								<label htmlFor="last_name">Last Name:</label>
								<input
									type="text"
									id="last_name"
									name="last_name"
									value={formData.last_name}
									onChange={handleInputChange}
								/>
							</div>

							<div>
								<label htmlFor="rank">Rank:</label>
								<input
									type="text"
									id="rank"
									name="rank"
									value={formData.rank}
									onChange={handleInputChange}
								/>
							</div>

							<div>
								<label htmlFor="email">Email:</label>
								<input
									type="text"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
								/>
							</div>

							<div>
								<label htmlFor="phone">Duty Phone:</label>
								<input
									type="text"
									id="phone"
									name="phone"
									value={formData.phone}
									onChange={handleInputChange}
								/>
							</div>

							<div>
								<label htmlFor="organization">
									Organization:
								</label>
								<input
									type="text"
									id="organization"
									name="organization"
									value={formData.organization}
									onChange={handleInputChange}
								/>
							</div>

							<div>
								<label htmlFor="crew">Crew:</label>
								<input
									type="text"
									id="crew"
									name="crew"
									value={formData.crew}
									onChange={handleInputChange}
								/>
							</div>

							<div>
								<label htmlFor="position">Position:</label>
								<input
									type="text"
									id="position"
									name="position"
									value={formData.position}
									onChange={handleInputChange}
								/>
							</div>

							<button type="button" onClick={handleEdit}>
								Submit
							</button>
							<button type="button" onClick={closeModal}>
								Cancel
							</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
