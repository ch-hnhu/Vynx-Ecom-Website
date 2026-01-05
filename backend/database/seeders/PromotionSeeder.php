<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PromotionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('promotions')->insert([
            [
                'code' => 'NEWYEAR2026',
                'name' => 'Khuyến mãi Tết Nguyên Đán 2026',
                'description' => 'Giảm giá 15% cho tất cả sản phẩm nhân dịp năm mới',
                'discount_type' => 'percent',
                'discount_value' => 15,
                'start_date' => '2026-01-01 00:00:00',
                'end_date' => '2026-01-31 23:59:59',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'FLASH100K',
                'name' => 'Flash Sale giảm 100K',
                'description' => 'Giảm ngay 100.000đ cho đơn hàng từ 2 triệu',
                'discount_type' => 'fixed',
                'discount_value' => 100000,
                'start_date' => '2026-01-10 00:00:00',
                'end_date' => '2026-01-15 23:59:59',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'SUMMER20',
                'name' => 'Khuyến mãi mùa hè',
                'description' => 'Giảm 20% các sản phẩm điện tử',
                'discount_type' => 'percent',
                'discount_value' => 20,
                'start_date' => '2026-06-01 00:00:00',
                'end_date' => '2026-08-31 23:59:59',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'FREESHIP',
                'name' => 'Miễn phí vận chuyển',
                'description' => 'Giảm 50.000đ phí vận chuyển cho đơn hàng trên 500K',
                'discount_type' => 'fixed',
                'discount_value' => 50000,
                'start_date' => '2026-01-01 00:00:00',
                'end_date' => '2026-12-31 23:59:59',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
