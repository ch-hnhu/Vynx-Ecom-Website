<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('brands')->insert([
            [
                'name' => 'Apple',
                'logo_url' => 'https://example.com/logos/apple.png',
                'description' => 'Thương hiệu công nghệ hàng đầu thế giới, chuyên về điện thoại, máy tính và thiết bị điện tử',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Samsung',
                'logo_url' => 'https://example.com/logos/samsung.png',
                'description' => 'Tập đoàn điện tử đa quốc gia của Hàn Quốc, sản xuất điện thoại thông minh và thiết bị gia dụng',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Sony',
                'logo_url' => 'https://example.com/logos/sony.png',
                'description' => 'Tập đoàn công nghệ Nhật Bản nổi tiếng với các sản phẩm điện tử giải trí và âm thanh',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Dell',
                'logo_url' => 'https://example.com/logos/dell.png',
                'description' => 'Công ty máy tính hàng đầu chuyên về laptop, desktop và giải pháp doanh nghiệp',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
