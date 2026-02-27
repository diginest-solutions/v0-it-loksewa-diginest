# Keyboard Shortcuts Guide

## Available Keyboard Shortcuts

The IT Loksewa Smart Prep platform includes quick keyboard navigation to help you move between key sections faster.

### Global Shortcuts

| Key | Action | Destination |
|-----|--------|-------------|
| **Q** | Jump to Question Bank | `/dashboard/question-bank` |
| **M** | Jump to Mock Tests | `/dashboard/mock-tests` |
| **D** | Jump to Dashboard Home | `/dashboard` |

## How It Works

1. **Press any of the shortcuts** while browsing the dashboard
2. **Toast notifications** will confirm your navigation
3. **Works seamlessly** - no need to hold modifier keys
4. **Smart detection** - shortcuts don't trigger in input fields or textareas

## Implementation Details

The keyboard shortcuts are implemented using the `use-keyboard-shortcuts` hook which:

- Listens for key presses globally
- Ignores shortcuts when focus is in an input field
- Uses `next/navigation` router for smooth transitions
- Shows confirmation toasts via Sonner
- Prevents default browser behavior for shortcuts

## Using the Hook

To add keyboard shortcuts to any page or component:

```typescript
'use client'
import { useKeyboardShortcuts } from '@/hooks/use-keyboard-shortcuts'

export default function YourComponent() {
  useKeyboardShortcuts()
  
  return (
    // Your component content
  )
}
```

The hook is already integrated into the main dashboard layout, so shortcuts work everywhere in the dashboard.

## Tips for Users

- **Memorize the shortcuts**: Q→Questions, M→Mock Tests, D→Dashboard
- **Quick navigation**: Switch between sections instantly
- **No slow loading**: Transitions are smooth and instant
- **Works offline**: Shortcuts work even without network

## Customization

To add new shortcuts, modify `/hooks/use-keyboard-shortcuts.ts`:

```typescript
case 'your-key-here':
  event.preventDefault()
  router.push('/your/route')
  toast.success('Message', { description: 'Details' })
  break
```

---

**Tip**: The shortcut hint is displayed in the sidebar footer for easy reference!
