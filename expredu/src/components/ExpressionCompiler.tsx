import React, { useState, useCallback } from 'react';
import { Play, RotateCcw, AlertCircle, CheckCircle, Calculator } from 'lucide-react';
import InputPanel from './InputPanel';
import ResultsPanel from './ResultsPanel';
import { tokenize } from '../compiler/lexer';
import { parse } from '../compiler/parser';
import { evaluate, evaluateStepByStep } from '../compiler/evaluator';
import { visualizeAST } from '../compiler/visualizer';
import type { Token, ASTNode, EvaluationStep, CompilerError } from '../types/compiler';

interface CompilationResult {
  tokens: Token[];
  ast: ASTNode | null;
  astVisualization: string;
  steps: EvaluationStep[];
  result: number | null;
  error: CompilerError | null;
}

export default function ExpressionCompiler() {
  const [expression, setExpression] = useState('2 * (3 + x)');
  const [variables, setVariables] = useState<Record<string, number>>({ x: 5 });
  const [result, setResult] = useState<CompilationResult | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);

  const compile = useCallback(async () => {
    setIsCompiling(true);
    
    // Simulate compilation delay for educational purposes
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      // Step 1: Lexical Analysis
      const tokens = tokenize(expression);
      
      // Step 2: Syntax Analysis (Parsing)
      const ast = parse(tokens);
      
      // Step 3: AST Visualization
      const astVisualization = visualizeAST(ast);
      
      // Step 4: Evaluation
      const steps = evaluateStepByStep(ast, variables);
      const finalResult = evaluate(ast, variables);
      
      setResult({
        tokens,
        ast,
        astVisualization,
        steps,
        result: finalResult,
        error: null
      });
    } catch (error) {
      setResult({
        tokens: [],
        ast: null,
        astVisualization: '',
        steps: [],
        result: null,
        error: {
          message: error instanceof Error ? error.message : 'Erro desconhecido',
          position: 0
        }
      });
    } finally {
      setIsCompiling(false);
    }
  }, [expression, variables]);

  const reset = useCallback(() => {
    setExpression('');
    setVariables({});
    setResult(null);
  }, []);

  const loadExample = useCallback((example: string) => {
    setExpression(example);
    // Set default variables for examples
    if (example.includes('x')) setVariables({ x: 5 });
    if (example.includes('a') || example.includes('b')) {
      setVariables({ a: 3, b: 2 });
    }
  }, []);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Input Panel */}
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">
              Editor de Expressões
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={compile}
                disabled={isCompiling || !expression.trim()}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Play className="w-4 h-4" />
                <span>{isCompiling ? 'Compilando...' : 'Compilar'}</span>
              </button>
              <button
                onClick={reset}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Limpar</span>
              </button>
            </div>
          </div>
          
          <InputPanel
            expression={expression}
            variables={variables}
            onExpressionChange={setExpression}
            onVariablesChange={setVariables}
            onLoadExample={loadExample}
          />
        </div>
      </div>

      {/* Results Panel */}
      <div className="space-y-6">
        {result && (
          <>
            {result.error ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="flex items-center space-x-2 text-red-700 mb-2">
                  <AlertCircle className="w-5 h-5" />
                  <h3 className="font-semibold">Erro de Compilação</h3>
                </div>
                <p className="text-red-600">{result.error.message}</p>
              </div>
            ) : (
              <>
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-center space-x-2 text-green-700 mb-2">
                    <CheckCircle className="w-5 h-5" />
                    <h3 className="font-semibold">Compilação Bem-sucedida</h3>
                  </div>
                  <p className="text-2xl font-bold text-green-800">
                    Resultado: {result.result}
                  </p>
                </div>
                
                <ResultsPanel result={result} />
              </>
            )}
          </>
        )}
        
        {!result && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
            <Calculator className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">
              Pronto para compilar
            </h3>
            <p className="text-slate-500">
              Digite uma expressão matemática e clique em "Compilar" para ver como ela é processada.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}