<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            [
                'name' => 'Linh kiện máy tính',
                'slug' => 'linh-kien-may-tinh',
                'description' => 'Các sản phẩm linh kiện máy tính từ nhiều thương hiệu khác nhau',
                'parent_id' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Laptop',
                'slug' => 'laptop',
                'description' => 'Máy tính xách tay cho công việc và giải trí',
                'parent_id' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Phụ kiện',
                'slug' => 'phu-kien',
                'description' => 'Các phụ kiện máy tính như chuột, bàn phím, lót chuột',
                'parent_id' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Tai nghe',
                'slug' => 'tai-nghe',
                'description' => 'Tai nghe có dây và không dây chất lượng cao',
                'parent_id' => 3, // Thuộc danh mục Phụ kiện
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Chuột',
                'slug' => 'chuot',
                'description' => 'Chuột máy tính có dây và không dây chất lượng cao',
                'parent_id' => 3, // Thuộc danh mục Phụ kiện
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Bàn phím',
                'slug' => 'ban-phim',
                'description' => 'Bàn phím máy tính có dây và không dây chất lượng cao',
                'parent_id' => 3, // Thuộc danh mục Phụ kiện
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Lót chuột',
                'slug' => 'lot-chuot',
                'description' => 'Lót chuột chất lượng cao, đa dạng mẫu mã',
                'parent_id' => 3, // Thuộc danh mục Phụ kiện
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Ram',
                'slug' => 'ram',
                'description' => 'Ram máy tính chất lượng cao',
                'parent_id' => 1, // Thuộc danh mục Linh kiện máy tính
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Ổ cứng SSD',
                'slug' => 'o-cung-ssd',
                'description' => 'Ổ cứng SSD chất lượng cao',
                'parent_id' => 1, // Thuộc danh mục Linh kiện máy tính
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Card màn hình VGA',
                'slug' => 'card-man-hinh-vga',
                'description' => 'Card màn hình chất lượng cao',
                'parent_id' => 1, // Thuộc danh mục Linh kiện máy tính
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
