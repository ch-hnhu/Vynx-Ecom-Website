<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoryAttributeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('category_attributes')->insert([
            [
                'category_id' => 2, // Laptop
                'attribute_id' => 3, // RAM
                'used_for_variant' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => 2, // Laptop
                'attribute_id' => 4, // Kích thước màn hình
                'used_for_variant' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => 8, // RAM
                'attribute_id' => 3, // RAM
                'used_for_variant' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
