<?php

namespace Tests\Feature\Auth;

use App\Providers\RouteServiceProvider;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class RegistrationTest extends TestCase
{
    use DatabaseTransactions;

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');
        $response->assertStatus(200);
    }

    public function test_new_users_can_register(): void
    {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'is_student' => true,
            'university_id' => 1
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(RouteServiceProvider::HOME);
    }

    public function test_registration_with_invalid_data_fails(): void
    {
        $response = $this->post('/register', [
            'name' => null,
            'email' => 'invalid-email',
            'password' => 'password',
            'password_confirmation' => 'wrong-password',
            'is_student' => 'not_boolean_value',
            'university_id' => 'not_integer_value',
        ]);

        $response->assertStatus(302);
        $response->assertSessionHasErrors(['name', 'email', 'password', 'is_student', 'university_id']);
        $this->assertGuest();
    }
}
