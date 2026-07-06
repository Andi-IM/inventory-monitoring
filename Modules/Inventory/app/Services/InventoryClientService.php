<?php

namespace Modules\Inventory\Services;

use Illuminate\Support\Collection;
use Modules\Inventory\Contracts\InventoryClientInterface;
use Modules\Inventory\DTOs\CategoryDTO;
use Modules\Inventory\DTOs\ItemDTO;
use Modules\Inventory\DTOs\ItemUnitDTO;
use Modules\Inventory\Models\Category;
use Modules\Inventory\Models\Item;
use Modules\Inventory\Models\ItemUnit;

class InventoryClientService implements InventoryClientInterface
{
    public function getItemUnitById(int $id): ?ItemUnitDTO
    {
        $itemUnit = ItemUnit::with('item.category')->find($id);

        if (! $itemUnit) {
            return null;
        }

        return $this->mapToItemUnitDTO($itemUnit);
    }

    public function getItemUnitsByIds(array $ids): Collection
    {
        return ItemUnit::with('item.category')
            ->whereIn('id', $ids)
            ->get()
            ->map(fn (ItemUnit $unit) => $this->mapToItemUnitDTO($unit))
            ->keyBy('id');
    }

    public function getAvailableItemUnits(): Collection
    {
        return ItemUnit::with('item.category')
            ->where('status', ItemUnit::StatusAvailable)
            ->orderBy('asset_code')
            ->get()
            ->map(fn (ItemUnit $unit) => $this->mapToItemUnitDTO($unit))
            ->values();
    }

    public function getAvailableItemUnitsByIds(array $ids): Collection
    {
        return ItemUnit::with('item.category')
            ->whereIn('id', $ids)
            ->where('status', ItemUnit::StatusAvailable)
            ->lockForUpdate() // Needed for transaction locking
            ->get()
            ->map(fn (ItemUnit $unit) => $this->mapToItemUnitDTO($unit))
            ->keyBy('id');
    }

    public function updateItemUnitStatus(int $id, string $status): bool
    {
        return (bool) ItemUnit::where('id', $id)->update(['status' => $status]);
    }

    public function getTotalItemUnitsCount(): int
    {
        return ItemUnit::count();
    }

    public function getItemUnitsCountByStatus(string $status): int
    {
        return ItemUnit::where('status', $status)->count();
    }

    private function mapToCategoryDTO(Category $category): CategoryDTO
    {
        return new CategoryDTO(
            id: $category->id,
            name: $category->name,
            code: $category->code
        );
    }

    private function mapToItemDTO(Item $item): ItemDTO
    {
        $categoryDto = $item->category ? $this->mapToCategoryDTO($item->category) : null;

        return new ItemDTO(
            id: $item->id,
            category_id: $item->category_id,
            name: $item->name,
            description: $item->description,
            category: $categoryDto
        );
    }

    private function mapToItemUnitDTO(ItemUnit $itemUnit): ItemUnitDTO
    {
        $itemDto = $itemUnit->item ? $this->mapToItemDTO($itemUnit->item) : null;

        return new ItemUnitDTO(
            id: $itemUnit->id,
            item_id: $itemUnit->item_id,
            asset_code: $itemUnit->asset_code,
            location: $itemUnit->location,
            status: $itemUnit->status,
            item: $itemDto
        );
    }
}
