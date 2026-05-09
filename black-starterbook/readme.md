# 📖 Black Starter Book

A premium, interactive starter guide script for **FiveM (QB-Core)**. Provide your new players with a beautiful, themed book to guide them through your server's features.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Framework](https://img.shields.io/badge/framework-QB--Core-orange.svg)
![Inventory](https://img.shields.io/badge/inventory-OX%20/%20QB-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## ✨ Features

- 🎨 **Multiple Themes**: Switch between `vintage`, `dark`, `light`, and `royal` styles.
- ✍️ **In-Game Editor**: Admin-only `/booksetup` command to edit content directly in-game.
- 💾 **Instant Save**: Changes are saved to `data/content.json` immediately.
- 📦 **Dual Inventory Support**: Compatible with both **QB-Inventory** and **OX-Inventory**.
- 🆕 **New Player Gift**: Automatically gives the book to first-time joiners.
- 📖 **Interactive UI**: Smooth animations and realistic book layout.

## 🚀 Installation

### 1. Item Configuration

#### QB-Core (`shared/items.lua`)
Add this to your items list:
```lua
['starter_book'] = {
    ['name'] = 'starter_book', 
    ['label'] = 'Starter Book', 
    ['weight'] = 500, 
    ['type'] = 'item', 
    ['image'] = 'starter_book.png', 
    ['unique'] = true, 
    ['useable'] = true, 
    ['shouldClose'] = true, 
    ['description'] = 'A guide for new players.'
},
```

#### OX Inventory (`data/items.lua`)
Add this to your items list:
```lua
['starter_book'] = {
    label = 'Starter Book',
    weight = 500,
    stack = false,
    close = true,
    description = 'A guide for new players.'
},
```

### 2. Images
Ensure you have a `starter_book.png` in your inventory's HTML images folder.

## 🛠️ Configuration

Edit `config.lua` to customize the experience:
- `Config.DefaultTheme`: Default look of the book.
- `Config.AdminPermission`: Permission required for editing.
- `Config.GiveToNewPlayer`: Enable/disable auto-gift.

## 🎮 Commands

- `/booksetup`: Opens the book in **Edit Mode** (Requires configured permissions).

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Developed with ❤️ by **BLACK DEVELOPMENT**
