import { supabase } from "../supabase";

/**
 * Get user's wishlist
 */
export const getWishlist = async (userId) => {
	const { data, error } = await supabase
		.from("wishlists")
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
		.eq("user_id", userId)
		.order("created_at", { ascending: false });

	if (error) throw error;
	return data;
};

/**
 * Add product to wishlist
 */
export const addToWishlist = async (userId, productId) => {
	// Check if already in wishlist
	const { data: existing } = await supabase
		.from("wishlists")
		.select("*")
		.eq("user_id", userId)
		.eq("product_id", productId)
		.single();

	if (existing) {
		return existing; // Already in wishlist
	}

	const { data, error } = await supabase
		.from("wishlists")
		.insert([
			{
				user_id: userId,
				product_id: productId,
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
 * Remove product from wishlist
 */
export const removeFromWishlist = async (wishlistId) => {
	const { error } = await supabase.from("wishlists").delete().eq("id", wishlistId);

	if (error) throw error;
	return { success: true };
};

/**
 * Remove product from wishlist by product ID
 */
export const removeFromWishlistByProductId = async (userId, productId) => {
	const { error } = await supabase
		.from("wishlists")
		.delete()
		.eq("user_id", userId)
		.eq("product_id", productId);

	if (error) throw error;
	return { success: true };
};

/**
 * Check if product is in wishlist
 */
export const isInWishlist = async (userId, productId) => {
	const { data, error } = await supabase
		.from("wishlists")
		.select("id")
		.eq("user_id", userId)
		.eq("product_id", productId)
		.single();

	if (error && error.code !== "PGRST116") {
		// PGRST116 = not found
		throw error;
	}

	return !!data;
};

/**
 * Toggle wishlist (add if not exists, remove if exists)
 */
export const toggleWishlist = async (userId, productId) => {
	const inWishlist = await isInWishlist(userId, productId);

	if (inWishlist) {
		return removeFromWishlistByProductId(userId, productId);
	} else {
		return addToWishlist(userId, productId);
	}
};

/**
 * Get wishlist count
 */
export const getWishlistCount = async (userId) => {
	const { count, error } = await supabase
		.from("wishlists")
		.select("*", { count: "exact", head: true })
		.eq("user_id", userId);

	if (error) throw error;
	return count;
};

/**
 * Clear entire wishlist
 */
export const clearWishlist = async (userId) => {
	const { error } = await supabase.from("wishlists").delete().eq("user_id", userId);

	if (error) throw error;
	return { success: true };
};

/**
 * Move wishlist item to cart
 */
export const moveToCart = async (userId, wishlistId, quantity = 1) => {
	// Get wishlist item
	const { data: wishlistItem, error: wishlistError } = await supabase
		.from("wishlists")
		.select("product_id")
		.eq("id", wishlistId)
		.single();

	if (wishlistError) throw wishlistError;

	// Add to cart
	const { data: cartItem, error: cartError } = await supabase
		.from("cart_items")
		.insert([
			{
				user_id: userId,
				product_id: wishlistItem.product_id,
				quantity,
			},
		])
		.select()
		.single();

	if (cartError) throw cartError;

	// Remove from wishlist
	await removeFromWishlist(wishlistId);

	return cartItem;
};
