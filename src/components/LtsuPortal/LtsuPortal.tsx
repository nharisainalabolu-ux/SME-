import React, { useState } from 'react';
import { 
  GraduationCap, 
  LogIn, 
  UserPlus, 
  Calculator, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Award, 
  Printer, 
  ShieldCheck,
  Eye,
  EyeOff
} from 'lucide-react';

export const LtsuPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup' | 'calculator'>('login');

  // Login form state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirm, setSignupConfirm] = useState('');
  const [signupError, setSignupError] = useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = useState<string | null>(null);
  const [highContrastMode, setHighContrastMode] = useState<boolean>(false);

  // Student Grade Calculator state
  const [studentName, setStudentName] = useState('Yashraj Sharma');
  const [studentRoll, setStudentRoll] = useState('LTSU2026-CS104');
  const [marks, setMarks] = useState<{ [key: string]: number | '' }>({
    m1: 88,
    m2: 92,
    m3: 79,
    m4: 85,
    m5: 90
  });
  const [gradeResult, setGradeResult] = useState<{
    total: number;
    percentage: number;
    grade: string;
    status: 'Pass' | 'Fail';
    gpa: number;
    division: string;
  } | null>(null);

  // Auto-uppercase transform as requested in assignment
  const handleNameChange = (val: string) => {
    setSignupName(val.toUpperCase());
  };

  const handleUsernameChange = (val: string) => {
    setSignupUsername(val.toUpperCase());
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginUsername || !loginPassword) {
      setLoginMessage({ type: 'error', text: 'Please fill in both username and password.' });
      return;
    }
    setLoginMessage({ 
      type: 'success', 
      text: `Welcome back, ${loginUsername}! Successfully authenticated into the LTSU Portal.` 
    });
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError(null);
    setSignupSuccess(null);

    // Exact validations from student script:
    if (!signupName || !signupUsername || !signupEmail || !signupPassword || !signupConfirm) {
      setSignupError('All fields must be filled out');
      return;
    }

    if (signupName.length < 3) {
      setSignupError('Name should be more than 2 letters');
      return;
    }

    if (signupUsername.length < 5) {
      setSignupError('Username should be more than 5 letters');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(signupEmail)) {
      setSignupError('Please enter a valid university email address');
      return;
    }

    if (signupPassword.length < 6 || signupConfirm.length < 6) {
      setSignupError('Password should be at least 6 characters');
      return;
    }

    if (signupPassword !== signupConfirm) {
      setSignupError('Passwords do not match');
      return;
    }

    setSignupSuccess(`Account created successfully for ${signupName} (${signupUsername})! You can now log in.`);
  };

  const handleCalculateGrade = (e: React.FormEvent) => {
    e.preventDefault();
    const mValues = [marks.m1, marks.m2, marks.m3, marks.m4, marks.m5].map(v => Number(v) || 0);

    const total = mValues.reduce((a, b) => a + b, 0);
    const percentage = Number((total / 5).toFixed(2));

    let grade = 'F';
    let status: 'Pass' | 'Fail' = 'Pass';
    let gpa = 0;
    let division = 'Fail';

    if (percentage >= 90) {
      grade = 'A+ (Outstanding)';
      gpa = 10.0;
      division = 'First Division with Distinction';
    } else if (percentage >= 80) {
      grade = 'A (Excellent)';
      gpa = 9.0;
      division = 'First Division';
    } else if (percentage >= 70) {
      grade = 'B+ (Very Good)';
      gpa = 8.0;
      division = 'First Division';
    } else if (percentage >= 60) {
      grade = 'B (Good)';
      gpa = 7.0;
      division = 'First Division';
    } else if (percentage >= 50) {
      grade = 'C (Average)';
      gpa = 6.0;
      division = 'Second Division';
    } else if (percentage >= 40) {
      grade = 'D (Pass)';
      gpa = 5.0;
      division = 'Third Division';
    } else {
      grade = 'F (Fail)';
      status = 'Fail';
      gpa = 0.0;
      division = 'Needs Improvement';
    }

    setGradeResult({
      total,
      percentage,
      grade,
      status,
      gpa,
      division
    });
  };

  return (
    <div className="min-h-screen bg-[#fafaf8] py-8 px-4 sm:px-6 lg:px-8 font-['DM_Sans',sans-serif]">
      <div className="max-w-5xl mx-auto">
        {/* University Header with real logo asset */}
        <div className="bg-white p-6 rounded-2xl border border-[#eaeae6] shadow-xs mb-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border border-neutral-200 shrink-0 bg-white p-1 flex items-center justify-center shadow-sm">
            <img
              src="/imgs/ltsu_logo.jpg"
              alt="Lamrin Tech Skills University"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-100">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official Academic Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#242424] font-['Manrope']">
              Lamrin Tech Skills University (LTSU)
            </h1>
            <p className="text-sm text-[#777872] mt-1">
              Punjab, India • School of Computer Science & Engineering Academic Management Portal
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex bg-[#f3f3ef] p-1 rounded-xl self-stretch md:self-auto">
            <button
              onClick={() => setActiveTab('login')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'login'
                  ? 'bg-white text-[#242424] shadow-xs'
                  : 'text-[#777872] hover:text-[#242424]'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>

            <button
              onClick={() => setActiveTab('signup')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'signup'
                  ? 'bg-white text-[#242424] shadow-xs'
                  : 'text-[#777872] hover:text-[#242424]'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Sign Up</span>
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'calculator'
                  ? 'bg-white text-[#242424] shadow-xs'
                  : 'text-[#777872] hover:text-[#242424]'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Grade Calculator</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Login */}
        {activeTab === 'login' && (
          <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-[#eaeae6] shadow-sm animate-in fade-in duration-200">
            <div className="text-center mb-6">
              <h2 className="text-xl font-extrabold text-[#242424] font-['Manrope']">
                Student & Faculty Login
              </h2>
              <p className="text-xs text-[#777872] mt-1">
                Enter your credentials to access university resources
              </p>
            </div>

            {loginMessage && (
              <div
                className={`p-4 rounded-xl text-xs font-semibold mb-4 border flex items-center gap-2 ${
                  loginMessage.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border-rose-200'
                }`}
              >
                {loginMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                )}
                <span>{loginMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#242424] mb-1">
                  Username or Student ID
                </label>
                <input
                  type="text"
                  required
                  value={loginUsername}
                  onChange={e => setLoginUsername(e.target.value)}
                  placeholder="e.g. YASHRAJ or LTSU2026"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#eaeae6] bg-[#fafaf8] text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-[#242424]">
                    Password
                  </label>
                  <a
                    href="https://google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-semibold text-emerald-700 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  placeholder="Enter your secret password"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#eaeae6] bg-[#fafaf8] text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#347a56] hover:bg-[#2b6547] text-white font-bold text-sm transition shadow-sm cursor-pointer mt-2"
              >
                Login to Portal
              </button>

              <div className="text-center pt-3 border-t border-[#eaeae6]">
                <p className="text-xs text-[#777872]">
                  New to Lamrin Tech Skills University?{' '}
                  <button
                    type="button"
                    onClick={() => setActiveTab('signup')}
                    className="font-bold text-emerald-700 hover:underline cursor-pointer"
                  >
                    Register here
                  </button>
                </p>
              </div>
            </form>
          </div>
        )}

        {/* Tab 2: Signup with student assignment features */}
        {activeTab === 'signup' && (
          <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl border border-[#eaeae6] shadow-sm animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-extrabold text-[#242424] font-['Manrope']">
                  Student Registration
                </h2>
                <p className="text-xs text-[#777872] mt-0.5">
                  Live validations with auto-uppercase transform
                </p>
              </div>

              <button
                type="button"
                onClick={() => setHighContrastMode(!highContrastMode)}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                  highContrastMode
                    ? 'bg-black text-white border-black'
                    : 'bg-neutral-100 text-neutral-700 border-neutral-200 hover:bg-neutral-200'
                }`}
                title="Toggle student assignment black-on-focus styling"
              >
                {highContrastMode ? 'High-Contrast Active' : 'Toggle Assignment Focus Mode'}
              </button>
            </div>

            {signupError && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{signupError}</span>
              </div>
            )}

            {signupSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{signupSuccess}</span>
              </div>
            )}

            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#242424] mb-1">
                  Full Name (Auto-converts to UPPERCASE) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={signupName}
                  onChange={e => handleNameChange(e.target.value)}
                  placeholder="YASHRAJ SHARMA"
                  className={`w-full px-3.5 py-2.5 rounded-xl border border-[#eaeae6] text-sm transition focus:outline-none ${
                    highContrastMode
                      ? 'focus:bg-black focus:text-white focus:text-base'
                      : 'bg-[#fafaf8] focus:bg-white focus:ring-2 focus:ring-emerald-700'
                  }`}
                />
                <span className="text-[10px] text-[#777872] mt-0.5 block">
                  Must be at least 3 letters.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#242424] mb-1">
                  Username (Auto-converts to UPPERCASE) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={signupUsername}
                  onChange={e => handleUsernameChange(e.target.value)}
                  placeholder="YASHRAJ2026"
                  className={`w-full px-3.5 py-2.5 rounded-xl border border-[#eaeae6] text-sm transition focus:outline-none ${
                    highContrastMode
                      ? 'focus:bg-black focus:text-white focus:text-base'
                      : 'bg-[#fafaf8] focus:bg-white focus:ring-2 focus:ring-emerald-700'
                  }`}
                />
                <span className="text-[10px] text-[#777872] mt-0.5 block">
                  Must be at least 5 letters.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#242424] mb-1">
                  University Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={signupEmail}
                  onChange={e => setSignupEmail(e.target.value)}
                  placeholder="student@ltsu.ac.in"
                  className={`w-full px-3.5 py-2.5 rounded-xl border border-[#eaeae6] text-sm transition focus:outline-none ${
                    highContrastMode
                      ? 'focus:bg-black focus:text-white focus:text-base'
                      : 'bg-[#fafaf8] focus:bg-white focus:ring-2 focus:ring-emerald-700'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#242424] mb-1">
                    Password <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={signupPassword}
                    onChange={e => setSignupPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#eaeae6] bg-[#fafaf8] text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#242424] mb-1">
                    Confirm Password <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={signupConfirm}
                    onChange={e => setSignupConfirm(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#eaeae6] bg-[#fafaf8] text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#347a56] hover:bg-[#2b6547] text-white font-bold text-sm transition shadow-sm cursor-pointer mt-2"
              >
                Complete Registration
              </button>
            </form>
          </div>
        )}

        {/* Tab 3: Student Grade Calculator */}
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-200">
            {/* Input Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#eaeae6] shadow-sm">
              <div className="mb-6">
                <p className="text-[10px] font-bold text-emerald-700 tracking-wider uppercase">
                  ACADEMIC EVALUATION
                </p>
                <h2 className="text-xl font-extrabold text-[#242424] font-['Manrope']">
                  Student Grade Calculator
                </h2>
                <p className="text-xs text-[#777872] mt-1">
                  Enter student details and marks across 5 subjects (out of 100) to compute aggregate performance.
                </p>
              </div>

              <form onSubmit={handleCalculateGrade} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#242424] mb-1">
                      Student Name
                    </label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={e => setStudentName(e.target.value)}
                      placeholder="Enter student name"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#eaeae6] bg-[#fafaf8] text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#242424] mb-1">
                      Roll Number
                    </label>
                    <input
                      type="text"
                      required
                      value={studentRoll}
                      onChange={e => setStudentRoll(e.target.value)}
                      placeholder="e.g. LTSU-2026-101"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#eaeae6] bg-[#fafaf8] text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-bold text-[#242424] mb-2">
                    Enter Subject Marks (out of 100)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { key: 'm1', label: 'Subject 1 (Data Structures)' },
                      { key: 'm2', label: 'Subject 2 (Web Technologies)' },
                      { key: 'm3', label: 'Subject 3 (Database Systems)' },
                      { key: 'm4', label: 'Subject 4 (Operating Systems)' },
                      { key: 'm5', label: 'Subject 5 (Computer Networks)' }
                    ].map(sub => (
                      <div key={sub.key} className={sub.key === 'm5' ? 'sm:col-span-2' : ''}>
                        <label className="block text-[11px] font-semibold text-neutral-600 mb-1 truncate">
                          {sub.label}
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          required
                          value={marks[sub.key]}
                          onChange={e => {
                            const val = e.target.value === '' ? '' : Math.min(100, Math.max(0, Number(e.target.value)));
                            setMarks(prev => ({ ...prev, [sub.key]: val }));
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-[#eaeae6] bg-[#fafaf8] text-sm font-bold font-mono text-[#242424] focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white transition"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#347a56] hover:bg-[#2b6547] text-white font-bold text-sm transition shadow-sm cursor-pointer mt-4 flex items-center justify-center gap-2"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Calculate Grade & Transcript</span>
                </button>
              </form>
            </div>

            {/* Transcript & Report Card */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-[#eaeae6] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#eaeae6] mb-4">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-500" />
                    <h3 className="font-extrabold text-base text-[#242424] font-['Manrope']">
                      Academic Transcript
                    </h3>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-[#777872] font-semibold">
                    Semester Report
                  </span>
                </div>

                <div className="mb-4">
                  <div className="font-bold text-base text-[#242424]">{studentName}</div>
                  <div className="text-xs font-mono text-neutral-500">Roll: {studentRoll}</div>
                </div>

                {gradeResult ? (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-[#fafaf8] border border-[#eaeae6] grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-neutral-500 block">Total Marks</span>
                        <span className="font-extrabold text-base text-[#242424] font-mono">
                          {gradeResult.total} / 500
                        </span>
                      </div>

                      <div>
                        <span className="text-neutral-500 block">Percentage</span>
                        <span className="font-extrabold text-base text-emerald-800 font-mono">
                          {gradeResult.percentage}%
                        </span>
                      </div>

                      <div>
                        <span className="text-neutral-500 block">Grade Awarded</span>
                        <span className="font-extrabold text-sm text-[#242424]">
                          {gradeResult.grade}
                        </span>
                      </div>

                      <div>
                        <span className="text-neutral-500 block">Status</span>
                        <span className={`inline-block font-bold text-xs px-2 py-0.5 rounded ${
                          gradeResult.status === 'Pass' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {gradeResult.status}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-neutral-600 mb-1">
                        <span>Aggregate Progress</span>
                        <span>{gradeResult.percentage}%</span>
                      </div>
                      <div className="h-3 w-full bg-neutral-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 transition-all duration-500 rounded-full"
                          style={{ width: `${Math.min(100, gradeResult.percentage)}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Academic Standing:</strong> {gradeResult.division} with an estimated GPA of {gradeResult.gpa.toFixed(1)} / 10.0.
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-12 text-center text-[#777872]">
                    <Calculator className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
                    <p className="font-semibold text-sm text-[#242424]">No calculation yet</p>
                    <p className="text-xs mt-1">Fill out subject scores and press Calculate Grade.</p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#eaeae6] flex items-center justify-between text-xs text-[#777872]">
                <span>LTSU Examination Board</span>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="hover:text-black font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Grade Card</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
