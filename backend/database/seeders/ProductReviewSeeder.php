<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductReviewSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		DB::table('product_reviews')->insert([
			[
				'product_id' => 1, // iPhone 16 Pro Max
				'user_id' => 3, // customer01
				'order_id' => 1,
				'rating' => 5,
				'content' => 'Sản phẩm tuyệt vời! Camera chụp ảnh rất đẹp, màn hình sắc nét. Đáng từng đồng bỏ ra.',
				'review_reply' => 'Cảm ơn bạn đã đánh giá! Chúc bạn sử dụng sản phẩm vui vẻ.',
				'review_reply_by' => 2, // employee01
				'created_at' => now()->subDays(4),
				'updated_at' => now()->subDays(3),
			],
			[
				'product_id' => 4, // Sony WH-1000XM5
				'user_id' => 3, // customer01
				'order_id' => 3,
				'rating' => 5,
				'content' => 'Tai nghe chống ồn tốt nhất mình từng dùng. Pin trâu, âm thanh trong trẻo. Highly recommend!',
				'review_reply' => null,
				'review_reply_by' => null,
				'created_at' => now()->subDays(1),
				'updated_at' => now()->subDays(1),
			],
			[
				'product_id' => 3, // Dell XPS 15
				'user_id' => 4, // customer02
				'order_id' => 2,
				'rating' => 4,
				'content' => 'Laptop rất mạnh, thiết kế đẹp, màn hình 4K tuyệt vời. Nhưng hơi nóng khi chơi game nặng.',
				'review_reply' => 'Cảm ơn bạn đã phản hồi. Laptop gaming sẽ có xu hướng nóng khi chạy nặng. Khuyến nghị sử dụng đế tản nhiệt.',
				'review_reply_by' => 2, // employee01
				'created_at' => now()->subHours(18),
				'updated_at' => now()->subHours(12),
			],
			[
				'product_id' => 2, // Samsung Galaxy S24 Ultra
				'user_id' => 4, // customer02
				'order_id' => 4,
				'rating' => 5,
				'content' => 'Bút S Pen rất tiện lợi cho công việc. Camera zoom xa cực tốt. Máy mượt mà, không lag.',
				'review_reply' => null,
				'review_reply_by' => null,
				'created_at' => now()->subHours(5),
				'updated_at' => now()->subHours(5),
			],
		]);
	}
}
