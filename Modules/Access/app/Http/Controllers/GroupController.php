<?php

namespace Modules\Access\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Access\Http\Requests\GroupRequest;
use Modules\Access\Models\Group;

class GroupController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('access/groups', [
            'groups' => Group::query()->withCount(['users', 'externalBorrowers'])->latest()->get(),
            'types' => ['kelas', 'lab', 'departemen', 'lainnya'],
            'can' => ['manageAccess' => true],
        ]);
    }

    public function store(GroupRequest $request): RedirectResponse
    {
        Group::query()->create($request->validated());

        return back();
    }

    public function update(GroupRequest $request, Group $group): RedirectResponse
    {
        $group->update($request->validated());

        return back();
    }

    public function destroy(Group $group): RedirectResponse
    {
        abort_unless(request()->user()?->can('manage-access'), 403);
        $group->delete();

        return back();
    }
}
