import { supabase } from "../supabase";

/**
 * Get user's cart items
 */
export const getCart = async (userId) => {
	const { data, error } = await supabase
		.from("cart_items")
		.select(
			`
      *,
      product:products(
        *,
        category:categories(*),
        brand:brands(*),
        promotion:promotions(*)
      )
    `,
		)
		.eq("user_id", userId);

	if (error) throw error;
	return data;
};

/**
 * Add item to cart
 */
export const addToCart = async (userId, productId, quantity = 1, attributes = null) => {
	// Check if item already exists in cart
	const { data: existingItem } = await supabase
		.from("cart_items")
		.select("*")
		.eq("user_id", userId)
		.eq("product_id", productId)
		.single();

	if (existingItem) {
		// Update quantity if item exists
		return updateCartItemQuantity(existingItem.id, existingItem.quantity + quantity);
	}

	// Add new item
	const { data, error } = await supabase
		.from("cart_items")
		.insert([
			{
				user_id: userId,
				product_id: productId,
				quantity,
				attributes,
			},
		])
		.select(
			`
      *,
      product:products(
        *,
        category:categories(*),
        brand:brands(*)
      )
    `,
		)
		.single();

	if (error) throw error;
	return data;
};

/**
 * Update cart item quantity
 */
export const updateCartItemQuantity = async (cartItemId, quantity) => {
	if (quantity <= 0) {
		return removeFromCart(cartItemId);
	}

	const { data, error } = await supabase
		.from("cart_items")
		.update({ quantity })
		.eq("id", cartItemId)
		.select(
			`
      *,
      product:products(
        *,
        category:categories(*),
        brand:brands(*)
      )
    `,
		)
		.single();

	if (error) throw error;
	return data;
};

/**
 * Remove item from cart
 */
export const removeFromCart = async (cartItemId) => {
	const { error } = await supabase.from("cart_items").delete().eq("id", cartItemId);

	if (error) throw error;
	return { success: true };
};

/**
 * Clear entire cart
 */
export const clearCart = async (userId) => {
	const { error } = await supabase.from("cart_items").delete().eq("user_id", userId);

	if (error) throw error;
	return { success: true };
};

/**
 * Get cart item count
 */
export const getCartCount = async (userId) => {
	const { count, error } = await supabase
		.from("cart_items")
		.select("*", { count: "exact", head: true })
		.eq("user_id", userId);

	if (error) throw error;
	return count;
};

/**
 * Get cart total
 */
export const getCartTotal = async (userId) => {
	const { data, error } = await supabase
		.from("cart_items")
		.select(
			`
      quantity,
      product:products(price, promotion:promotions(*))
    `,
		)
		.eq("user_id", userId);

	if (error) throw error;

	const total = data.reduce((sum, item) => {
		let price = parseFloat(item.product.price);

		// Apply promotion if exists
		if (item.product.promotion && item.product.promotion.is_active) {
			const discount = parseFloat(item.product.promotion.discount_percentage);
			price = price * (1 - discount / 100);
		}

		return sum + price * item.quantity;
	}, 0);

	return total;
};

/**
 * Update cart item attributes (size, color, etc.)
 */
export const updateCartItemAttributes = async (cartItemId, attributes) => {
	const { data, error } = await supabase
		.from("cart_items")
		.update({ attributes })
		.eq("id", cartItemId)
		.select()
		.single();

	if (error) throw error;
	return data;
};
