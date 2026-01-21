import { useEffect, useState } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Select,
	MenuItem,
	Button,
	Box,
	IconButton,
	FormControl,
	InputLabel,
	FormHelperText,
	Typography,
	Snackbar,
	Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import api from "../../services/api";
import { formatSlug } from "../../../../shared/utils/formatHelper";
import { useToast } from "@shared/hooks/useToast";

export default function EditCategory({
	open,
	onClose,
	category,
	onUpdated,
	showSuccess,
	showError,
}) {
	const {
		toast: editToast,
		showSuccess: showEditSuccess,
		showError: showEditError,
		closeToast: closeEditToast,
	} = useToast();
	const [formData, setFormData] = useState({
		name: "",
		parent_id: "",
		description: "",
	});
	const [categories, setCategories] = useState([]);
	const [errors, setErrors] = useState({});
	const [submitting, setSubmitting] = useState(false);


    const fetchCategories = async () => {
        const res = await api.get("/categories", {
            params: {
                flat: 1,
                per_page: 10000,
            },
        });
        if(res.data.success) {
            setCategories(res.data.data || []);
        } else {
            console.log("Error fetching categories: ", res.data.error);
        }
    };

    useEffect(() => {
        fetchCategories();
        console.log("categories: ", categories);
    }, []);

	useEffect(() => {
		if (category) {
			setFormData({
				name: category.name || "",
				parent_id: category.parent_id ?? "",
				description: category.description || "",
			});
			setErrors({});
		}
	}, [category, open]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const validate = () => {
		const nextErrors = {};

		if (!formData.name.trim()) {
			nextErrors.name = "Vui lòng nhập tên danh mục.";
		} else if (formData.name.length > 255) {
			nextErrors.name = "Tên danh mục không được vượt quá 255 ký tự.";
		}

		if (formData.description.length > 1000) {
			nextErrors.description = "Mô tả không được vượt quá 1000 ký tự.";
		}

		setErrors(nextErrors);
		return Object.keys(nextErrors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!validate() || !category) {
			return;
		}

		setSubmitting(true);
		const payload = {
			name: formData.name.trim(),
			slug: formatSlug(formData.name),
			description: formData.description.trim() || null,
			parent_id: formData.parent_id ? Number(formData.parent_id) : null,
		};

		api.put(`/categories/${category.id}`, payload)
			.then((response) => {
				const updated = response?.data?.data ?? response?.data;
				showEditSuccess("Cập nhật thành công!");
				onUpdated?.(updated);
				setTimeout(() => {
					handleClose();
				}, 1500);
			})
			.catch((error) => {
				if (error?.response?.status === 422) {
					const serverErrors = error.response.data?.errors || {};
					const nextErrors = {};
					Object.keys(serverErrors).forEach((key) => {
						const messages = serverErrors[key];
						if (Array.isArray(messages) && messages.length > 0) {
							nextErrors[key] = messages[0];
						}
					});
					setErrors((prev) => ({ ...prev, ...nextErrors }));
					const firstError = Object.values(nextErrors)[0];
					if (firstError) {
						showEditError(firstError);
					}
				} else {
					console.error("Error updating category:", error);
					showEditError("Cập nhật thất bại!");
				}
			})
			.finally(() => {
				setSubmitting(false);
			});
	};

	const handleClose = () => {
		setFormData({
			name: "",
			parent_id: "",
			description: "",
		});
	setErrors({});
	setSubmitting(false);
	closeEditToast();
	onClose();
};

	const parentOptions = categories?.filter((item) => item.id !== category?.id) || [];

	return (
		<Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
			<DialogTitle>
				<Box display="flex" alignItems="center" justifyContent="space-between">
					<Typography variant="h6" component="div">
						CHỈNH SỬA DANH MỤC
					</Typography>
					<IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
						<CloseIcon />
					</IconButton>
				</Box>
			</DialogTitle>

			<DialogContent dividers>
				<Box component="form" onSubmit={handleSubmit} noValidate>
					<Box
						sx={{
							background: "linear-gradient(360deg, #234C6A 0%, #456882 100%)",
							borderRadius: 2,
							py: 1.5,
							px: 2,
							mb: 3,
							boxShadow: "0 4px 6px rgba(35, 76, 106, 0.3)",
						}}
					>
						<Typography
							variant="h5"
							fontWeight="bold"
							align="center"
							sx={{ color: "white", letterSpacing: 1 }}
						>
							THÔNG TIN DANH MỤC
						</Typography>
					</Box>

					<Grid container spacing={2}>
						<Grid size={12}>
							<TextField
								fullWidth
								required
								label="Tên danh mục"
								name="name"
								value={formData.name}
								onChange={handleChange}
								error={!!errors.name}
								helperText={errors.name || `${formData.name.length}/255`}
								inputProps={{ maxLength: 255 }}
							/>
						</Grid>

						<Grid size={12}>
							<FormControl fullWidth>
								<InputLabel>Danh mục cha</InputLabel>
								<Select
									name="parent_id"
									value={formData.parent_id}
									onChange={handleChange}
									label="Danh mục cha"
								>
									<MenuItem value="">
										<em>Không có</em>
									</MenuItem>
									{parentOptions.map((item) => (
										<MenuItem key={item.id} value={item.id}>
											{item.name}
										</MenuItem>
									))}
								</Select>
								{errors.parent_id && <FormHelperText>{errors.parent_id}</FormHelperText>}
							</FormControl>
						</Grid>

						<Grid size={12}>
							<TextField
								fullWidth
								multiline
								rows={4}
								label="Mô tả"
								name="description"
								value={formData.description}
								onChange={handleChange}
								error={!!errors.description}
								helperText={errors.description || `${formData.description.length}/1000`}
							/>
						</Grid>
					</Grid>
				</Box>
			</DialogContent>

			<DialogActions sx={{ px: 3, py: 2 }}>
				<Button
					onClick={handleClose}
					variant="outlined"
					disabled={submitting}
					sx={{
						color: "#234C6A",
						borderColor: "#234C6A",
						"&:hover": {
							backgroundColor: "#1B3C53",
							color: "#ffffff",
						},
					}}
				>
					Hủy
				</Button>
				<Button
					onClick={handleSubmit}
					variant="contained"
					disabled={submitting}
					sx={{
						backgroundColor: "#234C6A",
						"&:hover": { backgroundColor: "#1B3C53" },
					}}
				>
					{submitting ? "Đang lưu..." : "Lưu danh mục"}
				</Button>
			</DialogActions>
			<Snackbar
				open={editToast.open}
				autoHideDuration={3000}
				onClose={closeEditToast}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}>
				<Alert onClose={closeEditToast} severity={editToast.severity} sx={{ width: "100%" }}>
					{editToast.message}
				</Alert>
			</Snackbar>
</Dialog>
	);
}




