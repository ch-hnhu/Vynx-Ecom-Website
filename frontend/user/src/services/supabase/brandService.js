import { supabase } from "../../lib/supabase.js";

/**
 * Service để xử lý các API liên quan đến brands
 */

/**
 * Lấy tất cả brands
 * @param {Object} options - Các tùy chọn
 * @param {number} options.perPage - Số lượng brands mỗi trang
 * @returns {Promise<Array>}
 */
export const getBrands = async (options = {}) => {
	const { perPage = 1000 } = options;

	try {
		let query = supabase
			.from("brands")
			.select("*")
			.is("deleted_at", null)
			.order("name", { ascending: true });

		if (perPage) {
			query = query.limit(perPage);
		}

		const { data, error } = await query;

		if (error) throw error;

		return data || [];
	} catch (error) {
		console.error("Error fetching brands:", error);
		throw error;
	}
};

/**
 * Lấy brand theo slug
 * @param {string} slug - Slug của brand
 * @returns {Promise<Object>}
 */
export const getBrandBySlug = async (slug) => {
	try {
		const { data, error } = await supabase
			.from("brands")
			.select("*")
			.eq("slug", slug)
			.is("deleted_at", null)
			.single();

		if (error) throw error;

		return data;
	} catch (error) {
		console.error("Error fetching brand by slug:", error);
		throw error;
	}
};
