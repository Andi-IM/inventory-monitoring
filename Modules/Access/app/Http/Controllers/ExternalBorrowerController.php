<?php

namespace Modules\Access\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Access\Http\Requests\ExternalBorrowerRequest;
use Modules\Access\Models\ExternalBorrower;
use Modules\Access\Models\Group;

class ExternalBorrowerController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('access/external-borrowers', [
            'borrowers' => ExternalBorrower::query()->with('group:id,name')->latest()->get(),
            'groups' => Group::query()->orderBy('name')->get(['id', 'name']),
            'can' => ['manageAccess' => true],
        ]);
    }

    public function store(ExternalBorrowerRequest $request): RedirectResponse
    {
        ExternalBorrower::query()->create($request->validated());

        return back();
    }

    public function update(ExternalBorrowerRequest $request, ExternalBorrower $externalBorrower): RedirectResponse
    {
        $externalBorrower->update($request->validated());

        return back();
    }

    public function destroy(ExternalBorrower $externalBorrower): RedirectResponse
    {
        abort_unless(request()->user()?->can('manage-access'), 403);
        $externalBorrower->delete();

        return back();
    }
}
