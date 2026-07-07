<?php

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Modules\Access\Models\Group;

test('user can login and logout', function (): void {
    $user = User::factory()->create([
        'email' => 'petugas@example.com',
        'password' => 'password',
    ]);

    $this->post(route('login.store'), [
        'email' => 'petugas@example.com',
        'password' => 'password',
    ])->assertRedirect(route('dashboard', absolute: false));

    $this->assertAuthenticatedAs($user);

    $this->post(route('logout'))->assertRedirect(route('login', absolute: false));
    $this->assertGuest();
});

test('user can login with remember me', function (): void {
    $user = User::factory()->create([
        'email' => 'remember@example.com',
        'password' => 'password',
    ]);

    $response = $this->post(route('login.store'), [
        'email' => 'remember@example.com',
        'password' => 'password',
        'remember' => true,
    ]);

    $response->assertRedirect(route('dashboard', absolute: false));

    $this->assertAuthenticatedAs($user);
    $response->assertCookie(Auth::guard()->getRecallerName());
});

test('only admin can manage access data', function (): void {
    $petugas = User::factory()->petugas()->create();
    $admin = User::factory()->admin()->create();

    $this->actingAs($petugas)
        ->postJson(route('access.groups.store'), ['name' => 'Lab Kimia'])
        ->assertForbidden();

    $this->actingAs($admin)
        ->post(route('access.groups.store'), ['name' => 'Lab Kimia', 'type' => 'lab'])
        ->assertRedirect();

    expect(Group::query()->where('name', 'Lab Kimia')->exists())->toBeTrue();
});
