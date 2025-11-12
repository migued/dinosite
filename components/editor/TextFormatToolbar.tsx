'use client';

import { useState, useEffect, useRef } from 'react';
import { FaBold, FaItalic, FaUnderline, FaStrikethrough, FaPalette } from 'react-icons/fa';

/**
 * Floating text formatting toolbar that appears when text is selected
 */
export default function TextFormatToolbar() {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) {
        setShow(false);
        return;
      }

      const range = selection.getRangeAt(0);
      const text = selection.toString().trim();

      // Only show toolbar if there's selected text and it's in a contentEditable element
      if (text.length > 0) {
        const rects = range.getBoundingClientRect();
        if (rects.width > 0 && rects.height > 0) {
          // Check if selection is in a contentEditable element
          let node = selection.anchorNode;
          let isContentEditable = false;

          while (node) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as HTMLElement;
              if (element.getAttribute('contenteditable') === 'true') {
                isContentEditable = true;
                break;
              }
            }
            node = node.parentNode;
          }

          if (isContentEditable) {
            setPosition({
              top: rects.top - 50 + window.scrollY,
              left: rects.left + rects.width / 2,
            });
            setShow(true);
          } else {
            setShow(false);
          }
        }
      } else {
        setShow(false);
        setShowColorPicker(false);
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    document.addEventListener('mouseup', handleSelectionChange);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      document.removeEventListener('mouseup', handleSelectionChange);
    };
  }, []);

  const applyFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    // Keep selection after formatting
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.collapse(false);
    }
  };

  const applyColor = (color: string) => {
    applyFormat('foreColor', color);
    setShowColorPicker(false);
  };

  if (!show) return null;

  const colors = [
    '#000000', '#374151', '#6B7280', '#DC2626', '#EA580C',
    '#D97706', '#CA8A04', '#65A30D', '#16A34A', '#059669',
    '#0D9488', '#0891B2', '#0284C7', '#2563EB', '#4F46E5',
    '#7C3AED', '#9333EA', '#C026D3', '#DB2777', '#E11D48'
  ];

  return (
    <div
      ref={toolbarRef}
      className="fixed z-50 bg-gray-900 text-white rounded-lg shadow-2xl p-2 flex items-center gap-1"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: 'translateX(-50%)',
      }}
    >
      <button
        onClick={() => applyFormat('bold')}
        className="p-2 hover:bg-gray-700 rounded transition-colors"
        title="Bold (Ctrl+B)"
      >
        <FaBold />
      </button>

      <button
        onClick={() => applyFormat('italic')}
        className="p-2 hover:bg-gray-700 rounded transition-colors"
        title="Italic (Ctrl+I)"
      >
        <FaItalic />
      </button>

      <button
        onClick={() => applyFormat('underline')}
        className="p-2 hover:bg-gray-700 rounded transition-colors"
        title="Underline (Ctrl+U)"
      >
        <FaUnderline />
      </button>

      <button
        onClick={() => applyFormat('strikeThrough')}
        className="p-2 hover:bg-gray-700 rounded transition-colors"
        title="Strikethrough"
      >
        <FaStrikethrough />
      </button>

      <div className="w-px h-6 bg-gray-600 mx-1" />

      <div className="relative">
        <button
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="p-2 hover:bg-gray-700 rounded transition-colors"
          title="Text Color"
        >
          <FaPalette />
        </button>

        {showColorPicker && (
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-lg shadow-xl grid grid-cols-5 gap-1 w-48">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => applyColor(color)}
                className="w-7 h-7 rounded border-2 border-gray-300 hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        )}
      </div>

      <div className="w-px h-6 bg-gray-600 mx-1" />

      <button
        onClick={() => applyFormat('removeFormat')}
        className="px-3 py-2 hover:bg-gray-700 rounded transition-colors text-xs"
        title="Clear Formatting"
      >
        Clear
      </button>
    </div>
  );
}
