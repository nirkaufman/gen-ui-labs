'use client';

import {ReactNode, useState} from 'react';
import {useActions, useUIState} from "@ai-sdk/rsc";


const popularColors = [
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#45B7D1', // Blue
  '#96CEB4', // Green
  '#FFEAA7', // Yellow
  '#DDA0DD', // Purple
  '#FFA07A', // Orange
  '#98FB98'  // Light Green
];

export default function SimpleColorPicker() {
  const {HomeDecoratorAction} = useActions();
  const [selectedColor, setSelectedColor] = useState<string>('');
  const setMessages = useUIState()[1];


  const handleColorClick = async (color: string) => {
    setSelectedColor(color);

    const display = await HomeDecoratorAction(
        `This is my current color: ${color}, recommend me a complementary new color`,
    );

    setMessages((messages: ReactNode[]) => [...messages, display]);
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-lg max-w-sm">
      <h3 className="text-lg font-semibold mb-4 text-black">Choose a Color</h3>

      <div className="grid grid-cols-4 gap-3 mb-4">
        {popularColors.map((color) => (
          <button
            key={color}
            onClick={() => handleColorClick(color)}
            className={`w-16 h-16 rounded-lg border-2 transition-all ${
              selectedColor === color
                ? 'border-gray-800 scale-105'
                : 'border-gray-300 hover:border-gray-500'
            }`}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>

      {selectedColor && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Selected:</p>
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded border"
              style={{ backgroundColor: selectedColor }}
            />
            <span className="font-mono text-sm text-black">{selectedColor}</span>
          </div>
        </div>
      )}
    </div>
  );
}
