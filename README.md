# FlowBoard 🎯

A modern, feature-rich task management application built with Next.js and TypeScript. FlowBoard provides an intuitive kanban-style interface for organizing tasks with powerful features like priority management, due dates, drag-and-drop, and comprehensive keyboard shortcuts.

> **Academic Project** - Built as a demonstration of modern web development practices using React, TypeScript, and Next.js.

![FlowBoard](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.1-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)

## ✨ Features

### Core Functionality
- **📋 Kanban Board** - Organize tasks across four columns: To Do, Next, In Progress, and Done
- **🎯 Priority Levels** - Set task priorities (Low, Medium, High, Critical) with color-coded badges
- **📅 Due Dates** - Add due dates with visual indicators for overdue and upcoming tasks
- **🏷️ Categories** - Categorize tasks as Work, Personal, Ideas, or Other
- **📝 Rich Task Details** - Add notes, set priorities, assign due dates, and more

### User Experience
- **🎨 Modern UI** - Clean, professional interface with smooth animations
- **🖱️ Drag & Drop** - Intuitive drag-and-drop to move tasks between columns
- **🔍 Smart Filtering** - Filter by search query, category, and status
- **📊 Sorting Options** - Sort by date created, priority, due date, or title
- **📈 Progress Tracking** - Visual charts showing task completion statistics
- **💾 Local Storage** - Automatic data persistence in browser
- **📱 Responsive Design** - Optimized for desktop, tablet, and mobile devices

### Advanced Features
- **⌨️ Keyboard Shortcuts** - Full keyboard navigation support
  - `Cmd/Ctrl + K` - Focus search
  - `Cmd/Ctrl + N` - Quick add task
  - `?` - View all shortcuts
  - `Esc` - Close modals
- **📦 Data Management** - Export and import tasks as JSON
- **🗄️ Archive System** - Archive completed tasks for a cleaner workspace
- **♿ Accessibility** - ARIA labels, keyboard navigation, and focus management

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or higher
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Sahil24680/flowboard.git
cd flowboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🏗️ Building for Production

To create an optimized production build:

```bash
npm run build
npm run start
```

The application will be optimized and ready for deployment.

## 🛠️ Tech Stack

This project demonstrates proficiency in modern web development technologies:

- **Framework**: [Next.js 15](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [Headless UI](https://headlessui.com/) - Unstyled, accessible components
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful icon library
- **State Management**: React Hooks (useState, useCallback, useMemo, useEffect)
- **Data Persistence**: Browser localStorage with custom hooks
- **Fonts**: [Geist](https://vercel.com/font) - Vercel's font family

### Key Technical Concepts

- **React Server Components** and Client Components
- **Custom React Hooks** for reusable logic
- **TypeScript Generics** and type safety
- **Responsive Design** with Tailwind CSS
- **Accessibility** (ARIA labels, keyboard navigation)
- **Performance Optimization** (memoization, debouncing)
- **Drag and Drop API** implementation
- **Local Storage** data persistence

## 📂 Project Structure

```
flowboard/
├── app/
│   ├── components/
│   │   ├── flowboard/
│   │   │   ├── Badge.tsx              # Reusable badge component
│   │   │   ├── Board.tsx              # Main kanban board layout
│   │   │   ├── Column.tsx             # Individual board columns
│   │   │   ├── EmptyState.tsx         # Empty state UI component
│   │   │   ├── FiltersBar.tsx         # Search and filter controls
│   │   │   ├── Header.tsx             # Application header with actions
│   │   │   ├── IconButton.tsx         # Reusable icon button
│   │   │   ├── KeyboardShortcutsModal.tsx # Shortcuts help modal
│   │   │   ├── Modal.tsx              # Base modal component
│   │   │   ├── ProgressChart.tsx      # Task progress visualization
│   │   │   ├── QuickAddForm.tsx       # Quick task creation form
│   │   │   ├── RightSidebar.tsx       # Statistics sidebar
│   │   │   ├── TaskCard.tsx           # Individual task card
│   │   │   ├── TaskModal.tsx          # Task details and editing modal
│   │   │   ├── constants.ts           # Application constants
│   │   │   ├── hooks.ts               # Custom React hooks
│   │   │   ├── types.ts               # TypeScript type definitions
│   │   │   └── utils.ts               # Utility functions
│   │   └── Loading.tsx                # Loading screen component
│   ├── globals.css                    # Global styles and Tailwind
│   ├── layout.tsx                     # Root layout with metadata
│   └── page.tsx                       # Main application page
├── public/
│   └── icon.svg                       # Application icon
├── next.config.ts                     # Next.js configuration
├── tailwind.config.js                 # Tailwind CSS configuration
├── tsconfig.json                      # TypeScript configuration
└── package.json                       # Project dependencies
```

## 🎓 Learning Outcomes

This project demonstrates understanding of:

1. **Modern React Patterns**
   - Functional components with hooks
   - Custom hooks for reusable logic
   - State management and data flow
   - Component composition

2. **TypeScript Best Practices**
   - Strong typing for props and state
   - Type inference and generics
   - Interface definitions
   - Type safety throughout the application

3. **Next.js Features**
   - App Router architecture
   - Server and client components
   - Metadata and SEO optimization
   - Static site generation

4. **UI/UX Design**
   - Responsive design principles
   - Accessibility standards
   - User interaction patterns
   - Visual feedback and animations

5. **Code Organization**
   - Component architecture
   - Separation of concerns
   - Reusable utilities
   - Maintainable code structure

## 🎯 Usage

### Creating Tasks
1. Use the quick add form at the top to create new tasks
2. Enter a title (required)
3. Optionally add notes, select category, priority, and due date
4. Press Enter or click "Add" to create the task

### Managing Tasks
- **View Details**: Click on any task card to open the full details
- **Edit**: Click "Edit" in the task modal to modify task properties
- **Move Tasks**: Drag and drop cards between columns or use the status dropdown
- **Delete**: Open a task and click "Delete" to remove it permanently
- **Archive**: Archive completed tasks to keep your board clean
- **Filter**: Use the search bar and filter dropdowns to find specific tasks
- **Sort**: Choose how to sort tasks (by date, priority, due date, or title)

### Keyboard Shortcuts

Press `?` anywhere in the app to view all keyboard shortcuts:

- `Cmd/Ctrl + K` - Focus search bar
- `Cmd/Ctrl + N` - Focus quick add form
- `Esc` - Close any open modal
- `Enter` or `Space` - Open task details (when card is focused)
- `Tab` - Navigate between form fields

### Data Management

**Export Tasks**
- Click the Export button in the header to download all tasks as JSON
- File will be saved with the current date

**Import Tasks**
- Click the Import button and select a previously exported JSON file
- This will replace all current tasks (confirmation required)

**View Archive**
- Click the Archive button to toggle between active and archived tasks
- Archived tasks are hidden from the main board but can be restored

## 🎨 Customization

### Modifying Categories

Edit `app/components/flowboard/constants.ts` to add or change categories:

```typescript
export const CATEGORIES: Category[] = ['Work', 'Personal', 'Ideas', 'Other', 'YourCategory']
```

Don't forget to update the type definition in `types.ts`:

```typescript
export type Category = 'Work' | 'Personal' | 'Ideas' | 'Other' | 'YourCategory'
```

### Changing Task Statuses

Modify task workflow stages in `constants.ts`:

```typescript
export const STATUSES: { key: TaskStatus; label: string }[] = [
  { key: 'todo', label: 'To Do' },
  { key: 'next', label: 'Next' },
  { key: 'inprogress', label: 'In Progress' },
  { key: 'done', label: 'Done' }
]
```

### Customizing Priority Levels

Adjust priority levels and colors in `constants.ts`:

```typescript
export const PRIORITIES: { key: Priority; label: string; color: string }[] = [
  { key: 'low', label: 'Low', color: 'bg-slate-500 text-slate-100' },
  { key: 'medium', label: 'Medium', color: 'bg-blue-500 text-white' },
  { key: 'high', label: 'High', color: 'bg-orange-500 text-white' },
  { key: 'critical', label: 'Critical', color: 'bg-red-500 text-white' }
]
```

### Styling

The application uses Tailwind CSS. Modify colors and styles in:
- `app/globals.css` - Global styles
- Component files - Component-specific styles
- Tailwind classes throughout the application

## 🐛 Known Limitations

- Data is stored in browser localStorage (cleared when browser data is cleared)
- No multi-user support or cloud sync
- No task collaboration features
- Drag-and-drop works on desktop browsers only (not mobile)

## 🔮 Future Enhancements

Potential features for future iterations:

- [ ] Backend integration with database
- [ ] User authentication and multi-user support
- [ ] Task comments and activity history
- [ ] File attachments
- [ ] Due date reminders/notifications
- [ ] Tags system in addition to categories
- [ ] Dark/light theme toggle
- [ ] Mobile app version
- [ ] Calendar view
- [ ] Task dependencies
- [ ] Team collaboration features
- [ ] Analytics and reporting

## 🤝 Contributing

This is an academic project, but suggestions and feedback are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Design inspiration from [Linear](https://linear.app)
- Built with [Next.js](https://nextjs.org) and [React](https://react.dev)
- Icons by [Lucide](https://lucide.dev)
- UI components from [Headless UI](https://headlessui.com)
- Styling with [Tailwind CSS](https://tailwindcss.com)

## 📧 Contact

**Project Repository**: [https://github.com/Sahil24680/flowboard](https://github.com/Sahil24680/flowboard)

---

**Built with ❤️ as a school project demonstrating modern web development with Next.js, React, and TypeScript**

