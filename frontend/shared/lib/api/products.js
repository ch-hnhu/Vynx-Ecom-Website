import { supabase } from "../supabase";

/**
 * Get all products with related data
 */
export const getProducts = async (filters = {}) => {
	let query = supabase.from("products").select(`
      *,
      category:categories(*),
      brand:brands(*),
      promotion:promotions(*)
    `);

	// Apply filters
	if (filters.categoryId) {
		query = query.eq("category_id", filters.categoryId);
	}
	if (filters.brandId) {
		query = query.eq("brand_id", filters.brandId);
	}
	if (filters.search) {
		query = query.ilike("name", `%${filters.search}%`);
	}
	if (filters.minPrice) {
		query = query.gte("price", filters.minPrice);
	}
	if (filters.maxPrice) {
		query = query.lte("price", filters.maxPrice);
	}

	// Exclude soft-deleted products
	query = query.is("deleted_at", null);

	const { data, error } = await query.order("created_at", { ascending: false });

	if (error) throw error;
	return data;
};

/**
 * Get single product by ID
 */
export const getProductById = async (id) => {
	const { data, error } = await supabase
		.from("products")
		.select(
			`
      *,
      category:categories(*),
      brand:brands(*),
      promotion:promotions(*),
      reviews:product_reviews(
        *,
        user:users(id, username, full_name, image)
      ),
      attributes:product_attribute_values(
        *,
        attribute:attributes(*)
      )
    `,
		)
		.eq("id", id)
		.is("deleted_at", null)
		.single();

	if (error) throw error;
	return data;
};

/**
 * Get product by slug
 */
export const getProductBySlug = async (slug) => {
	const { data, error } = await supabase
		.from("products")
		.select(
			`
      *,
      category:categories(*),
      brand:brands(*),
      promotion:promotions(*),
      reviews:product_reviews(
        *,
        user:users(id, username, full_name, image)
      )
    `,
		)
		.eq("slug", slug)
		.is("deleted_at", null)
		.single();

	if (error) throw error;
	return data;
};

/**
 * Create new product (Admin only)
 */
export const createProduct = async (product) => {
	const { data, error } = await supabase.from("products").insert([product]).select().single();

	if (error) throw error;
	return data;
};

/**
 * Update product (Admin only)
 */
export const updateProduct = async (id, updates) => {
	const { data, error } = await supabase
		.from("products")
		.update(updates)
		.eq("id", id)
		.select()
		.single();

	if (error) throw error;
	return data;
};

/**
 * Soft delete product (Admin only)
 */
export const deleteProduct = async (id) => {
	const { data, error } = await supabase
		.from("products")
		.update({ deleted_at: new Date().toISOString() })
		.eq("id", id)
		.select()
		.single();

	if (error) throw error;
	return data;
};

/**
 * Upload product image to Supabase Storage
 */
export const uploadProductImage = async (file, productId) => {
	const fileExt = file.name.split(".").pop();
	const fileName = `${productId}-${Date.now()}.${fileExt}`;
	const filePath = `products/${fileName}`;

	const { data, error } = await supabase.storage.from("products").upload(filePath, file);

	if (error) throw error;

	// Get public URL
	const {
		data: { publicUrl },
	} = supabase.storage.from("products").getPublicUrl(filePath);

	return publicUrl;
};

/**
 * Get featured/popular products
 */
export const getFeaturedProducts = async (limit = 8) => {
	const { data, error } = await supabase
		.from("products")
		.select(
			`
      *,
      category:categories(*),
      brand:brands(*),
      promotion:promotions(*)
    `,
		)
		.is("deleted_at", null)
		.order("created_at", { ascending: false })
		.limit(limit);

	if (error) throw error;
	return data;
};

/**
 * Get related products (same category)
 */
export const getRelatedProducts = async (productId, categoryId, limit = 4) => {
	const { data, error } = await supabase
		.from("products")
		.select(
			`
      *,
      category:categories(*),
      brand:brands(*)
    `,
		)
		.eq("category_id", categoryId)
		.neq("id", productId)
		.is("deleted_at", null)
		.limit(limit);

	if (error) throw error;
	return data;
};
