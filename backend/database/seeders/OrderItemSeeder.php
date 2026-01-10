<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('order_items')->insert([
            // Order 1 - customer01
            [
                'order_id' => 1,
                'product_id' => 1, // MSI Gaming GF63 Thin
                'quantity' => 1,
                'price' => 19990000,
            ],
            // Order 2 - customer02
            [
                'order_id' => 2,
                'product_id' => 3, // Dell XPS 15
                'quantity' => 1,
                'price' => 45990000,
            ],
            [
                'order_id' => 2,
                'product_id' => 5, // Corsair Vengeance LPX RAM
                'quantity' => 2,
                'price' => 2490000,
            ],
            // Order 3 - customer01
            [
                'order_id' => 3,
                'product_id' => 4, // Sony WH-1000XM5
                'quantity' => 2,
                'price' => 8990000,
            ],
            // Order 4 - customer02
            [
                'order_id' => 4,
                'product_id' => 2, // Acer Aspire 5
                'quantity' => 1,
                'price' => 15990000,
            ],
        ]);
    }
}
