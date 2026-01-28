import { supabase } from "../../lib/supabase.js";

/**
 * Service để xử lý slideshows (carousel/banner)
 */

/**
 * Lấy danh sách slideshows đang active
 * @returns {Promise<Array>}
 */
export const getSlideshows = async () => {
	try {
		const { data, error } = await supabase
			.from("slideshows")
			.select("*")
			.eq("is_active", true)
			.order("display_order", { ascending: true });

		if (error) throw error;

		return data || [];
	} catch (error) {
		console.error("Error fetching slideshows:", error);
		throw error;
	}
};
