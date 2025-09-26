'use client';

import { useState } from 'react';

interface ComplementaryColorPickerProps {
  baseColor: string;
}

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
}

function hslToHex(h: number, s: number, l: number): string {
  h /= 360;
  s /= 100;
  l /= 100;

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = Math.round(hue2rgb(p, q, h + 1/3) * 255);
  const g = Math.round(hue2rgb(p, q, h) * 255);
  const b = Math.round(hue2rgb(p, q, h - 1/3) * 255);

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function generateComplementaryColors(baseColor: string): string[] {
  const [h, s, l] = hexToHsl(baseColor);

  return [
    baseColor, // Original color
    hslToHex((h + 180) % 360, s, l), // Complementary
    hslToHex((h + 120) % 360, s, l), // Triadic 1
    hslToHex((h + 240) % 360, s, l), // Triadic 2
    hslToHex(h, Math.max(s - 30, 10), Math.min(l + 20, 90)), // Lighter variant
    hslToHex(h, Math.min(s + 20, 90), Math.max(l - 20, 10))  // Darker variant
  ];
}

export default function ComplementaryColorPicker({ baseColor }: ComplementaryColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const complementaryColors = generateComplementaryColors(baseColor);

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    console.log(selectedColor);

  };

  return (
    <div className="p-4 border rounded-lg  shadow-lg max-w-md bg-white text-black">
      <h3 className="text-lg font-semibold mb-4">Complementary Colors</h3>
      <p className="text-sm mb-4">
        Based on your color <span className="font-mono">{baseColor}</span>:
      </p>

      <div className="grid grid-cols-3 gap-3 mb-4">
        {complementaryColors.map((color, index) => {
          const labels = ['Original', 'Complementary', 'Triadic 1', 'Triadic 2', 'Light', 'Dark'];
          return (
            <button
              key={color}
              onClick={() => handleColorClick(color)}
              className={`flex flex-col items-center p-2 rounded-lg border-2 transition-all ${
                selectedColor === color
                  ? 'border-gray-800 scale-105'
                  : 'border-gray-300 hover:border-gray-500'
              }`}
            >
              <div
                className="w-12 h-12 rounded-lg border mb-2"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs text-gray-600">{labels[index]}</span>
              <span className="text-xs font-mono text-gray-500">{color}</span>
            </button>
          );
        })}
      </div>

      {selectedColor && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Selected:</p>
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded border"
              style={{ backgroundColor: selectedColor }}
            />
            <span className="font-mono text-sm">{selectedColor}</span>
          </div>
        </div>
      )}
    </div>
  );
}
