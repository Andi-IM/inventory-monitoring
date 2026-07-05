<?php

use App\Models\User;
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
