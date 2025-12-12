'use client'

import React from 'react'
import { X, Command, Keyboard } from 'lucide-react'
import Modal from './Modal'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function KeyboardShortcutsModal({ isOpen, onClose }: Props) {
  const shortcuts = [
    { keys: ['⌘/Ctrl', 'K'], description: 'Focus search' },
    { keys: ['⌘/Ctrl', 'N'], description: 'Focus quick add' },
    { keys: ['Esc'], description: 'Close modal' },
    { keys: ['Enter'], description: 'Open task details (when focused)' },
    { keys: ['Space'], description: 'Open task details (when focused)' },
    { keys: ['Tab'], description: 'Navigate between fields' },
  ]

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" panelClassName="!bg-slate-900">
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-700 pb-4">
          <div className="flex items-center gap-3">
            <Keyboard className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Keyboard Shortcuts</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-800 rounded-md transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-800/50 transition-colors"
            >
              <span className="text-slate-300">{shortcut.description}</span>
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key, i) => (
                  <React.Fragment key={i}>
                    <kbd className="px-2 py-1 text-xs font-semibold text-slate-200 bg-slate-700 border border-slate-600 rounded shadow-sm">
                      {key}
                    </kbd>
                    {i < shortcut.keys.length - 1 && (
                      <span className="text-slate-500 mx-1">+</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-700">
          <p className="text-xs text-slate-400 text-center">
            Press <kbd className="px-1.5 py-0.5 text-xs bg-slate-700 border border-slate-600 rounded">?</kbd> to toggle this help
          </p>
        </div>
      </div>
    </Modal>
  )
}
