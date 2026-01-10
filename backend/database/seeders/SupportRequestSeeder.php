<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SupportRequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('support_requests')->insert([
            [
                'full_name' => 'Lê Minh Khách',
                'email' => 'customer01@gmail.com',
                'phone' => '0369852147',
                'content' => 'Tôi muốn hỏi về chính sách bảo hành của sản phẩm laptop Acer Aspire 5. Thời gian bảo hành là bao lâu và có những điều kiện gì?',
                'status' => 'resolved',
                'supported_by' => 2, // employee01
                'created_at' => now()->subDays(5),
                'updated_at' => now()->subDays(4),
            ],
            [
                'full_name' => 'Phạm Thu Hương',
                'email' => 'customer02@gmail.com',
                'phone' => '0258147963',
                'content' => 'Sản phẩm laptop Dell XPS 15 có còn hàng không? Tôi muốn đặt mua với cấu hình RAM 32GB.',
                'status' => 'processing',
                'supported_by' => 2, // employee01
                'created_at' => now()->subDays(2),
                'updated_at' => now()->subDays(1),
            ],
            [
                'full_name' => 'Ngô Văn Tâm',
                'email' => 'ngotam@gmail.com',
                'phone' => '0147258369',
                'content' => 'Tôi đã đặt đơn hàng từ 3 ngày trước nhưng chưa nhận được thông báo giao hàng. Vui lòng kiểm tra giúp tôi.',
                'status' => 'pending',
                'supported_by' => null,
                'created_at' => now()->subHours(12),
                'updated_at' => now()->subHours(12),
            ],
            [
                'full_name' => 'Đỗ Thị Mai',
                'email' => 'domai@gmail.com',
                'phone' => '0963258741',
                'content' => 'Làm thế nào để tôi có thể đổi trả sản phẩm tai nghe Sony nếu không vừa ý? Có mất phí không?',
                'status' => 'pending',
                'supported_by' => null,
                'created_at' => now()->subHours(6),
                'updated_at' => now()->subHours(6),
            ],
        ]);
    }
}
