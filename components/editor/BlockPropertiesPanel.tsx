'use client';

import { Block, BlockStyle } from '@/types/blocks';
import { FaTimes, FaPaintBrush, FaImage, FaTextHeight, FaRulerVertical } from 'react-icons/fa';

interface BlockPropertiesPanelProps {
  block: Block;
  onUpdate: (blockId: string, style: BlockStyle) => void;
  onClose: () => void;
}

export default function BlockPropertiesPanel({
  block,
  onUpdate,
  onClose,
}: BlockPropertiesPanelProps) {
  const style = block.style || {};

  const handleStyleChange = (key: keyof BlockStyle, value: any) => {
    const newStyle = { ...style, [key]: value };
    onUpdate(block.id, newStyle);
  };

  const presetColors = [
    '#FFFFFF', '#F3F4F6', '#E5E7EB', '#D1D5DB',
    '#000000', '#1F2937', '#374151', '#4B5563',
    '#EF4444', '#F59E0B', '#10B981', '#3B82F6',
    '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
  ];

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b">
        <h3 className="font-semibold text-lg">Propiedades del Bloque</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FaTimes />
        </button>
      </div>

      {/* Block Info */}
      <div className="mb-4 pb-3 border-b">
        <p className="text-sm text-gray-500">Tipo: <span className="font-medium text-gray-700">{block.type}</span></p>
      </div>

      {/* Background Color */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <FaPaintBrush className="text-gray-600" />
          <label className="font-medium text-sm">Color de Fondo</label>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-2">
          {presetColors.map((color) => (
            <button
              key={color}
              onClick={() => handleStyleChange('backgroundColor', color)}
              className={`w-12 h-12 rounded border-2 hover:scale-110 transition-transform ${
                style.backgroundColor === color ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
        <input
          type="text"
          value={style.backgroundColor || ''}
          onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
          placeholder="#FFFFFF o transparent"
          className="w-full px-3 py-2 border rounded text-sm"
        />
        {style.backgroundColor && (
          <button
            onClick={() => handleStyleChange('backgroundColor', undefined)}
            className="text-xs text-red-500 hover:text-red-700 mt-1"
          >
            Limpiar color
          </button>
        )}
      </div>

      {/* Background Image */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <FaImage className="text-gray-600" />
          <label className="font-medium text-sm">Imagen de Fondo</label>
        </div>
        <input
          type="url"
          value={style.backgroundImage || ''}
          onChange={(e) => handleStyleChange('backgroundImage', e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full px-3 py-2 border rounded text-sm mb-2"
        />
        {style.backgroundImage && (
          <>
            <div className="mb-2">
              <label className="text-xs text-gray-600 block mb-1">
                Overlay Oscuro ({style.backgroundOverlay || 0}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={style.backgroundOverlay || 0}
                onChange={(e) => handleStyleChange('backgroundOverlay', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <button
              onClick={() => {
                handleStyleChange('backgroundImage', undefined);
                handleStyleChange('backgroundOverlay', undefined);
              }}
              className="text-xs text-red-500 hover:text-red-700"
            >
              Quitar imagen
            </button>
          </>
        )}
      </div>

      {/* Text Color */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <FaTextHeight className="text-gray-600" />
          <label className="font-medium text-sm">Color de Texto</label>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-2">
          {presetColors.map((color) => (
            <button
              key={color}
              onClick={() => handleStyleChange('textColor', color)}
              className={`w-12 h-12 rounded border-2 hover:scale-110 transition-transform ${
                style.textColor === color ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
              }`}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
        <input
          type="text"
          value={style.textColor || ''}
          onChange={(e) => handleStyleChange('textColor', e.target.value)}
          placeholder="#000000"
          className="w-full px-3 py-2 border rounded text-sm"
        />
        {style.textColor && (
          <button
            onClick={() => handleStyleChange('textColor', undefined)}
            className="text-xs text-red-500 hover:text-red-700 mt-1"
          >
            Limpiar color
          </button>
        )}
      </div>

      {/* Padding */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <FaRulerVertical className="text-gray-600" />
          <label className="font-medium text-sm">Espaciado (Padding)</label>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-600 block mb-1">Superior</label>
            <select
              value={style.paddingTop || ''}
              onChange={(e) => handleStyleChange('paddingTop', e.target.value)}
              className="w-full px-2 py-1 border rounded text-sm"
            >
              <option value="">Default</option>
              <option value="0">0</option>
              <option value="1rem">1rem</option>
              <option value="2rem">2rem</option>
              <option value="3rem">3rem</option>
              <option value="4rem">4rem</option>
              <option value="6rem">6rem</option>
              <option value="8rem">8rem</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-600 block mb-1">Inferior</label>
            <select
              value={style.paddingBottom || ''}
              onChange={(e) => handleStyleChange('paddingBottom', e.target.value)}
              className="w-full px-2 py-1 border rounded text-sm"
            >
              <option value="">Default</option>
              <option value="0">0</option>
              <option value="1rem">1rem</option>
              <option value="2rem">2rem</option>
              <option value="3rem">3rem</option>
              <option value="4rem">4rem</option>
              <option value="6rem">6rem</option>
              <option value="8rem">8rem</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-600 block mb-1">Izquierdo</label>
            <select
              value={style.paddingLeft || ''}
              onChange={(e) => handleStyleChange('paddingLeft', e.target.value)}
              className="w-full px-2 py-1 border rounded text-sm"
            >
              <option value="">Default</option>
              <option value="0">0</option>
              <option value="1rem">1rem</option>
              <option value="2rem">2rem</option>
              <option value="3rem">3rem</option>
              <option value="4rem">4rem</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-600 block mb-1">Derecho</label>
            <select
              value={style.paddingRight || ''}
              onChange={(e) => handleStyleChange('paddingRight', e.target.value)}
              className="w-full px-2 py-1 border rounded text-sm"
            >
              <option value="">Default</option>
              <option value="0">0</option>
              <option value="1rem">1rem</option>
              <option value="2rem">2rem</option>
              <option value="3rem">3rem</option>
              <option value="4rem">4rem</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reset All Styles */}
      {(style.backgroundColor || style.backgroundImage || style.textColor ||
        style.paddingTop || style.paddingBottom || style.paddingLeft || style.paddingRight) && (
        <div className="pt-4 border-t">
          <button
            onClick={() => onUpdate(block.id, {})}
            className="w-full px-4 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors text-sm font-medium"
          >
            Restablecer Todos los Estilos
          </button>
        </div>
      )}
    </div>
  );
}
