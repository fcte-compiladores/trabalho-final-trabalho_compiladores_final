import React from 'react';
import { Calculator } from 'lucide-react';
import ExpressionCompiler from './components/ExpressionCompiler';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">ExprEdu</h1>
              <p className="text-sm text-slate-600">Compilador Educacional de Expressões Matemáticas</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            Aprenda como funciona um compilador
          </h2>
          <p className="text-slate-600 max-w-3xl">
            Digite expressões matemáticas como <code className="bg-slate-100 px-2 py-1 rounded text-sm">2 * (3 + x)</code> ou{' '}
            <code className="bg-slate-100 px-2 py-1 rounded text-sm">4 + 5 * 2</code> e veja como elas são processadas
            através das etapas de lexical analysis, parsing e avaliação.
          </p>
        </div>
        
        <ExpressionCompiler />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-slate-500 text-sm">
            ExprEdu - Projeto educacional para ensino de compiladores
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;