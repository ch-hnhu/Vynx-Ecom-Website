export const getBlogImage = (imageUrl) => {
	if (!imageUrl) return "https://placehold.co/600x360";

	if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
		return imageUrl;
	}

	const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
	const normalized = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;
	return `${baseUrl}${normalized}`;
};
