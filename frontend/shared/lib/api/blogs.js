import { supabase } from "../supabase";

/**
 * Get all blogs
 */
export const getBlogs = async (filters = {}) => {
	let query = supabase
		.from("blogs")
		.select(
			`
      *,
      author:users(id, username, full_name, image)
    `,
		)
		.is("deleted_at", null)
		.order("created_at", { ascending: false });

	// Apply filters
	if (filters.status) {
		query = query.eq("status", filters.status);
	}
	if (filters.search) {
		query = query.ilike("title", `%${filters.search}%`);
	}

	const { data, error } = await query;

	if (error) throw error;
	return data;
};

/**
 * Get published blogs only
 */
export const getPublishedBlogs = async (limit = null) => {
	let query = supabase
		.from("blogs")
		.select(
			`
      *,
      author:users(id, username, full_name, image)
    `,
		)
		.eq("status", "published")
		.is("deleted_at", null)
		.order("created_at", { ascending: false });

	if (limit) {
		query = query.limit(limit);
	}

	const { data, error } = await query;

	if (error) throw error;
	return data;
};

/**
 * Get single blog by ID
 */
export const getBlogById = async (id) => {
	const { data, error } = await supabase
		.from("blogs")
		.select(
			`
      *,
      author:users(id, username, full_name, image)
    `,
		)
		.eq("id", id)
		.is("deleted_at", null)
		.single();

	if (error) throw error;
	return data;
};

/**
 * Get blog by slug
 */
export const getBlogBySlug = async (slug) => {
	const { data, error } = await supabase
		.from("blogs")
		.select(
			`
      *,
      author:users(id, username, full_name, image)
    `,
		)
		.eq("slug", slug)
		.is("deleted_at", null)
		.single();

	if (error) throw error;
	return data;
};

/**
 * Create new blog (Admin only)
 */
export const createBlog = async (blog) => {
	const { data, error } = await supabase.from("blogs").insert([blog]).select().single();

	if (error) throw error;
	return data;
};

/**
 * Update blog (Admin only)
 */
export const updateBlog = async (id, updates) => {
	const { data, error } = await supabase
		.from("blogs")
		.update(updates)
		.eq("id", id)
		.select()
		.single();

	if (error) throw error;
	return data;
};

/**
 * Soft delete blog (Admin only)
 */
export const deleteBlog = async (id) => {
	const { data, error } = await supabase
		.from("blogs")
		.update({ deleted_at: new Date().toISOString() })
		.eq("id", id)
		.select()
		.single();

	if (error) throw error;
	return data;
};

/**
 * Upload blog image
 */
export const uploadBlogImage = async (file, blogId) => {
	const fileExt = file.name.split(".").pop();
	const fileName = `${blogId}-${Date.now()}.${fileExt}`;
	const filePath = `blogs/${fileName}`;

	const { data, error } = await supabase.storage.from("blogs").upload(filePath, file);

	if (error) throw error;

	// Get public URL
	const {
		data: { publicUrl },
	} = supabase.storage.from("blogs").getPublicUrl(filePath);

	return publicUrl;
};

/**
 * Get recent blogs
 */
export const getRecentBlogs = async (limit = 5) => {
	return getPublishedBlogs(limit);
};

/**
 * Get related blogs (same tags or category)
 */
export const getRelatedBlogs = async (blogId, limit = 3) => {
	const { data, error } = await supabase
		.from("blogs")
		.select(
			`
      *,
      author:users(id, username, full_name, image)
    `,
		)
		.eq("status", "published")
		.neq("id", blogId)
		.is("deleted_at", null)
		.limit(limit)
		.order("created_at", { ascending: false });

	if (error) throw error;
	return data;
};

/**
 * Increment blog view count
 */
export const incrementBlogViews = async (blogId) => {
	// Get current views
	const { data: blog } = await supabase.from("blogs").select("views").eq("id", blogId).single();

	if (!blog) return;

	// Increment
	const { data, error } = await supabase
		.from("blogs")
		.update({ views: (blog.views || 0) + 1 })
		.eq("id", blogId)
		.select()
		.single();

	if (error) throw error;
	return data;
};

/**
 * Search blogs
 */
export const searchBlogs = async (searchTerm) => {
	const { data, error } = await supabase
		.from("blogs")
		.select(
			`
      *,
      author:users(id, username, full_name, image)
    `,
		)
		.eq("status", "published")
		.is("deleted_at", null)
		.or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
		.order("created_at", { ascending: false });

	if (error) throw error;
	return data;
};
