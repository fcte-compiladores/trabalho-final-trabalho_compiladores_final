import React from 'react';
import { BookOpen } from 'lucide-react';

interface InputPanelProps {
  expression: string;
  variables: Record<string, number>;
  onExpressionChange: (expression: string) => void;
  onVariablesChange: (variables: Record<string, number>) => void;
  onLoadExample: (example: string) => void;
}

export default function InputPanel({
  expression,
  variables,
  onExpressionChange,
  onVariablesChange,
  onLoadExample
}: InputPanelProps) {
  const examples = [
    { label: 'Básico', expression: '2 + 3 * 4' },
    { label: 'Parênteses', expression: '(2 + 3) * 4' },
    { label: 'Com Variável', expression: '2 * (3 + x)' },
    { label: 'Complexa', expression: 'a * b + (3 - 1) * 2' }
  ];

  const updateVariable = (name: string, value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      const newVars = { ...variables };
      delete newVars[name];
      onVariablesChange(newVars);
    } else {
      onVariablesChange({ ...variables, [name]: numValue });
    }
  };

  const addVariable = () => {
    const name = prompt('Nome da variável:');
    if (name && /^[a-zA-Z][a-zA-Z0-9]*$/.test(name)) {
      onVariablesChange({ ...variables, [name]: 0 });
    }
  };

  const removeVariable = (name: string) => {
    const newVars = { ...variables };
    delete newVars[name];
    onVariablesChange(newVars);
  };

  return (
    <div className="space-y-6">
      {/* Expression Input */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Expressão Matemática
        </label>
        <textarea
          value={expression}
          onChange={(e) => onExpressionChange(e.target.value)}
          placeholder="Digite sua expressão matemática aqui..."
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-lg resize-none"
          rows={3}
        />
        <p className="text-xs text-slate-500 mt-1">
          Operadores suportados: +, -, *, /, (), variáveis (a-z)
        </p>
      </div>

      {/* Examples */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <BookOpen className="w-4 h-4 text-slate-600" />
          <label className="text-sm font-medium text-slate-700">
            Exemplos
          </label>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {examples.map((example) => (
            <button
              key={example.expression}
              onClick={() => onLoadExample(example.expression)}
              className="px-3 py-2 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-left"
            >
              <div className="font-medium text-slate-700">{example.label}</div>
              <div className="font-mono text-xs text-slate-600">{example.expression}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Variables */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-slate-700">
            Variáveis
          </label>
          <button
            onClick={addVariable}
            className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
          >
            + Adicionar
          </button>
        </div>
        
        {Object.keys(variables).length === 0 ? (
          <p className="text-sm text-slate-500 italic">
            Nenhuma variável definida
          </p>
        ) : (
          <div className="space-y-2">
            {Object.entries(variables).map(([name, value]) => (
              <div key={name} className="flex items-center space-x-3">
                <span className="font-mono text-sm font-medium text-slate-700 w-8">
                  {name} =
                </span>
                <input
                  type="number"
                  step="any"
                  value={value}
                  onChange={(e) => updateVariable(name, e.target.value)}
                  className="flex-1 px-3 py-1 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
                <button
                  onClick={() => removeVariable(name)}
                  className="text-red-500 hover:text-red-700 text-sm px-2 py-1 hover:bg-red-50 rounded transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}