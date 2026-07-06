<?php

namespace Modules\Access\Services;

use Illuminate\Support\Collection;
use Modules\Access\Contracts\AccessClientInterface;
use Modules\Access\DTOs\ExternalBorrowerDTO;
use Modules\Access\DTOs\GroupDTO;
use Modules\Access\Models\ExternalBorrower;
use Modules\Access\Models\Group;

class AccessClientService implements AccessClientInterface
{
    public function getGroupById(int $id): ?GroupDTO
    {
        $group = Group::find($id);

        if (! $group) {
            return null;
        }

        return $this->mapToGroupDTO($group);
    }

    public function getGroupsByIds(array $ids): Collection
    {
        return Group::whereIn('id', $ids)
            ->get()
            ->map(fn (Group $group) => $this->mapToGroupDTO($group))
            ->keyBy('id');
    }

    public function getExternalBorrowerById(int $id): ?ExternalBorrowerDTO
    {
        $borrower = ExternalBorrower::with('group')->find($id);

        if (! $borrower) {
            return null;
        }

        return $this->mapToExternalBorrowerDTO($borrower);
    }

    public function getExternalBorrowersByIds(array $ids): Collection
    {
        return ExternalBorrower::with('group')
            ->whereIn('id', $ids)
            ->get()
            ->map(fn (ExternalBorrower $borrower) => $this->mapToExternalBorrowerDTO($borrower))
            ->keyBy('id');
    }

    public function getAllExternalBorrowers(): Collection
    {
        return ExternalBorrower::with('group')
            ->orderBy('name')
            ->get()
            ->map(fn (ExternalBorrower $borrower) => $this->mapToExternalBorrowerDTO($borrower))
            ->values();
    }

    private function mapToGroupDTO(Group $group): GroupDTO
    {
        return new GroupDTO(
            id: $group->id,
            name: $group->name,
            type: $group->type,
            description: $group->description,
        );
    }

    private function mapToExternalBorrowerDTO(ExternalBorrower $borrower): ExternalBorrowerDTO
    {
        $groupDto = $borrower->group ? $this->mapToGroupDTO($borrower->group) : null;

        return new ExternalBorrowerDTO(
            id: $borrower->id,
            group_id: $borrower->group_id,
            name: $borrower->name,
            identity_number: $borrower->identity_number,
            contact: $borrower->contact,
            group: $groupDto,
        );
    }
}
