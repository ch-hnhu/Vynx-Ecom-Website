import { supabase } from "../supabase";

/**
 * Get all brands
 */
export const getBrands = async () => {
	const { data, error } = await supabase
		.from("brands")
		.select("*")
		.is("deleted_at", null)
		.order("name");

	if (error) throw error;
	return data;
};

/**
 * Get single brand by ID
 */
export const getBrandById = async (id) => {
	const { data, error } = await supabase
		.from("brands")
		.select(
			`
      *,
      products:products(count)
    `,
		)
		.eq("id", id)
		.is("deleted_at", null)
		.single();

	if (error) throw error;
	return data;
};

/**
 * Get brand by slug
 */
export const getBrandBySlug = async (slug) => {
	const { data, error } = await supabase
		.from("brands")
		.select("*")
		.eq("slug", slug)
		.is("deleted_at", null)
		.single();

	if (error) throw error;
	return data;
};

/**
 * Create new brand (Admin only)
 */
export const createBrand = async (brand) => {
	const { data, error } = await supabase.from("brands").insert([brand]).select().single();

	if (error) throw error;
	return data;
};

/**
 * Update brand (Admin only)
 */
export const updateBrand = async (id, updates) => {
	const { data, error } = await supabase
		.from("brands")
		.update(updates)
		.eq("id", id)
		.select()
		.single();

	if (error) throw error;
	return data;
};

/**
 * Soft delete brand (Admin only)
 */
export const deleteBrand = async (id) => {
	const { data, error } = await supabase
		.from("brands")
		.update({ deleted_at: new Date().toISOString() })
		.eq("id", id)
		.select()
		.single();

	if (error) throw error;
	return data;
};

/**
 * Upload brand logo
 */
export const uploadBrandLogo = async (file, brandId) => {
	const fileExt = file.name.split(".").pop();
	const fileName = `${brandId}-${Date.now()}.${fileExt}`;
	const filePath = `brands/${fileName}`;

	const { data, error } = await supabase.storage.from("brands").upload(filePath, file);

	if (error) throw error;

	// Get public URL
	const {
		data: { publicUrl },
	} = supabase.storage.from("brands").getPublicUrl(filePath);

	return publicUrl;
};

/**
 * Get brands with product count
 */
export const getBrandsWithProductCount = async () => {
	const brands = await getBrands();

	// Get product counts for each brand
	const brandsWithCount = await Promise.all(
		brands.map(async (brand) => {
			const { count } = await supabase
				.from("products")
				.select("*", { count: "exact", head: true })
				.eq("brand_id", brand.id)
				.is("deleted_at", null);

			return {
				...brand,
				product_count: count,
			};
		}),
	);

	return brandsWithCount;
};

/**
 * Get featured brands (brands with most products)
 */
export const getFeaturedBrands = async (limit = 6) => {
	const brandsWithCount = await getBrandsWithProductCount();

	return brandsWithCount.sort((a, b) => b.product_count - a.product_count).slice(0, limit);
};
