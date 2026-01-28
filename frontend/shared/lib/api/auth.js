import { supabase } from "../supabase";

/**
 * Sign up new user
 */
export const register = async ({ email, password, username, fullName, phone }) => {
	// 1. Create auth user
	const { data: authData, error: authError } = await supabase.auth.signUp({
		email,
		password,
	});

	if (authError) throw authError;

	// 2. Create user profile in users table
	const { error: profileError } = await supabase.from("users").insert([
		{
			id: authData.user.id,
			username,
			email,
			full_name: fullName,
			phone,
			role: "customer",
			is_active: true,
		},
	]);

	if (profileError) {
		// Rollback: delete auth user if profile creation fails
		await supabase.auth.admin.deleteUser(authData.user.id);
		throw profileError;
	}

	return authData;
};

/**
 * Sign in with email and password
 */
export const login = async (email, password) => {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) throw error;

	// Get user profile
	const profile = await getUserProfile(data.user.id);

	return {
		...data,
		profile,
	};
};

/**
 * Sign out current user
 */
export const logout = async () => {
	const { error } = await supabase.auth.signOut();
	if (error) throw error;
};

/**
 * Get current authenticated user
 */
export const getCurrentUser = async () => {
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) return null;

	const profile = await getUserProfile(user.id);

	return {
		...user,
		profile,
	};
};

/**
 * Get user profile from users table
 */
export const getUserProfile = async (userId) => {
	const { data, error } = await supabase.from("users").select("*").eq("id", userId).single();

	if (error) throw error;
	return data;
};

/**
 * Update user profile
 */
export const updateProfile = async (userId, updates) => {
	const { data, error } = await supabase
		.from("users")
		.update(updates)
		.eq("id", userId)
		.select()
		.single();

	if (error) throw error;
	return data;
};

/**
 * Change password
 */
export const changePassword = async (newPassword) => {
	const { data, error } = await supabase.auth.updateUser({
		password: newPassword,
	});

	if (error) throw error;
	return data;
};

/**
 * Reset password - send reset email
 */
export const sendPasswordResetEmail = async (email) => {
	const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${window.location.origin}/reset-password`,
	});

	if (error) throw error;
	return data;
};

/**
 * Upload user avatar
 */
export const uploadAvatar = async (userId, file) => {
	const fileExt = file.name.split(".").pop();
	const fileName = `${userId}.${fileExt}`;
	const filePath = `avatars/${fileName}`;

	const { data, error } = await supabase.storage
		.from("avatars")
		.upload(filePath, file, { upsert: true });

	if (error) throw error;

	// Get public URL
	const {
		data: { publicUrl },
	} = supabase.storage.from("avatars").getPublicUrl(filePath);

	// Update user profile with new avatar URL
	await updateProfile(userId, { image: publicUrl });

	return publicUrl;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = async () => {
	const {
		data: { session },
	} = await supabase.auth.getSession();
	return !!session;
};

/**
 * Get user session
 */
export const getSession = async () => {
	const {
		data: { session },
	} = await supabase.auth.getSession();
	return session;
};

/**
 * Listen to auth state changes
 */
export const onAuthStateChange = (callback) => {
	return supabase.auth.onAuthStateChange(callback);
};
