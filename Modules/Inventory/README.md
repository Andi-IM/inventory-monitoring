# Inventory Module

This module manages the system's categories, items, and unit specifications.

---

## 📂 Module Structure

- **Controllers** (`app/Http/Controllers/`):
  - `CategoryController.php`: Handles inventory category CRUD operations.
  - `ItemController.php`: Manages inventory items (stock, descriptions, etc.).
  - `ItemUnitController.php`: Manages item units (e.g., Pcs, Box, Kg).
- **Models** (`app/Models/`):
  - `Category.php`: Represents item categories.
  - `Item.php`: Represents an inventory item.
  - `ItemUnit.php`: Represents item unit specifications.
- **Requests** (`app/Http/Requests/`):
  - `CategoryRequest.php`, `ItemRequest.php`, `ItemUnitRequest.php`.
- **Database** (`database/`):
  - Migration: `2026_07_05_121310_create_inventory_tables.php` (sets up categories, item units, and items tables).
- **Frontend Pages** (`resources/js/pages/inventory/`):
  - `categories.tsx`: Category management interface.
  - `units.tsx`: Unit specifications interface.
  - `items.tsx`: Inventory item directory.
