import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Employee } from '../../types';
import { INITIAL_EMPLOYEES } from '../../data/initialData';
import { formatCurrency, formatCompactCurrency, getInitials } from '../../utils/formatters';
import Chart from 'chart.js/auto';
import { 
  Users, 
  TrendingUp, 
  Clock, 
  IndianRupee, 
  Search, 
  Plus, 
  RotateCcw, 
  Download, 
  Trash2, 
  Edit3, 
  X, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Briefcase,
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

const STORAGE_KEY = 'peoplepulse_employees_v1';

export const PeoplePulseDashboard: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved employees', e);
      }
    }
    return INITIAL_EMPLOYEES;
  });

  const [activeSection, setActiveSection] = useState<'overview' | 'employees' | 'intelligence'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'id' | 'name' | 'salary-desc' | 'salary-asc' | 'age'>('id');
  const [selectedDept, setSelectedDept] = useState<string>('All');

  // Modals state
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [detailsEmployee, setDetailsEmployee] = useState<Employee | null>(null);

  // Form fields
  const [formName, setFormName] = useState('');
  const [formAge, setFormAge] = useState<number | ''>('');
  const [formSalary, setFormSalary] = useState<number | ''>('');
  const [formDept, setFormDept] = useState('Engineering');
  const [formTitle, setFormTitle] = useState('Associate Specialist');
  const [formError, setFormError] = useState('');

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [apiState, setApiState] = useState<'online' | 'connecting'>('online');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Chart ref
  const chartCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  }, [employees]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Departments list
  const departments = useMemo(() => {
    const set = new Set<string>();
    employees.forEach(e => {
      if (e.employee_department) set.add(e.employee_department);
    });
    return ['All', ...Array.from(set)];
  }, [employees]);

  // Statistics calculation
  const stats = useMemo(() => {
    const count = employees.length;
    const totalSalary = employees.reduce((acc, curr) => acc + curr.employee_salary, 0);
    const totalAge = employees.reduce((acc, curr) => acc + curr.employee_age, 0);
    const averageSalary = count ? Math.round(totalSalary / count) : 0;
    const averageAge = count ? Number((totalAge / count).toFixed(1)) : 0;
    const highestSalary = count ? Math.max(...employees.map(e => e.employee_salary)) : 0;
    const lowestSalary = count ? Math.min(...employees.map(e => e.employee_salary)) : 0;

    return {
      count,
      averageSalary,
      averageAge,
      highestSalary,
      lowestSalary,
      salarySpread: highestSalary - lowestSalary
    };
  }, [employees]);

  // Chart rendering using Chart.js
  useEffect(() => {
    if (!chartCanvasRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }

    if (employees.length === 0) return;

    const salaries = employees.map(e => e.employee_salary);
    const maxSalary = Math.max(...salaries, 1);

    const ranges = [
      { label: '0–25%', min: 0, max: maxSalary * 0.25 },
      { label: '25–50%', min: maxSalary * 0.25, max: maxSalary * 0.50 },
      { label: '50–75%', min: maxSalary * 0.50, max: maxSalary * 0.75 },
      { label: '75–100%', min: maxSalary * 0.75, max: maxSalary }
    ];

    const counts = ranges.map((range, idx) => {
      return salaries.filter(salary => {
        if (idx === ranges.length - 1) {
          return salary >= range.min && salary <= range.max;
        }
        return salary >= range.min && salary < range.max;
      }).length;
    });

    const ctx = chartCanvasRef.current.getContext('2d');
    if (!ctx) return;

    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ranges.map(r => r.label),
        datasets: [{
          label: 'Employees in Bracket',
          data: counts,
          backgroundColor: '#477a60',
          hoverBackgroundColor: '#345e49',
          borderRadius: 8,
          maxBarThickness: 55
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#242424',
            titleFont: { size: 12, weight: 'bold' },
            bodyFont: { size: 13 },
            padding: 10,
            cornerRadius: 8,
            callbacks: {
              title: (items) => `Salary Range: ${items[0].label}`,
              label: (context) => `Employees: ${context.parsed.y} people`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: '#777872',
              font: { family: 'DM Sans', size: 12 }
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0,
              color: '#777872',
              font: { family: 'DM Sans', size: 11 }
            },
            grid: {
              color: '#eaeae6'
            }
          }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [employees]);

  // Filtered and sorted employees
  const filteredEmployees = useMemo(() => {
    let result = employees.filter(e => {
      const matchSearch = 
        e.employee_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(e.id).includes(searchQuery) ||
        (e.employee_title && e.employee_title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (e.employee_department && e.employee_department.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchDept = selectedDept === 'All' || e.employee_department === selectedDept;

      return matchSearch && matchDept;
    });

    switch (sortOption) {
      case 'name':
        result.sort((a, b) => a.employee_name.localeCompare(b.employee_name));
        break;
      case 'salary-desc':
        result.sort((a, b) => b.employee_salary - a.employee_salary);
        break;
      case 'salary-asc':
        result.sort((a, b) => a.employee_salary - b.employee_salary);
        break;
      case 'age':
        result.sort((a, b) => a.employee_age - b.employee_age);
        break;
      case 'id':
      default:
        result.sort((a, b) => Number(a.id) - Number(b.id));
        break;
    }

    return result;
  }, [employees, searchQuery, sortOption, selectedDept]);

  // Refresh handler: attempts to fetch live users from DummyJSON and enhances them
  const handleRefresh = async () => {
    setIsRefreshing(true);
    setApiState('connecting');
    try {
      const response = await fetch('https://dummyjson.com/users?limit=15');
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.users)) {
          const remoteEmployees: Employee[] = data.users.map((u: any) => ({
            id: u.id,
            employee_name: `${u.firstName} ${u.lastName}`.trim(),
            employee_age: u.age,
            employee_salary: 32000 + (u.id * 2700),
            employee_department: u.company?.department || 'Operations',
            employee_title: u.company?.title || 'Professional Specialist',
            email: u.email,
            phone: u.phone,
            location: `${u.address?.city || 'Bangalore'}, India`
          }));
          setEmployees(remoteEmployees);
          showToast(`Synced ${remoteEmployees.length} employees from DummyJSON API!`);
        }
      } else {
        throw new Error('API status not ok');
      }
    } catch (err) {
      console.warn('DummyJSON sync failed or offline, kept current state.', err);
      showToast('API refresh simulated: using local workforce dataset');
    } finally {
      setIsRefreshing(false);
      setApiState('online');
    }
  };

  const resetDefaultData = () => {
    setEmployees(INITIAL_EMPLOYEES);
    showToast('Reset workforce records to original baseline.');
  };

  const exportCSV = () => {
    const headers = ['ID', 'Full Name', 'Age', 'Salary (INR)', 'Department', 'Job Title', 'Email'];
    const rows = employees.map(e => [
      e.id,
      `"${e.employee_name}"`,
      e.employee_age,
      e.employee_salary,
      `"${e.employee_department || ''}"`,
      `"${e.employee_title || ''}"`,
      `"${e.email || ''}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `peoplepulse_workforce_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported dataset to CSV file');
  };

  const handleOpenAddModal = () => {
    setEditingEmployee(null);
    setFormName('');
    setFormAge('');
    setFormSalary('');
    setFormDept('Engineering');
    setFormTitle('Software Engineer');
    setFormError('');
    setIsAddEditModalOpen(true);
  };

  const handleOpenEditModal = (emp: Employee) => {
    setEditingEmployee(emp);
    setFormName(emp.employee_name);
    setFormAge(emp.employee_age);
    setFormSalary(emp.employee_salary);
    setFormDept(emp.employee_department || 'Engineering');
    setFormTitle(emp.employee_title || 'Specialist');
    setFormError('');
    setIsAddEditModalOpen(true);
    setDetailsEmployee(null);
  };

  const handleSaveEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || formName.trim().length < 2) {
      setFormError('Please enter a valid full name (at least 2 letters).');
      return;
    }
    const ageNum = Number(formAge);
    if (!ageNum || ageNum < 18 || ageNum > 100) {
      setFormError('Please enter an age between 18 and 100.');
      return;
    }
    const salaryNum = Number(formSalary);
    if (isNaN(salaryNum) || salaryNum < 0) {
      setFormError('Please enter a valid non-negative salary.');
      return;
    }

    if (editingEmployee) {
      setEmployees(prev => prev.map(item => {
        if (item.id === editingEmployee.id) {
          return {
            ...item,
            employee_name: formName.trim(),
            employee_age: ageNum,
            employee_salary: salaryNum,
            employee_department: formDept,
            employee_title: formTitle
          };
        }
        return item;
      }));
      showToast(`Updated employee #${editingEmployee.id} successfully!`);
    } else {
      const newId = employees.length > 0 ? Math.max(...employees.map(e => Number(e.id) || 0)) + 1 : 1;
      const newEmp: Employee = {
        id: newId,
        employee_name: formName.trim(),
        employee_age: ageNum,
        employee_salary: salaryNum,
        employee_department: formDept,
        employee_title: formTitle,
        email: `${formName.toLowerCase().replace(/\s+/g, '.')}@peoplepulse.io`
      };
      setEmployees(prev => [newEmp, ...prev]);
      showToast(`Created new employee #${newId} (${newEmp.employee_name})!`);
    }

    setIsAddEditModalOpen(false);
  };

  const handleDeleteEmployee = (emp: Employee) => {
    if (window.confirm(`Are you sure you want to delete ${emp.employee_name} (#${emp.id})?`)) {
      setEmployees(prev => prev.filter(item => item.id !== emp.id));
      setDetailsEmployee(null);
      showToast(`Deleted employee record #${emp.id}.`);
    }
  };

  const todayString = new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date());

  return (
    <div className="min-h-screen bg-[#fafaf8] text-[#242424] font-['DM_Sans',sans-serif] flex flex-col md:flex-row">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#242424] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-neutral-700 animate-bounce duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#347a56] text-white p-6 flex flex-col shrink-0 border-r border-emerald-800/40">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 bg-[#242424] text-white flex items-center justify-center rounded-xl font-extrabold text-xl font-['Manrope'] shadow-md">
            p.
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight font-['Manrope']">peoplepulse</span>
            <span className="block text-[11px] text-emerald-200 uppercase tracking-widest font-semibold">
              Workforce Intelligence
            </span>
          </div>
        </div>

        <div className="text-[11px] font-bold text-emerald-200 tracking-wider mb-3 px-3 uppercase">
          WORKSPACE
        </div>

        <nav className="space-y-1.5 mb-8">
          <button
            onClick={() => setActiveSection('overview')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeSection === 'overview'
                ? 'bg-white text-[#242424] shadow-sm'
                : 'text-emerald-100 hover:bg-emerald-700/60'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Overview & Analytics</span>
          </button>

          <button
            onClick={() => setActiveSection('employees')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeSection === 'employees'
                ? 'bg-white text-[#242424] shadow-sm'
                : 'text-emerald-100 hover:bg-emerald-700/60'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Employee Directory</span>
            <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-emerald-800 text-emerald-200 font-bold">
              {employees.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSection('intelligence')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeSection === 'intelligence'
                ? 'bg-white text-[#242424] shadow-sm'
                : 'text-emerald-100 hover:bg-emerald-700/60'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Smart Intelligence</span>
          </button>
        </nav>

        {/* Sidebar bottom */}
        <div className="mt-auto space-y-3 pt-4 border-t border-emerald-700/60">
          <div className="bg-white text-[#242424] p-3 rounded-xl flex items-center gap-3 shadow-sm">
            <span className={`w-2.5 h-2.5 rounded-full ${apiState === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <div>
              <div className="text-xs font-bold leading-tight flex items-center gap-1.5">
                <span>{apiState === 'online' ? 'Connected' : 'Connecting'}</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-medium">Live</span>
              </div>
              <div className="text-[11px] text-neutral-500">Employee data API</div>
            </div>
          </div>

          <div className="bg-emerald-900/40 p-3 rounded-xl flex items-center gap-3 border border-emerald-700/30">
            <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center text-xs font-bold text-white shadow-inner">
              PP
            </div>
            <div>
              <div className="text-xs font-bold text-white">Workspace Administrator</div>
              <div className="text-[10px] text-emerald-200">Full Access Manager</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {/* Topbar */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#eaeae6]">
          <div className="flex items-center gap-2 text-sm text-[#777872]">
            <span>Workspace</span>
            <span>/</span>
            <span className="text-[#242424] font-semibold capitalize">{activeSection}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-xs font-medium text-[#777872] bg-white px-3 py-1.5 rounded-lg border border-[#eaeae6] shadow-2xs">
              {todayString}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 rounded-lg bg-white border border-[#eaeae6] text-[#242424] hover:bg-neutral-50 transition shadow-2xs cursor-pointer disabled:opacity-50"
                title="Refresh from API"
              >
                <RotateCcw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-emerald-600' : ''}`} />
              </button>

              <button
                onClick={exportCSV}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-white border border-[#eaeae6] text-[#242424] hover:bg-neutral-50 transition shadow-2xs cursor-pointer"
                title="Export CSV"
              >
                <Download className="w-3.5 h-3.5 text-emerald-700" />
                <span className="hidden sm:inline">Export</span>
              </button>

              <button
                onClick={handleOpenAddModal}
                className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg bg-[#347a56] text-white hover:bg-[#2c6748] transition shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Employee</span>
              </button>
            </div>
          </div>
        </header>

        {/* Section Heading */}
        <div className="mt-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold tracking-widest text-[#777872] uppercase mb-1">
              WORKFORCE OVERVIEW
            </p>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#242424] font-['Manrope']">
              A clearer view of your people.
            </h1>
            <p className="text-sm text-[#777872] mt-1">
              Your workforce, organized into meaningful compensation, demographic, and operational insights.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetDefaultData}
              className="text-xs text-[#777872] hover:text-[#242424] underline underline-offset-4 cursor-pointer"
            >
              Reset sample data
            </button>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Card 1: Total Employees */}
          <article className="bg-white p-5 rounded-2xl border border-[#eaeae6] shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#777872] font-semibold mb-2">
              <span>Total employees</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <h2 className="text-3xl font-extrabold text-[#242424] font-['Manrope']">
              {stats.count.toLocaleString()}
            </h2>
            <p className="text-xs text-[#777872] mt-1">Active verified records</p>
          </article>

          {/* Card 2: Average Salary */}
          <article className="bg-white p-5 rounded-2xl border border-[#eaeae6] shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#777872] font-semibold mb-2">
              <span>Average salary</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <IndianRupee className="w-4 h-4" />
              </div>
            </div>
            <h2 className="text-3xl font-extrabold text-[#242424] font-['Manrope']">
              {formatCompactCurrency(stats.averageSalary)}
            </h2>
            <p className="text-xs text-[#777872] mt-1">Across available records ({formatCurrency(stats.averageSalary)})</p>
          </article>

          {/* Card 3: Average Age */}
          <article className="bg-white p-5 rounded-2xl border border-[#eaeae6] shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#777872] font-semibold mb-2">
              <span>Average age</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <h2 className="text-3xl font-extrabold text-[#242424] font-['Manrope']">
              {stats.count ? `${stats.averageAge} yrs` : '—'}
            </h2>
            <p className="text-xs text-[#777872] mt-1">Workforce demographic index</p>
          </article>

          {/* Card 4: Highest Salary */}
          <article className="bg-white p-5 rounded-2xl border border-[#eaeae6] shadow-xs">
            <div className="flex items-center justify-between text-xs text-[#777872] font-semibold mb-2">
              <span>Highest salary</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <h2 className="text-3xl font-extrabold text-[#242424] font-['Manrope']">
              {formatCompactCurrency(stats.highestSalary)}
            </h2>
            <p className="text-xs text-[#777872] mt-1">Peak recorded value ({formatCurrency(stats.highestSalary)})</p>
          </article>
        </div>

        {/* Section Grid: Salary Chart & Intelligence */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Salary Distribution Chart */}
          <article className="lg:col-span-2 bg-white p-6 rounded-2xl border border-[#eaeae6] shadow-xs flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-[#242424] font-['Manrope']">
                  Salary distribution
                </h3>
                <p className="text-xs text-[#777872]">
                  How employee salaries are distributed across percentage tiers of the maximum compensation
                </p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-100">
                ANALYTICS
              </span>
            </div>

            <div className="h-64 w-full relative">
              <canvas ref={chartCanvasRef}></canvas>
            </div>

            <div className="mt-4 pt-3 border-t border-[#eaeae6] flex items-center justify-between text-xs text-[#777872]">
              <span>Lowest: {formatCurrency(stats.lowestSalary)}</span>
              <span>Salary Spread: {formatCurrency(stats.salarySpread)}</span>
              <span>Highest: {formatCurrency(stats.highestSalary)}</span>
            </div>
          </article>

          {/* PeoplePulse Intelligence */}
          <article className="bg-white p-6 rounded-2xl border border-[#eaeae6] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-[10px] font-bold text-emerald-700 tracking-wider uppercase">
                    PEOPLEPULSE INTELLIGENCE
                  </p>
                  <h3 className="font-bold text-base text-[#242424] font-['Manrope']">
                    Workforce insights
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
                  ✳
                </div>
              </div>
              <p className="text-xs text-[#777872] mb-4">
                Automated observations generated from live workforce metrics.
              </p>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-[#fafaf8] border border-[#eaeae6]">
                  <h4 className="text-xs font-bold text-[#242424]">Workforce Size</h4>
                  <p className="text-xs text-[#777872] mt-0.5">
                    Dataset contains {stats.count} active employee profiles across {departments.length - 1} functional teams.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#fafaf8] border border-[#eaeae6]">
                  <h4 className="text-xs font-bold text-[#242424]">Compensation Health</h4>
                  <p className="text-xs text-[#777872] mt-0.5">
                    Average compensation is {formatCurrency(stats.averageSalary)} with a top-to-bottom differential of {formatCurrency(stats.salarySpread)}.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#fafaf8] border border-[#eaeae6]">
                  <h4 className="text-xs font-bold text-[#242424]">Demographic Maturity</h4>
                  <p className="text-xs text-[#777872] mt-0.5">
                    Mean age of {stats.averageAge} years indicates a high-velocity, experienced workforce blend.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#eaeae6] flex items-center justify-between text-xs text-emerald-800 font-semibold">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Real-time Audit
              </span>
              <span>Updated just now</span>
            </div>
          </article>
        </div>

        {/* Employee Directory Section */}
        <section id="directory" className="bg-white rounded-2xl border border-[#eaeae6] shadow-xs p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-[10px] font-bold text-[#777872] tracking-wider uppercase">DIRECTORY</p>
              <h2 className="text-xl font-bold text-[#242424] font-['Manrope']">
                People, at a glance.
              </h2>
              <p className="text-xs text-[#777872]">
                Explore, inspect, search, and manage verified workforce records.
              </p>
            </div>

            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 self-start md:self-auto">
              {filteredEmployees.length} of {employees.length} records
            </span>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 mb-6">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#777872] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by name, ID, title, or department..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#eaeae6] bg-[#fafaf8] text-sm focus:outline-none focus:ring-2 focus:ring-[#347a56] focus:bg-white transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Department filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
              {departments.map(dept => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`text-xs px-3 py-2 rounded-xl font-semibold transition whitespace-nowrap cursor-pointer ${
                    selectedDept === dept
                      ? 'bg-[#347a56] text-white shadow-2xs'
                      : 'bg-[#fafaf8] text-[#777872] hover:bg-neutral-100 border border-[#eaeae6]'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* Sort Select */}
            <div className="w-full lg:w-56 shrink-0">
              <select
                value={sortOption}
                onChange={e => setSortOption(e.target.value as any)}
                className="w-full py-2.5 px-3 rounded-xl border border-[#eaeae6] bg-[#fafaf8] text-xs font-semibold text-[#242424] focus:outline-none focus:ring-2 focus:ring-[#347a56]"
              >
                <option value="id">Sort: Employee ID</option>
                <option value="name">Sort: Full Name</option>
                <option value="salary-desc">Sort: Salary (High to Low)</option>
                <option value="salary-asc">Sort: Salary (Low to High)</option>
                <option value="age">Sort: Age</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-[#eaeae6]">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#f8f8f6] text-[11px] font-bold text-[#777872] uppercase tracking-wider border-b border-[#eaeae6]">
                  <th className="py-3 px-4">EMPLOYEE</th>
                  <th className="py-3 px-4">EMPLOYEE ID</th>
                  <th className="py-3 px-4">DEPARTMENT</th>
                  <th className="py-3 px-4">AGE</th>
                  <th className="py-3 px-4">SALARY</th>
                  <th className="py-3 px-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eaeae6]">
                {filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#777872]">
                      <AlertCircle className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                      <p className="font-semibold text-base text-[#242424]">No matching employees found</p>
                      <p className="text-xs mt-1">Try refining your search terms or filter criteria.</p>
                      {searchQuery && (
                        <button
                          onClick={() => { setSearchQuery(''); setSelectedDept('All'); }}
                          className="mt-3 text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                        >
                          Clear search filters
                        </button>
                      )}
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map((emp) => (
                    <tr
                      key={emp.id}
                      className="hover:bg-[#fafaf8] transition duration-150 group"
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 font-extrabold text-xs flex items-center justify-center border border-emerald-100 shadow-2xs">
                            {getInitials(emp.employee_name)}
                          </div>
                          <div>
                            <div className="font-bold text-sm text-[#242424]">
                              {emp.employee_name}
                            </div>
                            <div className="text-xs text-[#777872]">
                              {emp.employee_title || 'Workforce Specialist'}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                          #{emp.id}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-xs font-medium text-[#777872]">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#f3f3ef] text-[#242424]">
                          <Briefcase className="w-3 h-3 text-emerald-700" />
                          {emp.employee_department || 'General'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-xs text-[#242424] font-medium">
                        {emp.employee_age > 0 ? `${emp.employee_age} yrs` : '—'}
                      </td>

                      <td className="py-3.5 px-4 text-xs font-bold text-emerald-800">
                        {formatCurrency(emp.employee_salary)}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setDetailsEmployee(emp)}
                          className="px-3 py-1.5 rounded-lg border border-[#eaeae6] bg-white text-xs font-semibold text-[#242424] hover:bg-[#347a56] hover:text-white hover:border-[#347a56] transition shadow-2xs cursor-pointer inline-flex items-center gap-1"
                        >
                          <span>View details</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#777872] mt-4 pt-3 border-t border-[#eaeae6] gap-2">
            <span>
              Showing {filteredEmployees.length} of {employees.length} records in dataset
            </span>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>All records synced locally and persisted in browser storage.</span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#777872] pt-6 pb-12 border-t border-[#eaeae6]">
          <span>PeoplePulse © 2026 — Workforce Intelligence Platform</span>
          <span>Engineered for complete workforce visibility & precision.</span>
        </footer>
      </main>

      {/* Employee Details Modal */}
      {detailsEmployee && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#eaeae6] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between pb-4 border-b border-[#eaeae6]">
              <div>
                <p className="text-[10px] font-bold text-emerald-700 tracking-wider uppercase">
                  EMPLOYEE PROFILE
                </p>
                <h2 className="text-xl font-bold text-[#242424] font-['Manrope']">
                  Employee Overview
                </h2>
              </div>
              <button
                onClick={() => setDetailsEmployee(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white font-extrabold text-lg flex items-center justify-center shadow-md">
                  {getInitials(detailsEmployee.employee_name)}
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-[#242424]">
                    {detailsEmployee.employee_name}
                  </h3>
                  <p className="text-xs text-[#777872]">
                    {detailsEmployee.employee_title} • #{detailsEmployee.id}
                  </p>
                  <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                    {detailsEmployee.employee_department}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#fafaf8] border border-[#eaeae6]">
                  <span className="text-[#777872] block">Age</span>
                  <span className="font-bold text-sm text-[#242424]">
                    {detailsEmployee.employee_age} years old
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#fafaf8] border border-[#eaeae6]">
                  <span className="text-[#777872] block">Compensation</span>
                  <span className="font-bold text-sm text-emerald-800">
                    {formatCurrency(detailsEmployee.employee_salary)}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#fafaf8] border border-[#eaeae6] col-span-2">
                  <span className="text-[#777872] block">Contact Email</span>
                  <span className="font-mono text-xs text-[#242424]">
                    {detailsEmployee.email || `${detailsEmployee.employee_name.toLowerCase().replace(/\s+/g, '.')}@peoplepulse.io`}
                  </span>
                </div>
              </div>

              {/* Statistical compensation comparison */}
              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs">
                <div className="font-bold text-emerald-950 flex items-center gap-1.5 mb-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Compensation Analysis</span>
                </div>
                <p className="text-emerald-900 leading-relaxed">
                  {detailsEmployee.employee_salary > stats.averageSalary ? (
                    <>
                      This recorded salary is <strong className="text-emerald-700">{formatCurrency(detailsEmployee.employee_salary - stats.averageSalary)}</strong> above the dataset average ({formatCurrency(stats.averageSalary)}).
                    </>
                  ) : detailsEmployee.employee_salary < stats.averageSalary ? (
                    <>
                      This recorded salary is <strong className="text-amber-700">{formatCurrency(stats.averageSalary - detailsEmployee.employee_salary)}</strong> below the dataset average ({formatCurrency(stats.averageSalary)}).
                    </>
                  ) : (
                    <>This recorded salary equals the dataset average exactly.</>
                  )}
                </p>
                <span className="text-[10px] text-emerald-800/80 block mt-2">
                  *Statistical comparison benchmarked against all verified company records.
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#eaeae6]">
              <button
                onClick={() => handleDeleteEmployee(detailsEmployee)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Record</span>
              </button>

              <button
                onClick={() => handleOpenEditModal(detailsEmployee)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#347a56] text-white hover:bg-[#2a6346] transition shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Employee</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Employee Modal */}
      {isAddEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#eaeae6] animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between pb-4 border-b border-[#eaeae6]">
              <div>
                <p className="text-[10px] font-bold text-emerald-700 tracking-wider uppercase">
                  EMPLOYEE RECORD
                </p>
                <h2 className="text-xl font-bold text-[#242424] font-['Manrope']">
                  {editingEmployee ? 'Edit employee' : 'Add employee'}
                </h2>
              </div>
              <button
                onClick={() => setIsAddEditModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEmployee} className="py-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#242424] mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  placeholder="e.g. Yashraj Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#eaeae6] bg-[#fafaf8] text-sm focus:outline-none focus:ring-2 focus:ring-[#347a56] focus:bg-white transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#242424] mb-1">
                    Age <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="18"
                    max="100"
                    required
                    value={formAge}
                    onChange={e => setFormAge(e.target.value ? Number(e.target.value) : '')}
                    placeholder="18 – 100"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#eaeae6] bg-[#fafaf8] text-sm focus:outline-none focus:ring-2 focus:ring-[#347a56] focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#242424] mb-1">
                    Salary (INR ₹) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formSalary}
                    onChange={e => setFormSalary(e.target.value ? Number(e.target.value) : '')}
                    placeholder="e.g. 45000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#eaeae6] bg-[#fafaf8] text-sm focus:outline-none focus:ring-2 focus:ring-[#347a56] focus:bg-white transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#242424] mb-1">
                    Department
                  </label>
                  <select
                    value={formDept}
                    onChange={e => setFormDept(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#eaeae6] bg-[#fafaf8] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#347a56] focus:bg-white transition"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Product">Product</option>
                    <option value="Design">Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                    <option value="People Operations">People Operations</option>
                    <option value="Customer Success">Customer Success</option>
                    <option value="Executive">Executive</option>
                    <option value="Data & AI">Data & AI</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#242424] mb-1">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={e => setFormTitle(e.target.value)}
                    placeholder="e.g. Software Engineer"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#eaeae6] bg-[#fafaf8] text-sm focus:outline-none focus:ring-2 focus:ring-[#347a56] focus:bg-white transition"
                  />
                </div>
              </div>

              {formError && (
                <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-medium border border-rose-100 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#eaeae6]">
                <button
                  type="button"
                  onClick={() => setIsAddEditModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-neutral-600 hover:bg-neutral-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#347a56] text-white hover:bg-[#2c6748] transition shadow-sm cursor-pointer"
                >
                  {editingEmployee ? 'Update employee' : 'Save employee'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
