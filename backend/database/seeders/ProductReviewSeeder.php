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
                'product_id' => 1, // MSI Gaming GF63 Thin
                'user_id' => 3, // customer01
                'order_id' => 1,
                'rating' => 5,
                'content' => 'Laptop gaming tuyệt vời! Card GTX 1650 chơi game mượt, màn hình 120Hz rất đẹp. Giá tốt cho sinh viên.',
                'review_reply' => 'Cảm ơn bạn đã đánh giá! Chúc bạn chơi game vui vẻ.',
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
                'content' => 'Laptop cao cấp, thiết kế đẹp, màn hình 4K OLED tuyệt vời cho làm việc đồ họa. Pin hơi yếu.',
                'review_reply' => 'Cảm ơn bạn đã phản hồi. Màn hình 4K OLED sẽ tiêu tốn pin nhiều hơn. Khuyến nghị điều chỉnh độ sáng phù hợp.',
                'review_reply_by' => 2, // employee01
                'created_at' => now()->subHours(18),
                'updated_at' => now()->subHours(12),
            ],
            [
                'product_id' => 2, // Acer Aspire 5
                'user_id' => 4, // customer02
                'order_id' => 4,
                'rating' => 5,
                'content' => 'Laptop văn phòng tốt, giá hợp lý. Làm việc Word, Excel, web mượt mà. Pin khỏe.',
                'review_reply' => null,
                'review_reply_by' => null,
                'created_at' => now()->subHours(5),
                'updated_at' => now()->subHours(5),
            ],
        ]);
    }
}
