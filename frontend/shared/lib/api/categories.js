import { supabase } from "../supabase";

/**
 * Get all categories
 */
export const getCategories = async () => {
	const { data, error } = await supabase
		.from("categories")
		.select("*")
		.is("deleted_at", null)
		.order("name");

	if (error) throw error;
	return data;
};

/**
 * Get category tree with parent-child relationships
 */
export const getCategoryTree = async () => {
	const { data, error } = await supabase
		.from("categories")
		.select("*")
		.is("deleted_at", null)
		.order("parent_id", { ascending: true })
		.order("name");

	if (error) throw error;

	// Build tree structure
	const categoriesMap = {};
	const tree = [];

	// First pass: create map
	data.forEach((category) => {
		categoriesMap[category.id] = { ...category, children: [] };
	});

	// Second pass: build tree
	data.forEach((category) => {
		if (category.parent_id) {
			// Add as child to parent
			if (categoriesMap[category.parent_id]) {
				categoriesMap[category.parent_id].children.push(categoriesMap[category.id]);
			}
		} else {
			// Top-level category
			tree.push(categoriesMap[category.id]);
		}
	});

	return tree;
};

/**
 * Get single category by ID
 */
export const getCategoryById = async (id) => {
	const { data, error } = await supabase
		.from("categories")
		.select(
			`
      *,
      parent:categories!parent_id(*),
      children:categories!parent_id(*),
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
 * Get category by slug
 */
export const getCategoryBySlug = async (slug) => {
	const { data, error } = await supabase
		.from("categories")
		.select("*")
		.eq("slug", slug)
		.is("deleted_at", null)
		.single();

	if (error) throw error;
	return data;
};

/**
 * Get parent categories (no parent_id)
 */
export const getParentCategories = async () => {
	const { data, error } = await supabase
		.from("categories")
		.select("*")
		.is("parent_id", null)
		.is("deleted_at", null)
		.order("name");

	if (error) throw error;
	return data;
};

/**
 * Get child categories of a parent
 */
export const getChildCategories = async (parentId) => {
	const { data, error } = await supabase
		.from("categories")
		.select("*")
		.eq("parent_id", parentId)
		.is("deleted_at", null)
		.order("name");

	if (error) throw error;
	return data;
};

/**
 * Create new category (Admin only)
 */
export const createCategory = async (category) => {
	const { data, error } = await supabase.from("categories").insert([category]).select().single();

	if (error) throw error;
	return data;
};

/**
 * Update category (Admin only)
 */
export const updateCategory = async (id, updates) => {
	const { data, error } = await supabase
		.from("categories")
		.update(updates)
		.eq("id", id)
		.select()
		.single();

	if (error) throw error;
	return data;
};

/**
 * Soft delete category (Admin only)
 */
export const deleteCategory = async (id) => {
	const { data, error } = await supabase
		.from("categories")
		.update({ deleted_at: new Date().toISOString() })
		.eq("id", id)
		.select()
		.single();

	if (error) throw error;
	return data;
};

/**
 * Upload category image
 */
export const uploadCategoryImage = async (file, categoryId) => {
	const fileExt = file.name.split(".").pop();
	const fileName = `${categoryId}-${Date.now()}.${fileExt}`;
	const filePath = `categories/${fileName}`;

	const { data, error } = await supabase.storage.from("categories").upload(filePath, file);

	if (error) throw error;

	// Get public URL
	const {
		data: { publicUrl },
	} = supabase.storage.from("categories").getPublicUrl(filePath);

	return publicUrl;
};

/**
 * Get category with product count
 */
export const getCategoriesWithProductCount = async () => {
	const { data, error } = await supabase.rpc("get_categories_with_product_count");

	if (error) {
		// Fallback if RPC function doesn't exist
		const categories = await getCategories();

		// Get product counts for each category
		const categoriesWithCount = await Promise.all(
			categories.map(async (category) => {
				const { count } = await supabase
					.from("products")
					.select("*", { count: "exact", head: true })
					.eq("category_id", category.id)
					.is("deleted_at", null);

				return {
					...category,
					product_count: count,
				};
			}),
		);

		return categoriesWithCount;
	}

	return data;
};
