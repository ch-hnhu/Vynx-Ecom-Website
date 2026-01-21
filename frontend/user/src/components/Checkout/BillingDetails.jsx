import { useMemo, useState, useEffect } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useCart } from "../Cart/CartContext.jsx";
import { formatCurrency } from "@shared/utils/formatHelper.jsx";
import { getFinalPrice } from "@shared/utils/productHelper.jsx";
import { useToast } from "@shared/hooks/useToast.js";
import api from "../../services/api";
import { getUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const DEFAULT_FORM = {
	shipping_name: "",
	shipping_phone: "",
	shipping_email: "",
	shipping_address: "",
	shipping_note: "",
};

export default function BillingDetails() {
	const { items, subtotal, clearCart } = useCart();
	const { toast, showSuccess, showError, closeToast } = useToast();
	const navigate = useNavigate();
	const [formData, setFormData] = useState(DEFAULT_FORM);
	const [shippingOption, setShippingOption] = useState("standard");
	const [paymentMethod, setPaymentMethod] = useState("cod");
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		const user = getUser();
		if (user) {
			setFormData((prev) => ({
				...prev,
				shipping_name: user.full_name || "",
				shipping_phone: user.phone || "",
				shipping_email: user.email || "",
				shipping_address: user.address || "",
			}));
		}
	}, []);

	const shippingFee = useMemo(() => {
		if (shippingOption === "standard") return 15000;
		if (shippingOption === "express") return 30000;
		if (shippingOption === "pickup") return 0;
		return 15000;
	}, [shippingOption]);

	const totalAmount = useMemo(() => subtotal + shippingFee, [subtotal, shippingFee]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const validate = () => {
		if (!formData.shipping_name.trim()) {
			showError("Vui lòng nhập tên người nhận");
			return false;
		}
		if (!formData.shipping_phone.trim()) {
			showError("Vui lòng nhập số điện thoại");
			return false;
		}
		if (!formData.shipping_address.trim()) {
			showError("Vui lòng nhập địa chỉ giao hàng");
			return false;
		}
		return true;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!items.length) {
			showError("Giỏ hàng đang trống");
			return;
		}

		if (!validate()) return;

		setSubmitting(true);

		const orderItems = items.map((item) => ({
			product_id: item.product.id,
			quantity: item.quantity,
			price: getFinalPrice(item.product),
			total: getFinalPrice(item.product) * item.quantity,
		}));

		const payload = {
			...formData,
			user_id: getUser()?.id || null,
			subtotal_amount: subtotal,
			discount_amount: 0,
			shipping_fee: shippingFee,
			total_amount: totalAmount,
			final_amount: totalAmount,
			payment_method: paymentMethod,
			order_items: orderItems,
		};

		try {
			const res = await api.post("/orders", payload);
			if (res.data.success) {
				const orderId = res.data.data.id;

				if (paymentMethod === "vnpay") {
					const vnpayRes = await api.post("/vnpay_payment", {
						order_id: orderId,
						total_vnpay: totalAmount,
					});
					if (vnpayRes.data.code === "00") {
						clearCart();
						window.location.href = vnpayRes.data.data;
					} else {
						showError("Lỗi tạo link thanh toán VNPAY");
						setSubmitting(false);
					}
				} else {
					showSuccess("Đặt hàng thành công!");
					clearCart();
					setTimeout(() => {
						navigate("/thanh-toan-thanh-cong");
					}, 1000);
				}
			} else {
				showError(res.data.message || "Đặt hàng thất bại");
				setSubmitting(false);
			}
		} catch (error) {
			console.error(error);
			showError("Có lỗi xảy ra khi đặt hàng");
			setSubmitting(false);
		}
	};

	return (
		<>
			<div className='container-fluid bg-light overflow-hidden py-5'>
				<div className='container py-5'>
					<h1 className='mb-4 wow fadeInUp' data-wow-delay='0.1s'>
						Thông tin thanh toán
					</h1>
					<form action='#' onSubmit={handleSubmit}>
						<div className='row g-5'>
							<div
								className='col-md-12 col-lg-6 col-xl-6 wow fadeInUp'
								data-wow-delay='0.1s'>
								<div className='form-item'>
									<label className='form-label my-3'>
										Họ tên người nhận<sup>*</sup>
									</label>
									<input
										type='text'
										className='form-control'
										name='shipping_name'
										value={formData.shipping_name}
										onChange={handleChange}
										placeholder='Nguyễn Văn A'
									/>
								</div>
								<div className='form-item'>
									<label className='form-label my-3'>
										Số điện thoại<sup>*</sup>
									</label>
									<input
										type='tel'
										className='form-control'
										name='shipping_phone'
										value={formData.shipping_phone}
										onChange={handleChange}
										placeholder='0901234567'
									/>
								</div>
								<div className='form-item'>
									<label className='form-label my-3'>Email</label>
									<input
										type='email'
										className='form-control'
										name='shipping_email'
										value={formData.shipping_email}
										onChange={handleChange}
										placeholder='email@example.com'
									/>
								</div>
								<div className='form-item'>
									<label className='form-label my-3'>
										Địa chỉ nhận hàng<sup>*</sup>
									</label>
									<input
										type='text'
										className='form-control'
										name='shipping_address'
										value={formData.shipping_address}
										onChange={handleChange}
										placeholder='Số nhà, tên đường, phường/xã, quận/huyện'
									/>
								</div>
								<div className='form-item'>
									<label className='form-label my-3'>Ghi chú</label>
									<textarea
										name='shipping_note'
										className='form-control'
										spellCheck='false'
										cols='30'
										rows='4'
										placeholder='Ghi chú đơn hàng (tùy chọn)'
										value={formData.shipping_note}
										onChange={handleChange}></textarea>
								</div>
							</div>
							<div
								className='col-md-12 col-lg-6 col-xl-6 wow fadeInUp'
								data-wow-delay='0.3s'>
								<div className='table-responsive'>
									<table className='table'>
										<thead>
											<tr className='text-center'>
												<th scope='col' className='text-start'>
													Sản phẩm
												</th>
												<th scope='col'>Giá</th>
												<th scope='col'>SL</th>
												<th scope='col'>Thành tiền</th>
											</tr>
										</thead>
										<tbody>
											{items.length === 0 ? (
												<tr className='text-center'>
													<td colSpan='4' className='py-4 text-muted'>
														Giỏ hàng đang trống
													</td>
												</tr>
											) : (
												items.map((item) => {
													const price = getFinalPrice(item.product);
													return (
														<tr
															className='text-center'
															key={item.product.id}>
															<th
																scope='row'
																className='text-start py-4'>
																{item.product.name}
															</th>
															<td className='py-4'>
																{formatCurrency(price)}
															</td>
															<td className='py-4 text-center'>
																{item.quantity}
															</td>
															<td className='py-4'>
																{formatCurrency(
																	price * item.quantity,
																)}
															</td>
														</tr>
													);
												})
											)}
											<tr>
												<th scope='row'></th>
												<td className='py-4'></td>
												<td className='py-4'>
													<p className='mb-0 text-dark py-2'>Tạm tính</p>
												</td>
												<td className='py-4'>
													<div className='py-2 text-center border-bottom border-top'>
														<p className='mb-0 text-dark'>
															{formatCurrency(subtotal)}
														</p>
													</div>
												</td>
											</tr>
											<tr>
												<th scope='row'></th>
												<td className='py-4'>
													<p className='mb-0 text-dark py-4'>
														Vận chuyển
													</p>
												</td>
												<td colSpan='2' className='py-4'>
													<div className='form-check text-start'>
														<input
															type='radio'
															className='form-check-input bg-primary border-0'
															id='Shipping-2'
															name='Shipping'
															value='standard'
															checked={shippingOption === "standard"}
															onChange={() =>
																setShippingOption("standard")
															}
														/>
														<label
															className='form-check-label'
															htmlFor='Shipping-2'>
															Phí vận chuyển: {formatCurrency(15000)}
														</label>
													</div>
													<div className='form-check text-start'>
														<input
															type='radio'
															className='form-check-input bg-primary border-0'
															id='Shipping-3'
															name='Shipping'
															value='pickup'
															checked={shippingOption === "pickup"}
															onChange={() =>
																setShippingOption("pickup")
															}
														/>
														<label
															className='form-check-label'
															htmlFor='Shipping-3'>
															Nhận tại cửa hàng: Miễn phí
														</label>
													</div>
												</td>
											</tr>
											<tr>
												<th scope='row'></th>
												<td className='py-4'>
													<p className='mb-0 text-dark text-uppercase py-2'>
														Tổng cộng
													</p>
												</td>
												<td className='py-4'></td>
												<td className='py-4'>
													<div className='py-2 text-center border-bottom border-top'>
														<p className='mb-0 text-dark'>
															{formatCurrency(totalAmount)}
														</p>
													</div>
												</td>
											</tr>
										</tbody>
									</table>
								</div>

								<div className='row g-4 text-center align-items-center justify-content-center border-bottom py-2'>
									<div className='col-12'>
										<div className='form-check text-start my-2'>
											<input
												type='radio'
												className='form-check-input bg-primary border-0'
												id='Delivery-1'
												name='Payment'
												value='cod'
												checked={paymentMethod === "cod"}
												onChange={() => setPaymentMethod("cod")}
											/>
											<label
												className='form-check-label'
												htmlFor='Delivery-1'>
												Thanh toán khi nhận hàng (COD)
											</label>
										</div>
									</div>
								</div>
								<div className='row g-4 text-center align-items-center justify-content-center border-bottom py-2'>
									<div className='col-12'>
										<div className='form-check text-start my-2'>
											<input
												type='radio'
												className='form-check-input bg-primary border-0'
												id='VnPay-1'
												name='Payment'
												value='vnpay'
												checked={paymentMethod === "vnpay"}
												onChange={() => setPaymentMethod("vnpay")}
											/>
											<label className='form-check-label' htmlFor='VnPay-1'>
												Thanh toán qua VNPAY
											</label>
										</div>
									</div>
								</div>

								<div className='row g-4 text-center align-items-center justify-content-center pt-4'>
									<button
										type='submit'
										disabled={submitting}
										className='btn btn-primary border-secondary py-3 px-4 text-uppercase w-100 text-primary'>
										{submitting ? "Đang xử lý..." : "Đặt hàng"}
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
			<Snackbar
				open={toast.open}
				autoHideDuration={2500}
				onClose={closeToast}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}>
				<Alert onClose={closeToast} severity={toast.severity} sx={{ width: "100%" }}>
					{toast.message}
				</Alert>
			</Snackbar>
		</>
	);
}
