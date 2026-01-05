<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserAddressSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		DB::table('user_addresses')->insert([
			[
				'user_id' => 3, // customer01
				'recipient_name' => 'Lê Minh Khách',
				'phone' => '0369852147',
				'address_line' => '123 Đường Nguyễn Văn Cừ',
				'ward' => 'Phường An Khánh',
				'district' => 'Quận Ninh Kiều',
				'province' => 'Cần Thơ',
				'created_at' => now(),
				'updated_at' => now(),
			],
			[
				'user_id' => 3, // customer01
				'recipient_name' => 'Lê Minh Khách',
				'phone' => '0369852147',
				'address_line' => '456 Đường Trần Hưng Đạo',
				'ward' => 'Phường Cái Khế',
				'district' => 'Quận Ninh Kiều',
				'province' => 'Cần Thơ',
				'created_at' => now(),
				'updated_at' => now(),
			],
			[
				'user_id' => 4, // customer02
				'recipient_name' => 'Phạm Thu Hương',
				'phone' => '0258147963',
				'address_line' => '789 Đường Lê Lợi',
				'ward' => 'Phường Bến Thành',
				'district' => 'Quận 1',
				'province' => 'TP. Hồ Chí Minh',
				'created_at' => now(),
				'updated_at' => now(),
			],
			[
				'user_id' => 4, // customer02
				'recipient_name' => 'Phạm Thu Hương',
				'phone' => '0258147963',
				'address_line' => '321 Võ Văn Tần',
				'ward' => 'Phường Võ Thị Sáu',
				'district' => 'Quận 3',
				'province' => 'TP. Hồ Chí Minh',
				'created_at' => now(),
				'updated_at' => now(),
			],
		]);
	}
}
