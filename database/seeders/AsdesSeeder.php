<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Comment;
use App\Models\Report;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AsdesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Admin user
        $admin = User::create([
            'name' => 'Admin Desa',
            'email' => 'admin@asdes.com',
            'role' => 'admin',
            'phone' => '081234567890',
            'address' => 'Kantor Desa, Jakarta',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
        ]);

        // Create Warga user
        $warga = User::create([
            'name' => 'Budi Santoso',
            'email' => 'warga@asdes.com',
            'role' => 'warga',
            'phone' => '081987654321',
            'address' => 'Jl. Merdeka No. 123, Jakarta',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
        ]);

        // Create additional warga users
        $additionalWarga = User::factory()
            ->count(10)
            ->warga()
            ->create();

        // Create sample reports
        $allWarga = collect([$warga])->merge($additionalWarga);
        
        $allWarga->each(function ($user) {
            Report::factory()
                ->count(random_int(1, 4))
                ->create(['user_id' => $user->id]);
        });

        // Create sample articles
        Article::factory()
            ->count(8)
            ->published()
            ->create(['user_id' => $admin->id]);

        Article::factory()
            ->count(3)
            ->draft()
            ->create(['user_id' => $admin->id]);

        // Create sample comments
        $publishedArticles = Article::where('status', 'published')->get();
        
        $publishedArticles->each(function ($article) use ($allWarga) {
            $commentCount = random_int(0, 5);
            
            for ($i = 0; $i < $commentCount; $i++) {
                Comment::factory()->create([
                    'article_id' => $article->id,
                    'user_id' => $allWarga->random()->id,
                ]);
            }
        });
    }
}