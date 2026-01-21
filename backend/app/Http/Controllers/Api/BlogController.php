<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BlogController extends Controller
{
	public function index(Request $request): JsonResponse
	{
		$perPage = (int) $request->input('per_page', 10);
		$search = trim((string) $request->input('search', ''));
		$hasActiveFilter = $request->has('is_active');
		$isActive = $hasActiveFilter ? filter_var($request->input('is_active'), FILTER_VALIDATE_BOOLEAN) : true;

		$query = Blog::query()->orderByDesc('published_at')->orderByDesc('created_at');

		if ($hasActiveFilter || $isActive) {
			$query->where('is_active', $isActive);
		}

		if ($search !== '') {
			$query->where(function ($subQuery) use ($search) {
				$subQuery->where('title', 'like', '%' . $search . '%')
					->orWhere('content', 'like', '%' . $search . '%')
					->orWhere('author_name', 'like', '%' . $search . '%');
			});
		}

		$blogs = $query->paginate($perPage);

		return response()->json([
			'success' => true,
			'message' => 'Lay danh sach bai viet thanh cong',
			'data' => $blogs->items(),
			'pagination' => [
				'total' => $blogs->total(),
				'per_page' => $blogs->perPage(),
				'current_page' => $blogs->currentPage(),
				'last_page' => $blogs->lastPage(),
				'from' => $blogs->firstItem(),
				'to' => $blogs->lastItem(),
			],
			'timestamp' => now(),
		]);
	}

	public function show(Blog $blog): JsonResponse
	{
		return response()->json([
			'success' => true,
			'message' => 'Lay bai viet thanh cong',
			'data' => $blog,
			'timestamp' => now(),
		]);
	}

	public function store(Request $request): JsonResponse
	{
		$validated = $request->validate([
			'author_name' => 'required|string|max:255',
			'published_at' => 'nullable|date',
			'title' => 'required|string|max:255',
			'content' => 'required|string',
			'is_active' => 'nullable|boolean',
		]);

		$blog = Blog::create($validated);

		return response()->json([
			'success' => true,
			'message' => 'Tao bai viet thanh cong',
			'data' => $blog,
			'timestamp' => now(),
		], 201);
	}

	public function update(Request $request, Blog $blog): JsonResponse
	{
		$validated = $request->validate([
			'author_name' => 'sometimes|required|string|max:255',
			'published_at' => 'sometimes|nullable|date',
			'title' => 'sometimes|required|string|max:255',
			'content' => 'sometimes|required|string',
			'is_active' => 'sometimes|nullable|boolean',
		]);

		$blog->fill($validated);
		$blog->save();

		return response()->json([
			'success' => true,
			'message' => 'Cap nhat bai viet thanh cong',
			'data' => $blog,
			'timestamp' => now(),
		]);
	}

	public function destroy(Blog $blog): JsonResponse
	{
		$blog->delete();

		return response()->json([
			'success' => true,
			'message' => 'Xoa bai viet thanh cong',
			'timestamp' => now(),
		]);
	}
}
