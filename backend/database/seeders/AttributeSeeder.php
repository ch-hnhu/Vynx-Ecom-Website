<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AttributeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('attributes')->insert([
            [
                'name' => 'Màu sắc',
                'attribute_type' => 'variant',
                'data_type' => 'string',
                'unit' => null,
                'is_filterable' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Bộ nhớ',
                'attribute_type' => 'variant',
                'data_type' => 'string',
                'unit' => 'GB',
                'is_filterable' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'RAM',
                'attribute_type' => 'specification',
                'data_type' => 'string',
                'unit' => 'GB',
                'is_filterable' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Kích thước màn hình',
                'attribute_type' => 'specification',
                'data_type' => 'decimal',
                'unit' => 'inch',
                'is_filterable' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
