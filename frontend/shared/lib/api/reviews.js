import { supabase } from "../supabase";

/**
 * Get reviews for a product
 */
export const getProductReviews = async (productId) => {
	const { data, error } = await supabase
		.from("product_reviews")
		.select(
			`
      *,
      user:users(id, username, full_name, image)
    `,
		)
		.eq("product_id", productId)
		.is("deleted_at", null)
		.order("created_at", { ascending: false });

	if (error) throw error;
	return data;
};

/**
 * Get user's reviews
 */
export const getUserReviews = async (userId) => {
	const { data, error } = await supabase
		.from("product_reviews")
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
		.eq("user_id", userId)
		.is("deleted_at", null)
		.order("created_at", { ascending: false });

	if (error) throw error;
	return data;
};

/**
 * Create new review
 */
export const createReview = async (review) => {
	const { data, error } = await supabase
		.from("product_reviews")
		.insert([review])
		.select(
			`
      *,
      user:users(id, username, full_name, image)
    `,
		)
		.single();

	if (error) throw error;
	return data;
};

/**
 * Update review
 */
export const updateReview = async (reviewId, updates) => {
	const { data, error } = await supabase
		.from("product_reviews")
		.update(updates)
		.eq("id", reviewId)
		.select(
			`
      *,
      user:users(id, username, full_name, image)
    `,
		)
		.single();

	if (error) throw error;
	return data;
};

/**
 * Soft delete review
 */
export const deleteReview = async (reviewId) => {
	const { data, error } = await supabase
		.from("product_reviews")
		.update({ deleted_at: new Date().toISOString() })
		.eq("id", reviewId)
		.select()
		.single();

	if (error) throw error;
	return data;
};

/**
 * Get review statistics for a product
 */
export const getProductReviewStats = async (productId) => {
	const { data, error } = await supabase
		.from("product_reviews")
		.select("rating")
		.eq("product_id", productId)
		.is("deleted_at", null);

	if (error) throw error;

	const total = data.length;
	const sum = data.reduce((acc, review) => acc + review.rating, 0);
	const average = total > 0 ? sum / total : 0;

	// Count by rating
	const ratingCounts = {
		5: data.filter((r) => r.rating === 5).length,
		4: data.filter((r) => r.rating === 4).length,
		3: data.filter((r) => r.rating === 3).length,
		2: data.filter((r) => r.rating === 2).length,
		1: data.filter((r) => r.rating === 1).length,
	};

	return {
		total,
		average: parseFloat(average.toFixed(1)),
		ratingCounts,
	};
};

/**
 * Check if user has reviewed a product
 */
export const hasUserReviewed = async (userId, productId) => {
	const { data, error } = await supabase
		.from("product_reviews")
		.select("id")
		.eq("user_id", userId)
		.eq("product_id", productId)
		.is("deleted_at", null)
		.single();

	if (error && error.code !== "PGRST116") {
		// PGRST116 = not found
		throw error;
	}

	return !!data;
};

/**
 * Get review by user and product
 */
export const getUserProductReview = async (userId, productId) => {
	const { data, error } = await supabase
		.from("product_reviews")
		.select(
			`
      *,
      user:users(id, username, full_name, image)
    `,
		)
		.eq("user_id", userId)
		.eq("product_id", productId)
		.is("deleted_at", null)
		.single();

	if (error && error.code !== "PGRST116") {
		throw error;
	}

	return data;
};

/**
 * Get recent reviews (all products)
 */
export const getRecentReviews = async (limit = 10) => {
	const { data, error } = await supabase
		.from("product_reviews")
		.select(
			`
      *,
      user:users(id, username, full_name, image),
      product:products(id, name, slug, image_url)
    `,
		)
		.is("deleted_at", null)
		.order("created_at", { ascending: false })
		.limit(limit);

	if (error) throw error;
	return data;
};

/**
 * Get top rated products
 */
export const getTopRatedProducts = async (limit = 10) => {
	// This would be better with a database view or materialized view
	// For now, we'll fetch products and calculate ratings
	const { data: products, error } = await supabase
		.from("products")
		.select(
			`
      *,
      category:categories(*),
      brand:brands(*),
      reviews:product_reviews(rating)
    `,
		)
		.is("deleted_at", null);

	if (error) throw error;

	// Calculate average ratings
	const productsWithRatings = products
		.map((product) => {
			const reviews = product.reviews;
			const total = reviews.length;
			const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
			const average = total > 0 ? sum / total : 0;

			return {
				...product,
				reviewCount: total,
				averageRating: parseFloat(average.toFixed(1)),
			};
		})
		.filter((p) => p.reviewCount > 0) // Only products with reviews
		.sort((a, b) => {
			// Sort by rating first, then by review count
			if (b.averageRating === a.averageRating) {
				return b.reviewCount - a.reviewCount;
			}
			return b.averageRating - a.averageRating;
		})
		.slice(0, limit);

	return productsWithRatings;
};
