<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $input['name'] = 'admin';
        $input['email'] = 'admin@gmail.com';
        $input['role'] = 'admin';
        $input['password'] = \Illuminate\Support\Facades\Hash::make('admin1234');
        $user = User::create($input);
    }
}
