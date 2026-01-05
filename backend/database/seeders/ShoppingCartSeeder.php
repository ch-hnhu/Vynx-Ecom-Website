<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ShoppingCartSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		DB::table('shopping_carts')->insert([
			[
				'user_id' => 3, // customer01
				'session_id' => null,
				'created_at' => now(),
				'updated_at' => now(),
			],
			[
				'user_id' => 4, // customer02
				'session_id' => null,
				'created_at' => now(),
				'updated_at' => now(),
			],
			[
				'user_id' => null, // Guest user
				'session_id' => 'guest_session_abc123xyz',
				'created_at' => now(),
				'updated_at' => now(),
			],
			[
				'user_id' => null, // Guest user
				'session_id' => 'guest_session_def456uvw',
				'created_at' => now(),
				'updated_at' => now(),
			],
		]);
	}
}
