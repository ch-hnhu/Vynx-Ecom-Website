import { Helmet } from "react-helmet-async";

export default function About() {
	return (
		<>
			<Helmet>
				<title>Về chúng tôi - Electro</title>
			</Helmet>

			<div className='container-fluid page-header py-5'>
				<h1 className='text-center text-white display-6 wow fadeInUp' data-wow-delay='0.1s'>
					Về chúng tôi
				</h1>
				<ol
					className='breadcrumb justify-content-center mb-0 wow fadeInUp'
					data-wow-delay='0.3s'>
					<li className='breadcrumb-item'>
						<a href='/'>Trang chủ</a>
					</li>
					<li className='breadcrumb-item'>
						<a href='/'>Trang</a>
					</li>
					<li className='breadcrumb-item active text-white'>Về chúng tôi</li>
				</ol>
			</div>

			<div className='container-fluid py-5'>
				<div className='container py-5'>
					<div className='row g-4 align-items-center mb-5'>
						<div className='col-lg-6'>
							<div className='bg-light rounded p-4 p-lg-5 h-100'>
								<p className='text-uppercase text-primary mb-2'>Electro</p>
								<h2 className='mb-3'>Cửa hàng công nghệ cho người dùng thực tế</h2>
								<p className='mb-4'>
									Chúng tôi xây dựng Electro với mục tiêu đơn giản: giúp bạn
									mua đúng sản phẩm, đúng nhu cầu, đúng ngân sách. Mọi quy trình
									đều minh bạch, từ tư vấn đến hậu mãi.
								</p>
								<div className='d-flex flex-wrap gap-3'>
									<div className='bg-white border rounded px-3 py-2'>
										<strong>10K+</strong> khách hàng hài lòng
									</div>
									<div className='bg-white border rounded px-3 py-2'>
										<strong>48h</strong> giao hàng nội thành
									</div>
									<div className='bg-white border rounded px-3 py-2'>
										<strong>100%</strong> hàng chính hãng
									</div>
								</div>
							</div>
						</div>
						<div className='col-lg-6'>
							<div className='bg-white rounded p-4 p-lg-5 border h-100'>
								<h5 className='mb-3'>Cam kết dịch vụ</h5>
								<ul className='mb-4'>
									<li>Tư vấn đúng nhu cầu, không chèo kéo.</li>
									<li>Đổi trả minh bạch, bảo hành rõ ràng.</li>
									<li>Hỗ trợ kỹ thuật nhanh và có trách nhiệm.</li>
									<li>Giá cả cạnh tranh, ưu đãi rõ ràng.</li>
								</ul>
								<div className='d-flex flex-wrap gap-2'>
									<span className='badge bg-secondary'>Tư vấn 1:1</span>
									<span className='badge bg-secondary'>Bảo hành tận nơi</span>
									<span className='badge bg-secondary'>Kiểm tra miễn phí</span>
								</div>
							</div>
						</div>
					</div>

					<div className='row g-4 mb-5'>
						<div className='col-lg-4'>
							<div className='bg-light rounded p-4 h-100'>
								<h5 className='mb-3'>Tầm nhìn</h5>
								<p className='mb-0'>
									Trở thành điểm đến công nghệ đáng tin cậy với trải nghiệm mua
									sắm hiện đại, thân thiện và nhất quán.
								</p>
							</div>
						</div>
						<div className='col-lg-4'>
							<div className='bg-light rounded p-4 h-100'>
								<h5 className='mb-3'>Giá trị cốt lõi</h5>
								<p className='mb-0'>
									Chính trực, minh bạch và lấy khách hàng làm trung tâm trong mọi
									quyết định.
								</p>
							</div>
						</div>
						<div className='col-lg-4'>
							<div className='bg-light rounded p-4 h-100'>
								<h5 className='mb-3'>Đội ngũ</h5>
								<p className='mb-0'>
									Đội ngũ tư vấn am hiểu sản phẩm, kỹ thuật phản hồi nhanh và luôn
									đồng hành sau bán.
								</p>
							</div>
						</div>
					</div>

					<div className='row g-4 mb-5'>
						<div className='col-lg-7'>
							<div className='bg-white rounded p-4 p-lg-5 border h-100'>
								<h5 className='mb-3'>Hành trình phát triển</h5>
								<div className='row g-3'>
									<div className='col-md-6'>
										<div className='bg-light rounded p-3 h-100'>
											<p className='text-primary mb-1'>2022</p>
											<p className='mb-0'>Ra mắt cửa hàng đầu tiên tại TP.HCM.</p>
										</div>
									</div>
									<div className='col-md-6'>
										<div className='bg-light rounded p-3 h-100'>
											<p className='text-primary mb-1'>2023</p>
											<p className='mb-0'>Mở rộng danh mục laptop và gaming gear.</p>
										</div>
									</div>
									<div className='col-md-6'>
										<div className='bg-light rounded p-3 h-100'>
											<p className='text-primary mb-1'>2024</p>
											<p className='mb-0'>Triển khai giao hàng nhanh trong 48h.</p>
										</div>
									</div>
									<div className='col-md-6'>
										<div className='bg-light rounded p-3 h-100'>
											<p className='text-primary mb-1'>2025</p>
											<p className='mb-0'>Hệ thống chăm sóc khách hàng 1:1.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='col-lg-5'>
							<div className='bg-light rounded p-4 p-lg-5 h-100'>
								<h5 className='mb-3'>Vì sao chọn Electro</h5>
								<ul className='mb-0'>
									<li>Kiểm tra sản phẩm trước khi giao.</li>
									<li>Hỗ trợ cài đặt và tối ưu theo nhu cầu.</li>
									<li>Chính sách đổi trả trong 7 ngày.</li>
									<li>Ưu đãi định kỳ cho khách hàng thân thiết.</li>
								</ul>
							</div>
						</div>
					</div>

					<div className='row g-4'>
						<div className='col-lg-6'>
							<div className='bg-white rounded p-4 border h-100'>
								<h5 className='mb-3'>Liên hệ hợp tác</h5>
								<p className='mb-0'>
									Nếu bạn là nhà phân phối, đại lý hoặc đối tác thương hiệu,
									hãy liên hệ để cùng phát triển bền vững.
								</p>
							</div>
						</div>
						<div className='col-lg-6'>
							<div className='bg-white rounded p-4 border h-100'>
								<h5 className='mb-3'>Kết nối với chúng tôi</h5>
								<p className='mb-0'>
									Theo dõi Electro để cập nhật sản phẩm mới, ưu đãi và các mẹo
									sử dụng công nghệ hiệu quả.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
