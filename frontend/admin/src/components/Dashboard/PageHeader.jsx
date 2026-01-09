export default function PageHeader({ title, breadcrumbs }) {
	return (
		<div className='app-content-header'>
			<div className='container-fluid'>
				<div className='row'>
					<div className='col-sm-6'>
						<h3 className='mb-0'>{title}</h3>
					</div>
					<div className='col-sm-6'>
						<ol className='breadcrumb float-sm-end'>
							{breadcrumbs.map((item, index) => (
								<li
									key={index}
									className={`breadcrumb-item ${item.active ? "active" : ""}`}
									aria-current={item.active ? "page" : undefined}>
									{item.active ? (
										item.label
									) : (
										<a href={item.href}>{item.label}</a>
									)}
								</li>
							))}
						</ol>
					</div>
				</div>
			</div>
		</div>
	);
}
