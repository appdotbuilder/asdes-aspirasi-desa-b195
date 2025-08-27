<?php

namespace Database\Factories;

use App\Models\Report;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Report>
 */
class ReportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'title' => $this->faker->sentence(6),
            'description' => $this->faker->paragraphs(3, true),
            'category' => $this->faker->randomElement([
                'jalan', 'jembatan', 'drainase', 'listrik', 
                'air_bersih', 'sanitasi', 'fasilitas_umum', 'lainnya'
            ]),
            'priority' => $this->faker->randomElement(['rendah', 'sedang', 'tinggi', 'darurat']),
            'status' => $this->faker->randomElement(['baru', 'ditinjau', 'dalam_proses', 'selesai', 'ditolak']),
            'latitude' => $this->faker->latitude(-6.2, -6.1), // Jakarta area
            'longitude' => $this->faker->longitude(106.7, 106.9),
            'location_name' => $this->faker->streetAddress(),
            'admin_response' => $this->faker->optional()->paragraphs(2, true),
            'responded_at' => $this->faker->optional()->dateTimeBetween('-1 month', 'now'),
        ];
    }

    /**
     * Indicate that the report is new.
     */
    public function baru(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'baru',
            'admin_response' => null,
            'responded_at' => null,
        ]);
    }

    /**
     * Indicate that the report is completed.
     */
    public function selesai(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'selesai',
            'admin_response' => $this->faker->paragraphs(2, true),
            'responded_at' => $this->faker->dateTimeBetween('-1 week', 'now'),
        ]);
    }
}