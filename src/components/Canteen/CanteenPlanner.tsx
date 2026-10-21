import React, { useState, useMemo } from 'react';
import { CANTEEN_FOOD_ITEMS } from '../../data/initialData';
import { CanteenFoodItem } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import confetti from 'canvas-confetti';
import { 
  Utensils, 
  Wallet, 
  ShoppingBag, 
  Percent, 
  CheckCircle, 
  AlertTriangle, 
  Sparkles, 
  Receipt, 
  RotateCcw,
  Flame,
  Plus,
  Minus
} from 'lucide-react';

export const CanteenPlanner: React.FC = () => {
  const [items, setItems] = useState<CanteenFoodItem[]>(CANTEEN_FOOD_ITEMS);
  const [selectedItemIds, setSelectedItemIds] = useState<Set<string>>(new Set(['burger', 'coffee']));
  const [quantities, setQuantities] = useState<Record<string, number>>({
    burger: 1,
    coffee: 1
  });
  const [budgetInput, setBudgetInput] = useState<string>('250');
  const [calculatedSummary, setCalculatedSummary] = useState<{
    calculated: boolean;
    totalBill: number;
    discount: number;
    finalBill: number;
    budget: number;
    canAfford: boolean;
    error?: string;
  } | null>(null);

  const toggleItemSelection = (id: string) => {
    setSelectedItemIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        if (!quantities[id]) {
          setQuantities(q => ({ ...q, [id]: 1 }));
        }
      }
      return next;
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const nextVal = Math.max(1, current + delta);
      return { ...prev, [id]: nextVal };
    });
  };

  const totalItemCount = useMemo(() => {
    let count = 0;
    selectedItemIds.forEach(id => {
      count += quantities[id] || 1;
    });
    return count;
  }, [selectedItemIds, quantities]);

  const rawSubtotal = useMemo(() => {
    let sum = 0;
    selectedItemIds.forEach(id => {
      const item = items.find(i => i.id === id);
      if (item) {
        sum += item.price * (quantities[id] || 1);
      }
    });
    return sum;
  }, [selectedItemIds, quantities, items]);

  const handleCalculateBill = () => {
    const budget = Number(budgetInput);

    if (!budgetInput || isNaN(budget) || budget <= 0) {
      setCalculatedSummary({
        calculated: false,
        totalBill: 0,
        discount: 0,
        finalBill: 0,
        budget: 0,
        canAfford: false,
        error: 'Please enter a valid budget greater than zero.'
      });
      return;
    }

    if (selectedItemIds.size === 0) {
      setCalculatedSummary({
        calculated: false,
        totalBill: 0,
        discount: 0,
        finalBill: 0,
        budget: 0,
        canAfford: false,
        error: 'Please select at least one food item.'
      });
      return;
    }

    // Bill calculation with 10% discount if bill > ₹300 (Assignment rule)
    const totalBill = rawSubtotal;
    let discount = 0;
    if (totalBill > 300) {
      discount = totalBill * 0.10;
    }
    const finalBill = totalBill - discount;
    const canAfford = budget >= finalBill;

    setCalculatedSummary({
      calculated: true,
      totalBill,
      discount,
      finalBill,
      budget,
      canAfford
    });

    if (canAfford) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {
        // ignore if canvas blocked
      }
    }
  };

  const resetAll = () => {
    setSelectedItemIds(new Set(['burger']));
    setQuantities({ burger: 1 });
    setBudgetInput('200');
    setCalculatedSummary(null);
  };

  return (
    <div className="min-h-screen bg-[#fafaf8] py-8 px-4 sm:px-6 lg:px-8 font-['DM_Sans',sans-serif]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#eaeae6] gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-widest mb-1">
              <Utensils className="w-4 h-4" />
              <span>Smart Canteen • Case Study</span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#242424] font-['Manrope']">
              Smart Canteen Meal Planner
            </h1>
            <p className="text-sm text-[#777872] mt-1">
              Select your favorite menu items, check automated volume discounts, and verify student budget affordability.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-semibold flex items-center gap-1.5">
              <Percent className="w-3.5 h-3.5" />
              <span>10% OFF on orders over ₹300</span>
            </span>
            <button
              onClick={resetAll}
              className="p-2 rounded-xl border border-[#eaeae6] bg-white text-[#777872] hover:text-[#242424] hover:bg-neutral-50 transition cursor-pointer"
              title="Reset planner"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Menu Selection (Left Column) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-[#eaeae6] shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#242424] font-['Manrope'] flex items-center gap-2">
                  <span>Available Food Items</span>
                  <span className="text-xs font-medium text-[#777872] bg-neutral-100 px-2.5 py-0.5 rounded-full">
                    {items.length} dishes
                  </span>
                </h2>
                <span className="text-xs text-[#777872]">
                  {selectedItemIds.size} selected ({totalItemCount} items)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {items.map(item => {
                  const isSelected = selectedItemIds.has(item.id);
                  const qty = quantities[item.id] || 1;

                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleItemSelection(item.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-600/30'
                          : 'border-[#eaeae6] bg-white hover:border-neutral-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <div className="font-bold text-sm text-[#242424]">
                              {item.name}
                            </div>
                            <div className="text-xs text-[#777872] flex items-center gap-2 mt-0.5">
                              <span>{item.category}</span>
                              <span>•</span>
                              <span className="flex items-center gap-0.5">
                                <Flame className="w-3 h-3 text-amber-500" />
                                {item.calories} kcal
                              </span>
                            </div>
                          </div>
                        </div>

                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => {}} // handled by parent div
                          className="w-4 h-4 rounded text-emerald-600 accent-emerald-600 cursor-pointer mt-1"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-neutral-100 mt-2">
                        <span className="text-base font-extrabold text-[#242424]">
                          {formatCurrency(item.price)}
                        </span>

                        {isSelected && (
                          <div
                            onClick={e => e.stopPropagation()}
                            className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-[#eaeae6] shadow-2xs"
                          >
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-5 h-5 flex items-center justify-center text-neutral-600 hover:text-black font-bold"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold w-4 text-center">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-5 h-5 flex items-center justify-center text-neutral-600 hover:text-black font-bold"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Assignment Budget Controls */}
            <div className="bg-white p-6 rounded-2xl border border-[#eaeae6] shadow-xs">
              <h2 className="text-lg font-bold text-[#242424] font-['Manrope'] mb-2 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-emerald-700" />
                <span>Enter Your Budget</span>
              </h2>
              <p className="text-xs text-[#777872] mb-4">
                Input your available spending allowance in Indian Rupees (₹) to verify meal affordability.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                <div className="relative flex-1">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-neutral-500">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="1"
                    value={budgetInput}
                    onChange={e => setBudgetInput(e.target.value)}
                    placeholder="Enter budget in rupees"
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-[#eaeae6] bg-[#fafaf8] text-base font-bold text-[#242424] focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition"
                  />
                </div>

                <button
                  onClick={handleCalculateBill}
                  className="px-6 py-3 rounded-xl bg-emerald-700 text-white font-bold text-sm hover:bg-emerald-800 transition shadow-sm cursor-pointer flex items-center justify-center gap-2"
                >
                  <Receipt className="w-4 h-4" />
                  <span>Calculate Bill</span>
                </button>
              </div>

              {/* Quick budget presets */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#eaeae6]">
                <span className="text-xs text-[#777872]">Presets:</span>
                {['100', '150', '250', '350', '500'].map(preset => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setBudgetInput(preset)}
                    className="text-xs px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-[#242424] font-semibold transition cursor-pointer"
                  >
                    ₹{preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bill & Affordability Breakdown (Right Column) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-[#eaeae6] shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#eaeae6]">
                <h3 className="font-bold text-base text-[#242424] font-['Manrope'] flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-emerald-700" />
                  <span>Order Summary</span>
                </h3>
                <span className="text-xs font-semibold text-neutral-500">
                  {totalItemCount} items selected
                </span>
              </div>

              {selectedItemIds.size === 0 ? (
                <div className="py-12 text-center text-[#777872]">
                  <ShoppingBag className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
                  <p className="font-semibold text-sm text-[#242424]">Your tray is empty</p>
                  <p className="text-xs mt-1">Select items from the menu to start planning your meal.</p>
                </div>
              ) : (
                <div className="py-4 space-y-3">
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {Array.from(selectedItemIds).map(id => {
                      const item = items.find(i => i.id === id);
                      if (!item) return null;
                      const qty = quantities[id] || 1;
                      const itemTotal = item.price * qty;

                      return (
                        <div key={id} className="flex items-center justify-between text-xs py-1.5 border-b border-neutral-100 last:border-0">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{item.icon}</span>
                            <div>
                              <span className="font-bold text-[#242424]">{item.name}</span>
                              <span className="text-neutral-500 ml-1">× {qty}</span>
                            </div>
                          </div>
                          <span className="font-mono font-bold text-[#242424]">
                            {formatCurrency(itemTotal)}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-3 border-t border-[#eaeae6] space-y-2 text-xs">
                    <div className="flex items-center justify-between text-neutral-600">
                      <span>Total Bill (Raw Subtotal)</span>
                      <span className="font-semibold font-mono">{formatCurrency(rawSubtotal)}</span>
                    </div>

                    {rawSubtotal > 300 ? (
                      <div className="flex items-center justify-between text-emerald-700 font-semibold bg-emerald-50 px-2 py-1 rounded-md">
                        <span className="flex items-center gap-1">
                          <Percent className="w-3.5 h-3.5" /> Special Canteen Discount (10%)
                        </span>
                        <span className="font-mono">-{formatCurrency(rawSubtotal * 0.10)}</span>
                      </div>
                    ) : (
                      <div className="text-[11px] text-neutral-500 bg-neutral-50 p-2 rounded-md">
                        💡 Tip: Add items worth {formatCurrency(301 - rawSubtotal)} more to unlock <strong>10% instant discount</strong>!
                      </div>
                    )}

                    <div className="flex items-center justify-between text-base font-extrabold text-[#242424] pt-2 border-t border-[#eaeae6]">
                      <span>Final Bill</span>
                      <span className="text-emerald-800 font-mono">
                        {formatCurrency(rawSubtotal > 300 ? rawSubtotal * 0.90 : rawSubtotal)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-neutral-500 pt-1">
                      <span>Entered Budget</span>
                      <span className="font-bold font-mono text-[#242424]">
                        {formatCurrency(Number(budgetInput) || 0)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Assignment Affordability Output Box */}
              {calculatedSummary && (
                <div className="mt-4 pt-4 border-t border-[#eaeae6]">
                  {calculatedSummary.error ? (
                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                      <span>{calculatedSummary.error}</span>
                    </div>
                  ) : calculatedSummary.canAfford ? (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 animate-in fade-in">
                      <div className="flex items-center gap-2 text-sm font-extrabold text-emerald-800 mb-1">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                        <span>You can afford this meal!</span>
                      </div>
                      <p className="text-xs text-emerald-800/90 leading-relaxed">
                        Your budget of <strong>{formatCurrency(calculatedSummary.budget)}</strong> easily covers the final bill of <strong>{formatCurrency(calculatedSummary.finalBill)}</strong>.
                        Remaining change: <strong>{formatCurrency(calculatedSummary.budget - calculatedSummary.finalBill)}</strong>.
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 animate-in fade-in">
                      <div className="flex items-center gap-2 text-sm font-extrabold text-amber-800 mb-1">
                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                        <span>Insufficient Budget!</span>
                      </div>
                      <p className="text-xs text-amber-800/90 leading-relaxed">
                        The final bill is <strong>{formatCurrency(calculatedSummary.finalBill)}</strong>, but your entered budget is <strong>{formatCurrency(calculatedSummary.budget)}</strong>.
                        You need an extra <strong>{formatCurrency(calculatedSummary.finalBill - calculatedSummary.budget)}</strong> or you can remove an item to fit within your budget.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Case Study Details Info */}
            <div className="bg-[#fafaf8] p-5 rounded-2xl border border-[#eaeae6] text-xs text-[#777872] space-y-2">
              <div className="font-bold text-[#242424] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>Case Study Specification</span>
              </div>
              <p>
                This module implements the complete logic from the student case study: item collection verification, dynamic budget matching, 10% volume discount on totals exceeding ₹300, and conditional affordability output.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
