import React, { useState } from 'react';
import { ChevronRight, Code, GitBranch, Play, Hash } from 'lucide-react';
import type { Token, ASTNode, EvaluationStep } from '../types/compiler';

interface ResultsPanelProps {
  result: {
    tokens: Token[];
    ast: ASTNode | null;
    astVisualization: string;
    steps: EvaluationStep[];
    result: number | null;
  };
}

export default function ResultsPanel({ result }: ResultsPanelProps) {
  const [activeTab, setActiveTab] = useState<'tokens' | 'ast' | 'steps'>('tokens');

  const tabs = [
    { id: 'tokens' as const, label: 'Tokens', icon: Hash },
    { id: 'ast' as const, label: 'AST', icon: GitBranch },
    { id: 'steps' as const, label: 'Avaliação', icon: Play }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Tab Navigation */}
      <div className="border-b border-slate-200">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-700 bg-blue-50'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'tokens' && (
          <div>
            <h4 className="font-semibold text-slate-900 mb-4 flex items-center space-x-2">
              <Hash className="w-5 h-5" />
              <span>Análise Léxica - Tokens</span>
            </h4>
            <p className="text-sm text-slate-600 mb-4">
              A expressão foi dividida nos seguintes tokens:
            </p>
            <div className="grid gap-2">
              {result.tokens.map((token, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-3 bg-slate-50 rounded-lg border border-slate-200"
                >
                  <span className="font-mono text-sm font-bold text-blue-600 min-w-0 flex-1">
                    '{token.value}'
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    token.type === 'NUMBER' ? 'bg-green-100 text-green-700' :
                    token.type === 'OPERATOR' ? 'bg-orange-100 text-orange-700' :
                    token.type === 'VARIABLE' ? 'bg-purple-100 text-purple-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {token.type}
                  </span>
                  <span className="text-xs text-slate-500">
                    pos: {token.position}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'ast' && (
          <div>
            <h4 className="font-semibold text-slate-900 mb-4 flex items-center space-x-2">
              <GitBranch className="w-5 h-5" />
              <span>Árvore Sintática Abstrata (AST)</span>
            </h4>
            <p className="text-sm text-slate-600 mb-4">
              Representação hierárquica da estrutura da expressão:
            </p>
            <div className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-auto">
              <pre className="font-mono text-sm whitespace-pre">
                {result.astVisualization}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'steps' && (
          <div>
            <h4 className="font-semibold text-slate-900 mb-4 flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Ordem de Avaliação</span>
            </h4>
            <p className="text-sm text-slate-600 mb-4">
              Passo a passo da avaliação da expressão:
            </p>
            <div className="space-y-3">
              {result.steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg border border-slate-200"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-mono text-sm text-slate-800">
                      {step.expression}
                    </div>
                    <div className="text-xs text-slate-600 mt-1">
                      {step.description}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                  <div className="font-mono font-bold text-blue-600">
                    {step.result}
                  </div>
                </div>
              ))}
              
              {/* Final Result */}
              <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full text-sm font-bold">
                  ✓
                </div>
                <div className="flex-1">
                  <div className="font-medium text-green-800">
                    Resultado Final
                  </div>
                  <div className="text-sm text-green-600">
                    Avaliação completa da expressão
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-700">
                  {result.result}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}