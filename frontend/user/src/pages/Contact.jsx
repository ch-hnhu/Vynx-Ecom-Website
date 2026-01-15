import { Helmet } from "react-helmet-async";
import { useState} from "react"; 
import api from "../services/api";
import { useToast } from "@shared/hooks/useToast";

export default function Contact() {
	const [formData, setFormData] = useState({
		full_name: "",
		email: "",
		phone: "",
		content: "",
	});

	const [errors, setErrors] = useState({});
	const [submitting, setSubmitting] = useState(false);
	const { showSuccess, showError } = useToast();
	
	// Handle input change
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

	// Validate form
	const validate = () => {
		const newErrors = {};

		if (!formData.full_name.trim()) {
			newErrors.full_name = "Vui lòng nhập họ và tên";
		}

		if (!formData.phone.trim()) {
			newErrors.phone = "Vui lòng nhập số điện thoại";
		}

		if (!formData.content.trim()) {
			newErrors.content = "Vui lòng nhập nội dung liên hệ";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// Submit form
	const handleSubmit = (e) => {
		e.preventDefault();

		if (!validate()) return;

		setSubmitting(true);

		api.post("/support-requests", formData)
			.then(() => {
				showSuccess("Gửi liên hệ thành công!");
				
				setFormData({
					full_name: "",
					email: "",
					phone: "",
					content: "",
				});
				
			})
			.catch(() => {
				showError("Gửi liên hệ thất bại!");
				
			})
			.finally(() => {
				setSubmitting(false);
			});
		
	};


	return (
		<>
			<Helmet>
				<title>Liên hệ chúng tôi - Electro</title>
			</Helmet>

			<div className='container-fluid page-header py-5'>
				<h1 className='text-center text-white display-6 wow fadeInUp' data-wow-delay='0.1s'>
					Liên hệ chúng tôi
				</h1>
				<ol
					className='breadcrumb justify-content-center mb-0 wow fadeInUp'
					data-wow-delay='0.3s'>
					<li className='breadcrumb-item'>
						<a href='/Home'>Trang chủ</a>
					</li>
					<li className='breadcrumb-item'>
						<a href='/'>Trang</a>
					</li>
					<li className='breadcrumb-item active text-white'>Liên hệ</li>
				</ol>
			</div>

			<div className='container-fluid py-5'>
				<div className='container py-5'>
					<div className='row g-4'>
						<div className='col-lg-7'>
							<div className='bg-light rounded p-4 p-lg-5'>
								<h2 className='mb-3'>Gửi liên hệ</h2>
								<p className='text-muted mb-4'>
									Chúng tôi phản hồi trong giờ làm việc. Vui lòng mô tả rõ vấn
									đề để được hỗ trợ nhanh nhất.
								</p>
								<form onSubmit={handleSubmit}>
									<div className='row g-3'>
										<div className='col-md-6'>
											<input
												type='text'
												name="full_name"
												className='form-control'
												placeholder='Họ và tên'
												value={formData.full_name}
												onChange={handleChange}
											/>
											{errors.full_name && <p className="text-danger">{errors.full_name}</p>}
										</div>
										<div className='col-md-6'>
											<input
												type='email'
												name="email"
												className='form-control'
												placeholder='Email (Nếu có)'
												value={formData.email}
												onChange={handleChange}
											/>
										</div>
										<div className='col-md-12'>
											<input
												type='text'
												name="phone"
												className='form-control'
												placeholder='Số điện thoại'
												value={formData.phone}
												onChange={handleChange}
											/>											
										</div>
										{errors.phone && <p className="text-danger">{errors.phone}</p>}
										<div className='col-12'>
											<textarea
												className='form-control'
												name="content"
												rows='6'
												placeholder='Nội dung liên hệ'
												value={formData.content}
												onChange={handleChange}
											/>
											{errors.content && <p className="text-danger">{errors.content}</p>}
										</div>
										<div className='col-12'>
											<button
												type='submit' disabled={submitting}	
												className='btn btn-primary rounded-pill px-5 py-2'>
												{submitting?"Đang gửi...":"Gửi liên hệ"}
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>

						<div className='col-lg-5'>
							<div className='bg-white rounded p-4 border mb-4'>
								<h5 className='mb-3'>Thông tin liên hệ</h5>
								<p className='mb-2'>Email: </p>
								<p className='mb-2'>Hotline: </p>
								<p className='mb-0'>Thời gian: 9:00 - 18:00 (T2 - T7)</p>
							</div>

							<div className='bg-white rounded p-4 border mb-4'>
								<h5 className='mb-3'>Địa chỉ cửa hàng</h5>
								<p className='mb-0'>
									123 Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh
								</p>
							</div>

							<div className='bg-white rounded p-4 border'>
								<h5 className='mb-3'>Bản đồ</h5>
								<div
									className='rounded'
									style={{ height: 220, background: "rgba(0, 0, 0, 0.05)" }}>
									<div className='h-100 d-flex align-items-center justify-content-center text-muted'>
										<iframe
									className='rounded w-100'
									style={{ height: "100%" }}
									src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5138654110992!2d106.69867477506085!3d10.771899359277182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f40a3b49e59%3A0xa1bd14e483a602db!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEvhu7kgdGh14bqtdCBDYW8gVGjhuq9uZw!5e0!3m2!1svi!2s!4v1767708564153!5m2!1svi!2s'
									loading='lazy'
									referrerPolicy='no-referrer-when-downgrade'></iframe>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='row g-4 mt-4'>
						<div className='col-lg-4'>
							<div className='bg-light rounded p-4 h-100'>
								<h5 className='mb-3'>Hỗ trợ đơn hàng</h5>
								<p className='mb-0'>
									Cung cấp mã đơn hàng để được tra cứu trạng thái, đổi trả hoặc
									bảo hành nhanh hơn.
								</p>
							</div>
						</div>
						<div className='col-lg-4'>
							<div className='bg-light rounded p-4 h-100'>
								<h5 className='mb-3'>Tư vấn sản phẩm</h5>
								<p className='mb-0'>
									Đội ngũ tư vấn giúp bạn chọn sản phẩm phù hợp với nhu cầu và
									ngân sách.
								</p>
							</div>
						</div>
						<div className='col-lg-4'>
							<div className='bg-light rounded p-4 h-100'>
								<h5 className='mb-3'>Hợp tác &amp; báo giá</h5>
								<p className='mb-0'>
									Gửi thông tin doanh nghiệp để nhận chính sách giá và ưu đãi
									hợp tác.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
