import { supabase } from "../../lib/supabase.js";

/**
 * Service để xử lý các API liên quan đến categories
 */

/**
 * Lấy tất cả categories
 * @param {Object} options - Các tùy chọn
 * @param {string} options.parentSlug - Slug của category cha
 * @param {boolean} options.flat - Trả về danh sách phẳng (true) hoặc tree (false)
 * @returns {Promise<Array>}
 */
export const getCategories = async (options = {}) => {
	const { parentSlug, flat = false } = options;

	try {
		// Get all categories first
		const { data: allCategories, error } = await supabase
			.from("categories")
			.select("*")
			.is("deleted_at", null)
			.order("name", { ascending: true });

		if (error) throw error;

		const categories = allCategories || [];

		// If parentSlug specified, filter children only
		if (parentSlug) {
			// Find parent category
			const parent = categories.find((c) => c.slug === parentSlug);
			if (!parent) return [];

			// Return only direct children
			return categories.filter((c) => c.parent_id === parent.id);
		}

		// If flat, return all categories
		if (flat) {
			return categories;
		}

		// Otherwise, build tree structure with children_recursive for compatibility
		const buildTree = (parentId = null) => {
			return categories
				.filter((cat) => cat.parent_id === parentId)
				.map((cat) => ({
					...cat,
					children_recursive: buildTree(cat.id), // Laravel compatibility
					children: buildTree(cat.id), // Also add children for clarity
				}));
		};

		return buildTree(null); // Return root categories with children
	} catch (error) {
		console.error("Error fetching categories:", error);
		throw error;
	}
};

/**
 * Lấy category theo slug
 * @param {string} slug - Slug của category
 * @returns {Promise<Object>}
 */
export const getCategoryBySlug = async (slug) => {
	try {
		const { data, error } = await supabase
			.from("categories")
			.select("*")
			.eq("slug", slug)
			.is("deleted_at", null)
			.single();

		if (error) throw error;

		return data;
	} catch (error) {
		console.error("Error fetching category by slug:", error);
		throw error;
	}
};

/**
 * Lấy category tree (cây phân cấp)
 * @returns {Promise<Array>}
 */
export const getCategoryTree = async () => {
	try {
		// Lấy tất cả categories
		const { data: allCategories, error } = await supabase
			.from("categories")
			.select("*")
			.is("deleted_at", null)
			.order("name", { ascending: true });

		if (error) throw error;

		// Build tree structure
		const buildTree = (categories, parentId = null) => {
			return categories
				.filter((cat) => cat.parent_id === parentId)
				.map((cat) => ({
					...cat,
					children: buildTree(categories, cat.id),
				}));
		};

		return buildTree(allCategories);
	} catch (error) {
		console.error("Error fetching category tree:", error);
		throw error;
	}
};
