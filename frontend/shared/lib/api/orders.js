import { supabase } from "../supabase";

/**
 * Get user's orders
 */
export const getOrders = async (userId, filters = {}) => {
	let query = supabase
		.from("orders")
		.select(
			`
      *,
      user:users(id, username, full_name, email, phone),
      items:order_items(
        *,
        product:products(
          *,
          category:categories(*),
          brand:brands(*)
        )
      ),
      shipping_address:user_addresses(*)
    `,
		)
		.eq("user_id", userId)
		.order("created_at", { ascending: false });

	// Apply filters
	if (filters.status) {
		query = query.eq("status", filters.status);
	}

	const { data, error } = await query;

	if (error) throw error;
	return data;
};

/**
 * Get single order by ID
 */
export const getOrderById = async (orderId) => {
	const { data, error } = await supabase
		.from("orders")
		.select(
			`
      *,
      user:users(id, username, full_name, email, phone),
      items:order_items(
        *,
        product:products(
          *,
          category:categories(*),
          brand:brands(*)
        )
      ),
      shipping_address:user_addresses(*)
    `,
		)
		.eq("id", orderId)
		.single();

	if (error) throw error;
	return data;
};

/**
 * Get order by order number
 */
export const getOrderByNumber = async (orderNumber) => {
	const { data, error } = await supabase
		.from("orders")
		.select(
			`
      *,
      user:users(id, username, full_name, email, phone),
      items:order_items(
        *,
        product:products(
          *,
          category:categories(*),
          brand:brands(*)
        )
      ),
      shipping_address:user_addresses(*)
    `,
		)
		.eq("order_number", orderNumber)
		.single();

	if (error) throw error;
	return data;
};

/**
 * Create new order from cart
 */
export const createOrder = async (orderData) => {
	const { userId, cartItems, shippingAddressId, paymentMethod, notes } = orderData;

	// Calculate totals
	const subtotal = cartItems.reduce((sum, item) => {
		return sum + parseFloat(item.product.price) * item.quantity;
	}, 0);

	const shippingFee = 30000; // Fixed shipping fee, can be dynamic
	const total = subtotal + shippingFee;

	// 1. Create order
	const { data: order, error: orderError } = await supabase
		.from("orders")
		.insert([
			{
				user_id: userId,
				shipping_address_id: shippingAddressId,
				payment_method: paymentMethod,
				payment_status: "pending",
				status: "pending",
				subtotal,
				shipping_fee: shippingFee,
				total,
				notes,
			},
		])
		.select()
		.single();

	if (orderError) throw orderError;

	// 2. Create order items
	const orderItems = cartItems.map((item) => ({
		order_id: order.id,
		product_id: item.product_id,
		quantity: item.quantity,
		price: item.product.price,
		attributes: item.attributes,
	}));

	const { error: itemsError } = await supabase.from("order_items").insert(orderItems);

	if (itemsError) throw itemsError;

	// 3. Clear cart
	const { error: clearCartError } = await supabase
		.from("cart_items")
		.delete()
		.eq("user_id", userId);

	if (clearCartError) throw clearCartError;

	// 4. Return complete order
	return getOrderById(order.id);
};

/**
 * Update order status (Admin only)
 */
export const updateOrderStatus = async (orderId, status) => {
	const { data, error } = await supabase
		.from("orders")
		.update({ status })
		.eq("id", orderId)
		.select()
		.single();

	if (error) throw error;
	return data;
};

/**
 * Update payment status (Admin only)
 */
export const updatePaymentStatus = async (orderId, paymentStatus) => {
	const { data, error } = await supabase
		.from("orders")
		.update({ payment_status: paymentStatus })
		.eq("id", orderId)
		.select()
		.single();

	if (error) throw error;
	return data;
};

/**
 * Cancel order
 */
export const cancelOrder = async (orderId, reason) => {
	const { data, error } = await supabase
		.from("orders")
		.update({
			status: "cancelled",
			notes: reason,
		})
		.eq("id", orderId)
		.select()
		.single();

	if (error) throw error;
	return data;
};

/**
 * Get all orders (Admin only)
 */
export const getAllOrders = async (filters = {}) => {
	let query = supabase
		.from("orders")
		.select(
			`
      *,
      user:users(id, username, full_name, email, phone),
      items:order_items(count)
    `,
		)
		.order("created_at", { ascending: false });

	// Apply filters
	if (filters.status) {
		query = query.eq("status", filters.status);
	}
	if (filters.paymentStatus) {
		query = query.eq("payment_status", filters.paymentStatus);
	}
	if (filters.dateFrom) {
		query = query.gte("created_at", filters.dateFrom);
	}
	if (filters.dateTo) {
		query = query.lte("created_at", filters.dateTo);
	}

	const { data, error } = await query;

	if (error) throw error;
	return data;
};

/**
 * Get order statistics (Admin only)
 */
export const getOrderStats = async () => {
	const { data, error } = await supabase.rpc("get_order_statistics");

	if (error) {
		// Fallback calculation if RPC doesn't exist
		const { data: orders } = await supabase
			.from("orders")
			.select("status, total, payment_status");

		const stats = {
			total: orders.length,
			pending: orders.filter((o) => o.status === "pending").length,
			processing: orders.filter((o) => o.status === "processing").length,
			shipped: orders.filter((o) => o.status === "shipped").length,
			delivered: orders.filter((o) => o.status === "delivered").length,
			cancelled: orders.filter((o) => o.status === "cancelled").length,
			totalRevenue: orders
				.filter((o) => o.payment_status === "paid")
				.reduce((sum, o) => sum + parseFloat(o.total), 0),
		};

		return stats;
	}

	return data;
};
