<?php

namespace Modules\Access\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Access\Http\Requests\StoreUserRequest;
use Modules\Access\Http\Requests\UpdateUserRequest;
use Modules\Access\Models\Group;

class UserController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('access/users', [
            'users' => User::query()->with('groups:id,name')->latest()->get(),
            'groups' => Group::query()->orderBy('name')->get(['id', 'name']),
            'roles' => ['Admin', 'Petugas'],
            'can' => ['manageAccess' => true],
        ]);
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $user = User::query()->create([
            ...Arr::only($data, ['name', 'email', 'role']),
            'password' => Hash::make($data['password']),
        ]);

        $user->groups()->sync($data['group_ids'] ?? []);

        return back();
    }

    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $data = $request->validated();
        $payload = Arr::only($data, ['name', 'email', 'role']);

        if (filled($data['password'] ?? null)) {
            $payload['password'] = Hash::make($data['password']);
        }

        $user->update($payload);
        $user->groups()->sync($data['group_ids'] ?? []);

        return back();
    }

    public function destroy(User $user): RedirectResponse
    {
        abort_unless(request()->user()->can('manage-access'), 403);
        abort_if(request()->user()->is($user), 422, 'Tidak dapat menghapus akun yang sedang digunakan.');

        $user->delete();

        return back();
    }
}
