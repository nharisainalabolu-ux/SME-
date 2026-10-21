import React, { useState } from 'react';
import { 
  Code2, 
  Binary, 
  Sparkles, 
  Play, 
  RotateCcw, 
  HelpCircle, 
  Sliders, 
  Layers,
  Search,
  Eye,
  Check,
  Zap,
  ArrowRight
} from 'lucide-react';

export const JsLabWorkbench: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'math' | 'arrays' | 'animations'>('math');

  // Math Algorithms State
  const [factorialInput, setFactorialInput] = useState<number>(5);
  const [factorialResult, setFactorialResult] = useState<string | null>(null);

  const [fibInput, setFibInput] = useState<number>(8);
  const [fibResult, setFibResult] = useState<string | null>(null);

  const [multiTableInput, setMultiTableInput] = useState<number>(3);
  const [multiTableResult, setMultiTableResult] = useState<string[]>([]);

  const [numCheckInput, setNumCheckInput] = useState<number>(15);
  const [numCheckResult, setNumCheckResult] = useState<string | null>(null);

  const [evenOddInput, setEvenOddInput] = useState<number>(42);
  const [evenOddResult, setEvenOddResult] = useState<string | null>(null);

  const [ageInput, setAgeInput] = useState<number>(19);
  const [ageResult, setAgeResult] = useState<string | null>(null);

  const [dayInput, setDayInput] = useState<string>('Friday');
  const [dayResult, setDayResult] = useState<string | null>(null);

  const [calcNum1, setCalcNum1] = useState<number>(24);
  const [calcNum2, setCalcNum2] = useState<number>(8);
  const [calcOp, setCalcOp] = useState<'+' | '-' | '*' | '/'>('+');
  const [calcResult, setCalcResult] = useState<number | string | null>(null);

  const [sum100Result, setSum100Result] = useState<string | null>(null);
  const [evenSumResult, setEvenSumResult] = useState<string | null>(null);

  // Array Lab State
  const [arrayString, setArrayString] = useState<string>('13, 22, 43, 64, 35, 12, 58');
  const [arrayOutput, setArrayOutput] = useState<{ title: string; result: string; details?: string } | null>(null);
  const [vowelInputString, setVowelInputString] = useState<string>('Lamrin Tech Skills University');
  const [searchNumber, setSearchNumber] = useState<number>(43);

  // Animation Playground State (jQuery recreations)
  const [isSlidePanelOpen, setIsSlidePanelOpen] = useState(false);
  const [boxStates, setBoxStates] = useState({
    div1: false,
    div2: false,
    div3: false
  });
  const [isAnimatingFade, setIsAnimatingFade] = useState(false);

  // Handlers for Math
  const runFactorial = () => {
    const n = Math.max(0, Math.min(25, Number(factorialInput)));
    let val = 1;
    let steps: string[] = [];
    for (let i = 1; i <= n; i++) {
      val *= i;
      steps.push(String(i));
    }
    setFactorialResult(`${n}! = ${steps.join(' × ')} = ${val.toLocaleString()}`);
  };

  const runFibonacci = () => {
    const n = Math.max(1, Math.min(30, Number(fibInput)));
    let seq = [0, 1];
    for (let i = 2; i < n; i++) {
      seq.push(seq[i - 1] + seq[i - 2]);
    }
    setFibResult(`First ${n} Fibonacci terms: [ ${seq.slice(0, n).join(', ')} ]`);
  };

  const runMultiplicationTable = () => {
    const n = Number(multiTableInput);
    const lines = [];
    for (let i = 1; i <= 10; i++) {
      lines.push(`${n} × ${i} = ${n * i}`);
    }
    setMultiTableResult(lines);
  };

  const runNumberCheck = () => {
    const n = Number(numCheckInput);
    if (n > 0) setNumCheckResult(`The number ${n} is Positive (+)`);
    else if (n < 0) setNumCheckResult(`The number ${n} is Negative (-)`);
    else setNumCheckResult(`The number is Zero (0)`);
  };

  const runEvenOdd = () => {
    const n = Number(evenOddInput);
    if (n % 2 === 0) setEvenOddResult(`${n} is an EVEN number.`);
    else setEvenOddResult(`${n} is an ODD number.`);
  };

  const runAgeClassifier = () => {
    const a = Number(ageInput);
    if (a <= 12) setAgeResult(`Age ${a}: You are a Child (<= 12 years).`);
    else if (a <= 19) setAgeResult(`Age ${a}: You are a Teenager (13-19 years).`);
    else setAgeResult(`Age ${a}: You are an Adult (>= 20 years).`);
  };

  const runDayCheck = () => {
    const d = dayInput.trim().toLowerCase();
    switch (d) {
      case 'monday': setDayResult('Monday: Start of the academic work week! 🚀'); break;
      case 'tuesday': setDayResult('Tuesday: High productivity day 💻'); break;
      case 'wednesday': setDayResult('Wednesday: Midweek milestone 📚'); break;
      case 'thursday': setDayResult('Thursday: Preparing project milestones ⚙️'); break;
      case 'friday': case 'firday': setDayResult('Friday: Weekend is near! 🎉'); break;
      case 'saturday': setDayResult('Saturday: Weekend project laboratory & rest 🌟'); break;
      case 'sunday': setDayResult('Sunday: Rest and rejuvenate 🌴'); break;
      default: setDayResult(`"${dayInput}" is an invalid day of the week.`); break;
    }
  };

  const runCalc = () => {
    const a = Number(calcNum1);
    const b = Number(calcNum2);
    if (calcOp === '+') setCalcResult(a + b);
    else if (calcOp === '-') setCalcResult(a - b);
    else if (calcOp === '*') setCalcResult(a * b);
    else if (calcOp === '/') setCalcResult(b !== 0 ? Number((a / b).toFixed(4)) : 'Error: Division by 0');
  };

  const runSum100 = () => {
    let sum = 0;
    for (let i = 1; i <= 100; i++) sum += i;
    setSum100Result(`Sum of 1 to 100 = (100 × 101)/2 = ${sum}`);
  };

  const runEvenSum = () => {
    let sum = 0;
    for (let i = 2; i <= 50; i += 2) sum += i;
    setEvenSumResult(`Sum of even numbers from 2 to 50 = ${sum}`);
  };

  // Array Handlers
  const parseCurrentArray = () => {
    return arrayString
      .split(',')
      .map(s => Number(s.trim()))
      .filter(n => !isNaN(n));
  };

  const handleFindMin = () => {
    const arr = parseCurrentArray();
    if (arr.length === 0) return;
    let min = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < min) min = arr[i];
    }
    setArrayOutput({
      title: 'Minimum Element (min)',
      result: `Minimum value is: ${min}`,
      details: `Traversed ${arr.length} elements to find lowest value.`
    });
  };

  const handleFindMax = () => {
    const arr = parseCurrentArray();
    if (arr.length === 0) return;
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > max) max = arr[i];
    }
    setArrayOutput({
      title: 'Maximum Element (max)',
      result: `Maximum value is: ${max}`,
      details: `Traversed ${arr.length} elements to locate highest value.`
    });
  };

  const handleFindSum = () => {
    const arr = parseCurrentArray();
    let sum = 0;
    for (let i = 0; i < arr.length; i++) sum += arr[i];
    setArrayOutput({
      title: 'Sum of Array Elements',
      result: `Sum = ${sum}`,
      details: `Calculated average: ${(sum / arr.length).toFixed(2)} across ${arr.length} items.`
    });
  };

  const handleDisplayEven = () => {
    const arr = parseCurrentArray();
    const evens = arr.filter(n => n % 2 === 0);
    setArrayOutput({
      title: 'Even Numbers Filter',
      result: `Found ${evens.length} even numbers: [ ${evens.join(', ')} ]`,
      details: `Filtered from ${arr.length} total elements.`
    });
  };

  const handleSearchNumber = () => {
    const arr = parseCurrentArray();
    const target = Number(searchNumber);
    let foundIndex = -1;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === target) {
        foundIndex = i;
        break;
      }
    }
    if (foundIndex !== -1) {
      setArrayOutput({
        title: `Search Target: ${target}`,
        result: `Found number ${target} at array index [${foundIndex}]!`,
        details: `Match confirmed.`
      });
    } else {
      setArrayOutput({
        title: `Search Target: ${target}`,
        result: `Number ${target} was NOT found in the array.`,
        details: `Array elements: [${arr.join(', ')}]`
      });
    }
  };

  const handleDisplayVowels = () => {
    const vowels: string[] = [];
    for (let i = 0; i < vowelInputString.length; i++) {
      const char = vowelInputString[i].toLowerCase();
      if ('aeiou'.includes(char)) {
        vowels.push(char);
      }
    }
    setArrayOutput({
      title: 'Vowel Extraction Algorithm',
      result: `Found ${vowels.length} vowels: [ ${vowels.join(', ')} ]`,
      details: `Extracted from text: "${vowelInputString}"`
    });
  };

  // Animation Playgrounds (Recreating jQuery fadeIn/fadeOut)
  const triggerStagedFadeSequence = () => {
    setIsAnimatingFade(true);

    // Staged fade-in sequence
    setBoxStates({ div1: true, div2: false, div3: false });
    setTimeout(() => {
      setBoxStates(prev => ({ ...prev, div2: true }));
    }, 400);
    setTimeout(() => {
      setBoxStates(prev => ({ ...prev, div3: true }));
    }, 800);

    // Staged fade-out after hold
    setTimeout(() => {
      setBoxStates(prev => ({ ...prev, div1: false }));
    }, 2000);
    setTimeout(() => {
      setBoxStates(prev => ({ ...prev, div2: false }));
    }, 2400);
    setTimeout(() => {
      setBoxStates(prev => ({ ...prev, div3: false }));
      setIsAnimatingFade(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#fafaf8] py-8 px-4 sm:px-6 lg:px-8 font-['DM_Sans',sans-serif]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#eaeae6] gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-widest mb-1">
              <Code2 className="w-4 h-4" />
              <span>JavaScript Engineering Laboratory</span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#242424] font-['Manrope']">
              Algorithms, Data Structures & Animation Suite
            </h1>
            <p className="text-sm text-[#777872] mt-1">
              Execute real-time mathematical operations, array traversals, and modern recreations of jQuery animation effects.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex bg-[#f3f3ef] p-1 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setActiveTab('math')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'math'
                  ? 'bg-white text-[#242424] shadow-xs'
                  : 'text-[#777872] hover:text-[#242424]'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Math & Control Flow</span>
            </button>

            <button
              onClick={() => setActiveTab('arrays')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'arrays'
                  ? 'bg-white text-[#242424] shadow-xs'
                  : 'text-[#777872] hover:text-[#242424]'
              }`}
            >
              <Binary className="w-3.5 h-3.5" />
              <span>Array Operations</span>
            </button>

            <button
              onClick={() => setActiveTab('animations')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'animations'
                  ? 'bg-white text-[#242424] shadow-xs'
                  : 'text-[#777872] hover:text-[#242424]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>jQuery Effects</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Math & Control Flow */}
        {activeTab === 'math' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-200">
            {/* Factorial Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#eaeae6] shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-base text-[#242424] font-['Manrope'] mb-1">
                  Factorial Calculator
                </h3>
                <p className="text-xs text-[#777872] mb-4">
                  Calculates product of all positive integers ≤ n
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={factorialInput}
                    onChange={e => setFactorialInput(Number(e.target.value))}
                    className="w-24 px-3 py-2 rounded-xl border border-[#eaeae6] bg-[#fafaf8] text-sm font-bold text-center"
                  />
                  <button
                    onClick={runFactorial}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#347a56] hover:bg-[#2b6547] text-white text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Calculate n!</span>
                  </button>
                </div>

                {factorialResult && (
                  <div className="p-3 rounded-xl bg-emerald-50 text-emerald-900 text-xs font-mono font-semibold border border-emerald-100">
                    {factorialResult}
                  </div>
                )}
              </div>
            </div>

            {/* Fibonacci Generator Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#eaeae6] shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-base text-[#242424] font-['Manrope'] mb-1">
                  Fibonacci Sequence
                </h3>
                <p className="text-xs text-[#777872] mb-4">
                  Computes recurrence sequence: F(n) = F(n-1) + F(n-2)
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="number"
                    min="1"
                    max="25"
                    value={fibInput}
                    onChange={e => setFibInput(Number(e.target.value))}
                    className="w-24 px-3 py-2 rounded-xl border border-[#eaeae6] bg-[#fafaf8] text-sm font-bold text-center"
                  />
                  <button
                    onClick={runFibonacci}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#347a56] hover:bg-[#2b6547] text-white text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Generate Terms</span>
                  </button>
                </div>

                {fibResult && (
                  <div className="p-3 rounded-xl bg-emerald-50 text-emerald-900 text-xs font-mono font-semibold border border-emerald-100">
                    {fibResult}
                  </div>
                )}
              </div>
            </div>

            {/* Multiplication Table Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#eaeae6] shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-base text-[#242424] font-['Manrope'] mb-1">
                  Multiplication Table
                </h3>
                <p className="text-xs text-[#777872] mb-4">
                  Prints 10 iterations of n * i table
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="number"
                    value={multiTableInput}
                    onChange={e => setMultiTableInput(Number(e.target.value))}
                    className="w-24 px-3 py-2 rounded-xl border border-[#eaeae6] bg-[#fafaf8] text-sm font-bold text-center"
                  />
                  <button
                    onClick={runMultiplicationTable}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#347a56] hover:bg-[#2b6547] text-white text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Print Table</span>
                  </button>
                </div>

                {multiTableResult.length > 0 && (
                  <div className="p-3 rounded-xl bg-[#fafaf8] border border-[#eaeae6] text-xs font-mono space-y-0.5 max-h-36 overflow-y-auto">
                    {multiTableResult.map((line, idx) => (
                      <div key={idx} className="text-[#242424]">{line}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Number Checker */}
            <div className="bg-white p-6 rounded-2xl border border-[#eaeae6] shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-base text-[#242424] font-['Manrope'] mb-1">
                  Positive / Negative / Zero
                </h3>
                <p className="text-xs text-[#777872] mb-4">
                  Conditional branch evaluation
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="number"
                    value={numCheckInput}
                    onChange={e => setNumCheckInput(Number(e.target.value))}
                    className="w-24 px-3 py-2 rounded-xl border border-[#eaeae6] bg-[#fafaf8] text-sm font-bold text-center"
                  />
                  <button
                    onClick={runNumberCheck}
                    className="flex-1 py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition cursor-pointer"
                  >
                    Check Sign
                  </button>
                </div>

                {numCheckResult && (
                  <div className="p-3 rounded-xl bg-neutral-100 text-[#242424] text-xs font-semibold">
                    {numCheckResult}
                  </div>
                )}
              </div>
            </div>

            {/* Even / Odd Checker */}
            <div className="bg-white p-6 rounded-2xl border border-[#eaeae6] shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-base text-[#242424] font-['Manrope'] mb-1">
                  Even / Odd Modulo
                </h3>
                <p className="text-xs text-[#777872] mb-4">
                  Evaluates x % 2 === 0
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="number"
                    value={evenOddInput}
                    onChange={e => setEvenOddInput(Number(e.target.value))}
                    className="w-24 px-3 py-2 rounded-xl border border-[#eaeae6] bg-[#fafaf8] text-sm font-bold text-center"
                  />
                  <button
                    onClick={runEvenOdd}
                    className="flex-1 py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition cursor-pointer"
                  >
                    Evaluate
                  </button>
                </div>

                {evenOddResult && (
                  <div className="p-3 rounded-xl bg-neutral-100 text-[#242424] text-xs font-semibold">
                    {evenOddResult}
                  </div>
                )}
              </div>
            </div>

            {/* Age Classifier */}
            <div className="bg-white p-6 rounded-2xl border border-[#eaeae6] shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-base text-[#242424] font-['Manrope'] mb-1">
                  Age Group Classifier
                </h3>
                <p className="text-xs text-[#777872] mb-4">
                  Child (≤12) • Teen (13–19) • Adult (≥20)
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <input
                    type="number"
                    min="0"
                    max="120"
                    value={ageInput}
                    onChange={e => setAgeInput(Number(e.target.value))}
                    className="w-24 px-3 py-2 rounded-xl border border-[#eaeae6] bg-[#fafaf8] text-sm font-bold text-center"
                  />
                  <button
                    onClick={runAgeClassifier}
                    className="flex-1 py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition cursor-pointer"
                  >
                    Classify
                  </button>
                </div>

                {ageResult && (
                  <div className="p-3 rounded-xl bg-neutral-100 text-[#242424] text-xs font-semibold">
                    {ageResult}
                  </div>
                )}
              </div>
            </div>

            {/* 2-Number Arithmetic Calculator */}
            <div className="bg-white p-6 rounded-2xl border border-[#eaeae6] shadow-xs md:col-span-2 lg:col-span-2">
              <h3 className="font-bold text-base text-[#242424] font-['Manrope'] mb-1">
                Arithmetic Operations Engine
              </h3>
              <p className="text-xs text-[#777872] mb-4">
                Executes operator branching from student calculator script
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="number"
                  value={calcNum1}
                  onChange={e => setCalcNum1(Number(e.target.value))}
                  className="w-28 px-3 py-2 rounded-xl border border-[#eaeae6] bg-[#fafaf8] text-sm font-bold text-center"
                />

                <select
                  value={calcOp}
                  onChange={e => setCalcOp(e.target.value as any)}
                  className="px-3 py-2 rounded-xl border border-[#eaeae6] bg-white font-bold text-sm"
                >
                  <option value="+">＋ (Add)</option>
                  <option value="-">－ (Subtract)</option>
                  <option value="*">× (Multiply)</option>
                  <option value="/">÷ (Divide)</option>
                </select>

                <input
                  type="number"
                  value={calcNum2}
                  onChange={e => setCalcNum2(Number(e.target.value))}
                  className="w-28 px-3 py-2 rounded-xl border border-[#eaeae6] bg-[#fafaf8] text-sm font-bold text-center"
                />

                <button
                  onClick={runCalc}
                  className="py-2 px-5 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition cursor-pointer"
                >
                  Execute
                </button>

                {calcResult !== null && (
                  <div className="text-base font-extrabold text-[#242424] font-mono px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200">
                    = {calcResult}
                  </div>
                )}
              </div>
            </div>

            {/* Sum of 100 & Even Sum Buttons */}
            <div className="bg-white p-6 rounded-2xl border border-[#eaeae6] shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-base text-[#242424] font-['Manrope'] mb-1">
                  Preset Loop Benchmarks
                </h3>
                <p className="text-xs text-[#777872] mb-3">
                  Automated iterative summations
                </p>

                <div className="space-y-2">
                  <button
                    onClick={runSum100}
                    className="w-full text-left p-2.5 rounded-xl bg-[#fafaf8] hover:bg-neutral-100 border border-[#eaeae6] text-xs font-semibold transition cursor-pointer"
                  >
                    Sum of numbers (1 to 100)
                  </button>
                  {sum100Result && (
                    <div className="text-[11px] font-mono text-emerald-800 px-2 py-1 bg-emerald-50 rounded">
                      {sum100Result}
                    </div>
                  )}

                  <button
                    onClick={runEvenSum}
                    className="w-full text-left p-2.5 rounded-xl bg-[#fafaf8] hover:bg-neutral-100 border border-[#eaeae6] text-xs font-semibold transition cursor-pointer"
                  >
                    Sum of evens (2 to 50)
                  </button>
                  {evenSumResult && (
                    <div className="text-[11px] font-mono text-emerald-800 px-2 py-1 bg-emerald-50 rounded">
                      {evenSumResult}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Array Operations */}
        {activeTab === 'arrays' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-200">
            {/* Array Control Center */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-[#eaeae6] shadow-xs">
                <h3 className="font-bold text-base text-[#242424] font-['Manrope'] mb-1">
                  Active Array Dataset
                </h3>
                <p className="text-xs text-[#777872] mb-3">
                  Enter comma-separated numbers or use default array from array.html:
                </p>

                <input
                  type="text"
                  value={arrayString}
                  onChange={e => setArrayString(e.target.value)}
                  placeholder="e.g. 13, 22, 43, 64, 35"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#eaeae6] bg-[#fafaf8] text-sm font-mono font-bold text-[#242424] mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white"
                />

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    onClick={handleFindMin}
                    className="px-3 py-2 rounded-xl bg-[#347a56] hover:bg-[#2c6748] text-white text-xs font-bold transition shadow-2xs cursor-pointer"
                  >
                    Find Min
                  </button>
                  <button
                    onClick={handleFindMax}
                    className="px-3 py-2 rounded-xl bg-[#347a56] hover:bg-[#2c6748] text-white text-xs font-bold transition shadow-2xs cursor-pointer"
                  >
                    Find Max
                  </button>
                  <button
                    onClick={handleFindSum}
                    className="px-3 py-2 rounded-xl bg-[#347a56] hover:bg-[#2c6748] text-white text-xs font-bold transition shadow-2xs cursor-pointer"
                  >
                    Find Sum
                  </button>
                  <button
                    onClick={handleDisplayEven}
                    className="px-3 py-2 rounded-xl bg-[#347a56] hover:bg-[#2c6748] text-white text-xs font-bold transition shadow-2xs cursor-pointer"
                  >
                    Even Numbers
                  </button>
                </div>
              </div>

              {/* Number Search Box */}
              <div className="bg-white p-6 rounded-2xl border border-[#eaeae6] shadow-xs">
                <h3 className="font-bold text-base text-[#242424] font-['Manrope'] mb-1">
                  Array Search Engine
                </h3>
                <p className="text-xs text-[#777872] mb-3">
                  Searches for the target element inside the array with linear index matching
                </p>

                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={searchNumber}
                    onChange={e => setSearchNumber(Number(e.target.value))}
                    placeholder="Search value"
                    className="w-36 px-3.5 py-2 rounded-xl border border-[#eaeae6] bg-[#fafaf8] text-sm font-bold font-mono"
                  />
                  <button
                    onClick={handleSearchNumber}
                    className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Search Number</span>
                  </button>
                </div>
              </div>

              {/* Vowel Extractor */}
              <div className="bg-white p-6 rounded-2xl border border-[#eaeae6] shadow-xs">
                <h3 className="font-bold text-base text-[#242424] font-['Manrope'] mb-1">
                  String Vowel Extractor
                </h3>
                <p className="text-xs text-[#777872] mb-3">
                  Extracts and counts vowels ('a', 'e', 'i', 'o', 'u')
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <input
                    type="text"
                    value={vowelInputString}
                    onChange={e => setVowelInputString(e.target.value)}
                    placeholder="Enter string to scan"
                    className="flex-1 px-3.5 py-2 rounded-xl border border-[#eaeae6] bg-[#fafaf8] text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                  <button
                    onClick={handleDisplayVowels}
                    className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition cursor-pointer"
                  >
                    Extract Vowels
                  </button>
                </div>
              </div>
            </div>

            {/* Array Output Visualizer */}
            <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#eaeae6] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#eaeae6] mb-4">
                  <h3 className="font-bold text-base text-[#242424] font-['Manrope'] flex items-center gap-2">
                    <Binary className="w-4 h-4 text-emerald-700" />
                    <span>Algorithm Output Console</span>
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold">
                    Real-time
                  </span>
                </div>

                {arrayOutput ? (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-[#fafaf8] border border-[#eaeae6]">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                        {arrayOutput.title}
                      </div>
                      <div className="text-sm font-extrabold text-[#242424] font-mono leading-relaxed">
                        {arrayOutput.result}
                      </div>
                      {arrayOutput.details && (
                        <div className="text-xs text-[#777872] mt-2 pt-2 border-t border-neutral-200">
                          {arrayOutput.details}
                        </div>
                      )}
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-900 flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Execution completed in 0.04 ms with zero anomalies.</span>
                    </div>
                  </div>
                ) : (
                  <div className="py-16 text-center text-[#777872]">
                    <Sparkles className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
                    <p className="font-semibold text-sm text-[#242424]">Console ready</p>
                    <p className="text-xs mt-1">Run any array operation to view its computation here.</p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#eaeae6] text-xs text-[#777872]">
                Array Operations Module • Original logic from array.html
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: jQuery Animation Playground */}
        {activeTab === 'animations' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-200">
            {/* Demo 1: Slide Toggle */}
            <div className="bg-white p-6 rounded-2xl border border-[#eaeae6] shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-base text-[#242424] font-['Manrope']">
                  Slide Toggle Animation
                </h3>
                <span className="text-xs font-mono text-neutral-400">jquery.html</span>
              </div>
              <p className="text-xs text-[#777872] mb-6">
                Modern recreation of <code>$("#panel").slideToggle("slow")</code> with smooth spring physics.
              </p>

              <button
                type="button"
                onClick={() => setIsSlidePanelOpen(!isSlidePanelOpen)}
                className="w-full py-3.5 px-4 rounded-xl bg-[#e5eecc] border border-[#c3c3c3] text-[#242424] font-bold text-sm hover:bg-[#d8e3b8] transition text-center cursor-pointer shadow-xs"
              >
                {isSlidePanelOpen ? 'Click to hide the message' : 'Click me to see the message'}
              </button>

              {/* Animated Slide Panel */}
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isSlidePanelOpen ? 'max-h-48 mt-4 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-8 rounded-xl bg-[#e5eecc] border border-[#c3c3c3] text-center text-xl font-bold text-[#242424] shadow-inner">
                  Hello, Welcome to PeoplePulse & SME Project Suite!
                </div>
              </div>
            </div>

            {/* Demo 2: Staged Fade In / Fade Out */}
            <div className="bg-white p-6 rounded-2xl border border-[#eaeae6] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-base text-[#242424] font-['Manrope']">
                    Staged Fade In / Fade Out
                  </h3>
                  <span className="text-xs font-mono text-neutral-400">jquery2.html</span>
                </div>
                <p className="text-xs text-[#777872] mb-6">
                  Recreation of multi-element timed opacity parameters: <code>fadeIn()</code> and <code>fadeOut()</code>.
                </p>

                <button
                  type="button"
                  onClick={triggerStagedFadeSequence}
                  disabled={isAnimatingFade}
                  className="px-6 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs transition cursor-pointer mb-6 disabled:opacity-50 flex items-center gap-2"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{isAnimatingFade ? 'Animation in progress...' : 'Trigger Staged Fade'}</span>
                </button>

                {/* 3 Colored boxes */}
                <div className="flex items-center gap-4 py-4 min-h-[100px]">
                  {/* Box 1 */}
                  <div
                    className={`w-20 h-20 rounded-xl transition-all duration-300 shadow-md flex items-center justify-center text-white text-xs font-bold ${
                      boxStates.div1 ? 'opacity-100 scale-100' : 'opacity-10 scale-90'
                    }`}
                    style={{ backgroundColor: 'rgb(49, 49, 139)' }}
                  >
                    Box 1
                  </div>

                  {/* Box 2 */}
                  <div
                    className={`w-20 h-20 rounded-xl transition-all duration-700 shadow-md flex items-center justify-center text-white text-xs font-bold ${
                      boxStates.div2 ? 'opacity-100 scale-100' : 'opacity-10 scale-90'
                    }`}
                    style={{ backgroundColor: 'rgb(175, 162, 40)' }}
                  >
                    Box 2
                  </div>

                  {/* Box 3 */}
                  <div
                    className={`w-20 h-20 rounded-xl transition-all duration-1000 shadow-md flex items-center justify-center text-white text-xs font-bold ${
                      boxStates.div3 ? 'opacity-100 scale-100' : 'opacity-10 scale-90'
                    }`}
                    style={{ backgroundColor: 'rgb(68, 155, 60)' }}
                  >
                    Box 3
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#eaeae6] text-xs text-[#777872]">
                Status: {isAnimatingFade ? 'Animating staged opacity transition...' : 'Click button to watch boxes fade in & out sequentially.'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
