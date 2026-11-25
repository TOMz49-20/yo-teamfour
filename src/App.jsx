import React, { useState, useMemo } from 'react';
import {
  Home,
  BookOpen,
  FileEdit,
  BarChart3,
  Settings,
  Bell,
  ChevronDown,
  Calendar,
  TrendingUp,
  BookMarked,
  Check,
  Info,
  MessageSquareQuote,
  X,
  CheckCircle2,
  Star,
  Search,
  Save,
  Send,
  Upload,
  Users,
  Download,
  Award,
  Shield,
  User,
  Sliders,
} from 'lucide-react';

// ==================== ข้อมูลจำลอง (MOCK DATA) ====================
const STUDENT_SEMESTERS = {
  '1/2567': {
    gpax: '3.42',
    gpaxDiff: '+0.12 จากภาคการศึกษาก่อน',
    gpa: '3.18',
    creditsEarned: 84,
    creditsTotal: 132,
    advisorUpdated: '18 ต.ค. 2567',
    advisorName: 'อ. ดร. ศิริพร วงศ์ดี',
    advisorRole: 'อาจารย์ที่ปรึกษา',
    advisorNote:
      '“มีพัฒนาการด้านการวิเคราะห์ปัญหาที่ดี และมีส่วนร่วมในชั้นเรียนอย่างสม่ำเสมอ ควรทบทวนเนื้อหาเรื่องเครือข่ายเพิ่มเติม และเข้าพบอาจารย์ตามเวลานัดหมายเพื่อวางแผนปรับปรุงผลการเรียน”',
    overallStatus: 'อยู่ในเกณฑ์ดี',
    skills: [
      { label: 'ความรับผิดชอบ', pct: 88 },
      { label: 'การมีส่วนร่วม', pct: 82 },
      { label: 'ทักษะการวิเคราะห์', pct: 76 },
    ],
    courses: [
      {
        code: 'CS231',
        prefix: 'CS',
        name: 'โครงสร้างข้อมูลและอัลกอริทึม',
        credits: 3,
        assignment: 27,
        midterm: 25,
        final: 34,
        score: 86,
        grade: 'A',
        passed: true,
        instructor: 'อ. ดร. ศิริพร วงศ์ดี',
        schedule: 'จันทร์ 09:00 - 12:00 น. (ห้อง IT-302)',
        evaluated: true,
      },
      {
        code: 'CS245',
        prefix: 'CS',
        name: 'ระบบฐานข้อมูล',
        credits: 3,
        assignment: 24,
        midterm: 23,
        final: 31,
        score: 78,
        grade: 'B+',
        passed: true,
        instructor: 'รศ.ดร.อนันต์ ข้อมูลดี',
        schedule: 'อังคาร 13:00 - 16:00 น. (ห้อง IT-205)',
        evaluated: true,
      },
      {
        code: 'MA201',
        prefix: 'MA',
        name: 'คณิตศาสตร์ดิสครีต',
        credits: 3,
        assignment: 22,
        midterm: 21,
        final: 29,
        score: 72,
        grade: 'B',
        passed: true,
        instructor: 'ผศ.ดร.ปิยะดา คณิตกุล',
        schedule: 'พุธ 09:00 - 12:00 น. (ห้อง SC-104)',
        evaluated: true,
      },
      {
        code: 'EN202',
        prefix: 'EN',
        name: 'ภาษาอังกฤษเชิงวิชาการ',
        credits: 3,
        assignment: 20,
        midterm: 19,
        final: 26,
        score: 65,
        grade: 'C+',
        passed: true,
        instructor: 'อ.วิภาดา ภาษาศิลป์',
        schedule: 'พฤหัสบดี 13:00 - 16:00 น. (ห้อง HU-201)',
        evaluated: true,
      },
      {
        code: 'CS267',
        prefix: 'CS',
        name: 'เครือข่ายคอมพิวเตอร์',
        credits: 3,
        assignment: 15,
        midterm: 14,
        final: 19,
        score: 48,
        grade: 'F',
        passed: false,
        instructor: 'อ.กิตติศักดิ์ เน็ตเวิร์ก',
        schedule: 'ศุกร์ 09:00 - 12:00 น. (ห้อง NET-Lab)',
        evaluated: false,
      },
    ],
  },
  '2/2566': {
    gpax: '3.30',
    gpaxDiff: '+0.08 จากภาคการศึกษาก่อน',
    gpa: '3.38',
    creditsEarned: 69,
    creditsTotal: 132,
    advisorUpdated: '15 พ.ค. 2567',
    advisorName: 'อ. ดร. ศิริพร วงศ์ดี',
    advisorRole: 'อาจารย์ที่ปรึกษา',
    advisorNote:
      '“รักษามาตรฐานการเรียนได้ดีเยี่ยม สามารถบริหารเวลาทำโครงงานและสอบปลายภาคได้สมดุล”',
    overallStatus: 'อยู่ในเกณฑ์ดี',
    skills: [
      { label: 'ความรับผิดชอบ', pct: 90 },
      { label: 'การมีส่วนร่วม', pct: 85 },
      { label: 'ทักษะการวิเคราะห์', pct: 80 },
    ],
    courses: [
      {
        code: 'CS212',
        prefix: 'CS',
        name: 'การเขียนโปรแกรมเชิงวัตถุ',
        credits: 3,
        assignment: 26,
        midterm: 24,
        final: 34,
        score: 84,
        grade: 'A',
        passed: true,
        instructor: 'อ. ดร. ศิริพร วงศ์ดี',
        schedule: 'จันทร์ 13:00 - 16:00 น.',
        evaluated: true,
      },
      {
        code: 'CS220',
        prefix: 'CS',
        name: 'สถาปัตยกรรมคอมพิวเตอร์',
        credits: 3,
        assignment: 23,
        midterm: 22,
        final: 31,
        score: 76,
        grade: 'B+',
        passed: true,
        instructor: 'อ.กิตติศักดิ์ เน็ตเวิร์ก',
        schedule: 'พุธ 13:00 - 16:00 น.',
        evaluated: true,
      },
      {
        code: 'ST201',
        prefix: 'ST',
        name: 'ความน่าจะเป็นและสถิติ',
        credits: 3,
        assignment: 21,
        midterm: 20,
        final: 30,
        score: 71,
        grade: 'B',
        passed: true,
        instructor: 'ผศ.ดร.ปิยะดา คณิตกุล',
        schedule: 'ศุกร์ 09:00 - 12:00 น.',
        evaluated: true,
      },
    ],
  },
};

const INITIAL_GRADING_ROSTER = [
  { id: '65010001', initial: 'ก', name: 'กิตติพงษ์ วัฒนกุล', assignment: 27, midterm: 28, final: 38 },
  { id: '65010002', initial: 'ช', name: 'ชนิกานต์ ศรีสุข', assignment: 25, midterm: 25, final: 32 },
  { id: '65010003', initial: 'ณ', name: 'ณัฐวุฒิ พงษ์ไพศาล', assignment: 23, midterm: 22, final: 29 },
  { id: '65010004', initial: 'ป', name: 'ปุณณภา จันทร์สว่าง', assignment: 29, midterm: 27, final: 36 },
  { id: '65010005', initial: 'ธ', name: 'ธนภัทร วงศ์วิริยะ', assignment: 18, midterm: 17, final: 25 },
  { id: '65010006', initial: 'พ', name: 'พิมพ์ชนก รัตนชัย', assignment: 24, midterm: 24, final: 34 },
];

const GPA_HISTORY = [
  { term: '1/2565', gpa: 3.12 },
  { term: '2/2565', gpa: 3.24 },
  { term: '1/2566', gpa: 3.22 },
  { term: '2/2566', gpa: 3.38 },
  { term: '1/2567', gpa: 3.18 },
];

const PREFIX_STYLES = {
  CS: 'bg-blue-50 text-blue-600 border-blue-100',
  MA: 'bg-indigo-50 text-indigo-600 border-indigo-100',
  EN: 'bg-sky-50 text-sky-600 border-sky-100',
  ST: 'bg-violet-50 text-violet-600 border-violet-100',
};

const GRADE_STYLES = {
  A: 'bg-blue-50 text-blue-600',
  'B+': 'bg-blue-50/80 text-blue-600',
  B: 'bg-indigo-50 text-indigo-600',
  'C+': 'bg-sky-50 text-sky-700',
  C: 'bg-amber-50 text-amber-700',
  'D+': 'bg-orange-50 text-orange-700',
  D: 'bg-orange-50 text-orange-700',
  F: 'bg-rose-50 text-rose-600',
};

const calculateLetterGrade = (total) => {
  if (total >= 80) return 'A';
  if (total >= 75) return 'B+';
  if (total >= 70) return 'B';
  if (total >= 65) return 'C+';
  if (total >= 60) return 'C';
  if (total >= 55) return 'D+';
  if (total >= 50) return 'D';
  return 'F';
};

export default function App() {
  const [activeMenu, setActiveMenu] = useState('home'); // 'home' | 'courses' | 'grades' | 'reports' | 'settings'
  const [selectedSemester, setSelectedSemester] = useState('1/2567');
  const [semesterMap, setSemesterMap] = useState(STUDENT_SEMESTERS);
  const [showAllHomeCourses, setShowAllHomeCourses] = useState(false);
  const [toast, setToast] = useState(null);

  // Courses Page State
  const [courseSearch, setCourseSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('all'); // 'all' | 'passed' | 'failed'
  const [selectedCourseModal, setSelectedCourseModal] = useState(null);
  const [evalRating, setEvalRating] = useState(5);
  const [evalComment, setEvalComment] = useState('');

  // Grade Entry Page State (ตามภาพหน้าบันทึกเกรด)
  const [gradingSemester, setGradingSemester] = useState('1/2567');
  const [gradingCourse, setGradingCourse] = useState('CS231 — โครงสร้างข้อมูลและอัลกอริทึม');
  const [gradingStatus, setGradingStatus] = useState('ร่าง'); // 'ร่าง' | 'ส่งแล้ว'
  const [roster, setRoster] = useState(INITIAL_GRADING_ROSTER);
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);

  // Settings Page State
  const [settingsTab, setSettingsTab] = useState('profile'); // 'profile' | 'notifications' | 'grading'
  const [userSettings, setUserSettings] = useState({
    studentName: 'กิตติพงษ์ วัฒนกุล',
    studentId: '65010001',
    instructorName: 'อ. ดร. ศิริพร วงศ์ดี',
    email: 'kittipong.w@university.ac.th',
    faculty: 'คณะวิทยาศาสตร์และเทคโนโลยี • สาขาวิทยาการคอมพิวเตอร์',
    notifyGrade: true,
    notifyEval: true,
    autoSaveDraft: true,
  });

  // Guide & Notification Modal
  const [infoModal, setInfoModal] = useState(null); // 'guide' | 'notifications' | null

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  const currentData = semesterMap[selectedSemester];
  const creditPct = Math.min(
    100,
    Math.round((currentData.creditsEarned / currentData.creditsTotal) * 100)
  );
  const passedCount = currentData.courses.filter((c) => c.passed).length;
  const improveCount = currentData.courses.length - passedCount;

  // Filtered Courses for "รายวิชา" page
  const filteredCourses = useMemo(() => {
    return currentData.courses.filter((c) => {
      const q = courseSearch.trim().toLowerCase();
      const matchSearch =
        !q ||
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q);
      const matchFilter =
        courseFilter === 'all' ||
        (courseFilter === 'passed' && c.passed) ||
        (courseFilter === 'failed' && !c.passed);
      return matchSearch && matchFilter;
    });
  }, [currentData.courses, courseSearch, courseFilter]);

  // Grade Distribution for "รายงาน" page
  const gradeDistribution = useMemo(() => {
    const grades = ['A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'];
    const counts = Object.fromEntries(grades.map((g) => [g, 0]));
    currentData.courses.forEach((c) => {
      counts[c.grade] = (counts[c.grade] || 0) + 1;
    });
    const maxVal = Math.max(1, ...Object.values(counts));
    return grades.map((g) => ({
      grade: g,
      count: counts[g],
      barPct: counts[g] === 0 ? 6 : Math.round((counts[g] / maxVal) * 100),
    }));
  }, [currentData.courses]);

  // Handlers
  const handleRosterScoreChange = (id, field, rawValue) => {
    const maxMap = { assignment: 30, midterm: 30, final: 40 };
    const cleanVal = Math.max(0, Math.min(Number(rawValue) || 0, maxMap[field]));
    setRoster((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: cleanVal } : row))
    );
  };

  const handleSubmitEvaluation = (e) => {
    e.preventDefault();
    if (!selectedCourseModal) return;
    setSemesterMap((prev) => {
      const sem = prev[selectedSemester];
      return {
        ...prev,
        [selectedSemester]: {
          ...sem,
          courses: sem.courses.map((c) =>
            c.code === selectedCourseModal.code ? { ...c, evaluated: true } : c
          ),
        },
      };
    });
    showToast(`ส่งแบบประเมินรายวิชา ${selectedCourseModal.code} เรียบร้อยแล้ว`);
    setSelectedCourseModal(null);
    setEvalComment('');
    setEvalRating(5);
  };

  const navItems = [
    { id: 'home', label: 'หน้าหลัก', icon: Home },
    { id: 'courses', label: 'รายวิชา', icon: BookOpen },
    { id: 'grades', label: 'บันทึกเกรด', icon: FileEdit },
    { id: 'reports', label: 'รายงาน', icon: BarChart3 },
    { id: 'settings', label: 'ตั้งค่า', icon: Settings },
  ];

  // Header display switches automatically for "บันทึกเกรด" to match your Figma screenshot
  const isInstructorContext = activeMenu === 'grades';

  return (
    <div className="min-h-screen flex bg-[#f4f7fb] text-slate-800">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 bg-[#0b2458] text-white px-4 py-3 rounded-xl shadow-lg text-xs font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* ==================== LEFT SIDEBAR ==================== */}
      <aside className="w-64 shrink-0 bg-[#0b2458] text-white flex flex-col justify-between select-none">
        <div>
          {/* Brand */}
          <div className="h-[72px] px-5 flex items-center gap-3 border-b border-white/10">
            <div className="w-10 h-10 rounded-xl bg-white text-[#0b2458] font-bold text-xl flex items-center justify-center shadow-sm">
              G
            </div>
            <div className="leading-tight">
              <div className="font-bold text-base tracking-wide">GRADE FLOW</div>
              <div className="text-[10px] tracking-[0.14em] text-blue-200/80 uppercase">
                Academic System
              </div>
            </div>
          </div>

          {/* Menu */}
          <div className="px-3.5 pt-6">
            <div className="px-3 mb-2.5 text-xs font-medium text-blue-200/70">
              เมนูหลัก
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeMenu === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveMenu(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition ${
                      isActive
                        ? 'bg-white text-[#0b2458] font-semibold shadow-sm'
                        : 'text-blue-100/85 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 ${
                          isActive ? 'text-[#1d4ed8]' : 'text-blue-200/80'
                        }`}
                      />
                      <span>{item.label}</span>
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1d4ed8]" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Help Box & Version */}
        <div className="p-4 space-y-3">
          <div className="rounded-2xl bg-[#16326e] border border-white/10 p-4 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <Info className="w-4 h-4 text-sky-300 shrink-0" />
              <span>ต้องการความช่วยเหลือ?</span>
            </div>
            <p className="text-[11px] leading-relaxed text-blue-200/75">
              ศึกษาคู่มือการใช้งานระบบ หรือติดต่อเจ้าหน้าที่
            </p>
            <button
              type="button"
              onClick={() => setInfoModal('guide')}
              className="text-xs font-medium text-white underline underline-offset-4 hover:text-sky-200 transition"
            >
              ดูคู่มือการใช้งาน
            </button>
          </div>

          <div className="px-1 text-[11px] text-blue-200/60">
            Grade Flow v2.4.0
          </div>
        </div>
      </aside>

      {/* ==================== RIGHT WORKSPACE ==================== */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-[72px] bg-white border-b border-slate-200/80 px-7 flex items-center justify-between sticky top-0 z-20">
          <div>
            <div className="text-[11px] text-slate-400">
              ระบบบริหารจัดการผลการเรียน
            </div>
            <h1 className="text-base font-bold text-slate-900">
              {activeMenu === 'home' && 'ภาพรวมผลการเรียน'}
              {activeMenu === 'courses' && 'รายวิชาที่ลงทะเบียน'}
              {activeMenu === 'grades' && 'บันทึกและจัดการคะแนน'}
              {activeMenu === 'reports' && 'รายงานผลการศึกษา'}
              {activeMenu === 'settings' && 'ตั้งค่าบัญชีและระบบ'}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setInfoModal('notifications')}
              aria-label="การแจ้งเตือน"
              className="relative w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition"
            >
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-2 right-2.5" />
            </button>

            <div className="h-6 w-px bg-slate-200" />

            <button
              type="button"
              onClick={() => setActiveMenu('settings')}
              className="flex items-center gap-3 text-left hover:bg-slate-50 px-2.5 py-1.5 rounded-xl transition"
            >
              <div className="w-9 h-9 rounded-full bg-blue-100 text-[#1d4ed8] font-semibold text-xs flex items-center justify-center">
                กพ
              </div>
              <div className="leading-tight">
                <div className="text-xs font-semibold text-slate-800">
                  {isInstructorContext
                    ? userSettings.instructorName
                    : userSettings.studentName}
                </div>
                <div className="text-[11px] text-slate-400">
                  {isInstructorContext
                    ? 'อาจารย์ประจำรายวิชา'
                    : `นักศึกษา • ${userSettings.studentId}`}
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </header>

        {/* Main Content Container */}
        <main className="p-7 max-w-[1320px] w-full mx-auto space-y-6">
          {/* ==========================================================
              PAGE 1: หน้าหลัก (ตรงตามภาพ 100%)
          ========================================================== */}
          {activeMenu === 'home' && (
            <>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs text-slate-400">
                    ยินดีต้อนรับกลับ, {userSettings.studentName.split(' ')[0]}
                  </p>
                  <h2 className="text-2xl font-bold text-slate-900 mt-0.5">
                    ผลการเรียนของคุณ
                  </h2>
                </div>

                <div className="relative inline-flex items-center bg-white border border-slate-200/90 rounded-xl px-3.5 py-2 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                  <Calendar className="w-4 h-4 text-[#1d4ed8] mr-2" />
                  <select
                    value={selectedSemester}
                    onChange={(e) => {
                      setSelectedSemester(e.target.value);
                      setShowAllHomeCourses(false);
                    }}
                    className="appearance-none bg-transparent pr-6 text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="1/2567">ภาคการศึกษาที่ 1/2567</option>
                    <option value="2/2566">ภาคการศึกษาที่ 2/2566</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none -ml-4" />
                </div>
              </div>

              {/* 4 Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#163a8a] via-[#1d4ed8] to-[#2563eb] text-white p-5 shadow-md">
                  <div className="w-28 h-28 rounded-full bg-white/10 absolute -right-6 -bottom-8 pointer-events-none" />
                  <div className="text-xs font-medium text-blue-100">
                    เกรดเฉลี่ยสะสม (GPAX)
                  </div>
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-3xl font-bold tracking-tight">
                      {currentData.gpax}
                    </span>
                    <span className="text-xs text-blue-200">/ 4.00</span>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-emerald-200 font-medium">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{currentData.gpaxDiff}</span>
                  </div>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(15,23,42,0.03)] flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-medium text-slate-500">
                      GPA ภาคล่าสุด
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-[#1d4ed8] flex items-center justify-center">
                      <BarChart3 className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-2 text-3xl font-bold text-slate-900">
                    {currentData.gpa}
                  </div>
                  <div className="mt-4 text-[11px] text-slate-400">
                    ภาคการศึกษาที่ {selectedSemester}
                  </div>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(15,23,42,0.03)] flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-medium text-slate-500">
                      หน่วยกิตสะสม
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                      <BookMarked className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-3xl font-bold text-slate-900">
                      {currentData.creditsEarned}
                    </span>
                    <span className="text-xs text-slate-400">
                      / {currentData.creditsTotal}
                    </span>
                  </div>
                  <div className="mt-4 w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      style={{ width: `${creditPct}%` }}
                      className="h-full rounded-full bg-purple-500 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(15,23,42,0.03)] flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-medium text-slate-500">
                      รายวิชาภาคนี้
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-3xl font-bold text-slate-900">
                      {currentData.courses.length}
                    </span>
                    <span className="text-xs text-slate-500">รายวิชา</span>
                  </div>
                  <div className="mt-4 text-[11px] flex items-center gap-1.5">
                    <span className="text-emerald-600 font-medium">
                      {passedCount} ผ่าน
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-500">
                      {improveCount} ต้องปรับปรุง
                    </span>
                  </div>
                </div>
              </div>

              {/* Grade Table */}
              <section className="rounded-2xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(15,23,42,0.03)] overflow-hidden">
                <div className="px-6 py-5 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      ผลการเรียนรายวิชา
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      รายละเอียดคะแนนและเกรด ภาคการศึกษาที่ {selectedSemester}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowAllHomeCourses((prev) => !prev)}
                    className="text-xs font-medium text-[#1d4ed8] hover:text-blue-800 hover:underline transition"
                  >
                    {showAllHomeCourses ? 'ย่อรายการ' : 'ดูผลการเรียนทั้งหมด'}
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#f8fafc] border-y border-slate-100 text-[11px] font-medium text-slate-400">
                        <th className="py-3 px-6">รายวิชา</th>
                        <th className="py-3 px-4 text-center">หน่วยกิต</th>
                        <th className="py-3 px-4 text-center">คะแนนรวม</th>
                        <th className="py-3 px-4 text-center">เกรด</th>
                        <th className="py-3 px-6 text-right">สถานะ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {(showAllHomeCourses
                        ? currentData.courses
                        : currentData.courses.slice(0, 5)
                      ).map((course) => (
                        <tr
                          key={course.code}
                          onClick={() => setSelectedCourseModal(course)}
                          className="hover:bg-slate-50/90 transition cursor-pointer"
                        >
                          <td className="py-3.5 px-6">
                            <div className="flex items-center gap-3.5">
                              <div
                                className={`w-9 h-9 rounded-xl border text-xs font-semibold flex items-center justify-center shrink-0 ${
                                  PREFIX_STYLES[course.prefix] ||
                                  'bg-slate-100 text-slate-600 border-slate-200'
                                }`}
                              >
                                {course.prefix}
                              </div>
                              <div>
                                <div className="text-xs font-semibold text-slate-800">
                                  {course.name}
                                </div>
                                <div className="text-[11px] text-slate-400">
                                  {course.code}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-center text-xs text-slate-600">
                            {course.credits}
                          </td>
                          <td className="py-3.5 px-4 text-center text-xs">
                            <span className="font-bold text-slate-800">
                              {course.score}
                            </span>
                            <span className="text-slate-400"> / 100</span>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <span
                              className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold ${
                                GRADE_STYLES[course.grade] ||
                                'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {course.grade}
                            </span>
                          </td>
                          <td className="py-3.5 px-6 text-right">
                            {course.passed ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-600">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                ผ่าน
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-rose-50 text-rose-600">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                ไม่ผ่าน
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Bottom 2 Cards (ตรงตามภาพเต็มด้านล่าง) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-7 rounded-2xl bg-white border border-slate-200/80 p-6 shadow-[0_1px_3px_rgba(15,23,42,0.03)] space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                      <MessageSquareQuote className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">
                        ข้อเสนอแนะจากอาจารย์
                      </div>
                      <div className="text-[11px] text-slate-400">
                        อัปเดตล่าสุด {currentData.advisorUpdated}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#f8fafc] border border-slate-100 p-4 text-xs leading-relaxed text-slate-600">
                    {currentData.advisorNote}
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1d4ed8] font-semibold text-xs flex items-center justify-center">
                      ศว
                    </div>
                    <div className="leading-tight">
                      <div className="text-xs font-semibold text-slate-800">
                        {currentData.advisorName}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {currentData.advisorRole}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 rounded-2xl bg-white border border-slate-200/80 p-6 shadow-[0_1px_3px_rgba(15,23,42,0.03)] flex flex-col justify-between space-y-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs text-[#1d4ed8] font-medium">
                        การประเมินภาพรวม
                      </div>
                      <div className="text-lg font-bold text-slate-900 mt-0.5">
                        {currentData.overallStatus}
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1d4ed8] flex items-center justify-center">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    {currentData.skills.map((skill) => (
                      <div key={skill.label} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-600">{skill.label}</span>
                          <span className="font-semibold text-slate-800">
                            {skill.pct}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            style={{ width: `${skill.pct}%` }}
                            className="h-full rounded-full bg-[#1d4ed8]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ==========================================================
              PAGE 2: รายวิชา (ออกแบบใหม่เข้าชุดกับระบบ)
          ========================================================== */}
          {activeMenu === 'courses' && (
            <>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs text-slate-400">
                    จัดการและตรวจสอบรายวิชาเรียน
                  </p>
                  <h2 className="text-2xl font-bold text-slate-900 mt-0.5">
                    รายวิชาที่ลงทะเบียน
                  </h2>
                </div>

                <div className="relative inline-flex items-center bg-white border border-slate-200/90 rounded-xl px-3.5 py-2 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
                  <Calendar className="w-4 h-4 text-[#1d4ed8] mr-2" />
                  <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    className="appearance-none bg-transparent pr-6 text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="1/2567">ภาคการศึกษาที่ 1/2567</option>
                    <option value="2/2566">ภาคการศึกษาที่ 2/2566</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none -ml-4" />
                </div>
              </div>

              {/* Search & Filter Card */}
              <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(15,23,42,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={courseSearch}
                    onChange={(e) => setCourseSearch(e.target.value)}
                    placeholder="ค้นหารหัสวิชา ชื่อรายวิชา หรืออาจารย์ผู้สอน..."
                    className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  {[
                    { id: 'all', label: `ทั้งหมด (${currentData.courses.length})` },
                    { id: 'passed', label: `ผ่านแล้ว (${passedCount})` },
                    { id: 'failed', label: `ต้องปรับปรุง (${improveCount})` },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setCourseFilter(tab.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-medium transition ${
                        courseFilter === tab.id
                          ? 'bg-[#0b2458] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Course Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredCourses.map((course) => (
                  <div
                    key={course.code}
                    className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(15,23,42,0.03)] hover:border-blue-200 transition flex flex-col justify-between gap-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl border text-xs font-bold flex items-center justify-center shrink-0 ${
                              PREFIX_STYLES[course.prefix] ||
                              'bg-slate-100 text-slate-600 border-slate-200'
                            }`}
                          >
                            {course.prefix}
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-[#1d4ed8]">
                              {course.code} • {course.credits} หน่วยกิต
                            </div>
                            <h3 className="text-sm font-bold text-slate-900">
                              {course.name}
                            </h3>
                          </div>
                        </div>

                        <span
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold shrink-0 ${
                            GRADE_STYLES[course.grade] || 'bg-slate-100'
                          }`}
                        >
                          {course.grade}
                        </span>
                      </div>

                      <div className="rounded-xl bg-[#f8fafc] p-3 space-y-1 text-xs text-slate-600">
                        <div>
                          <span className="text-slate-400">ผู้สอน: </span>
                          {course.instructor}
                        </div>
                        <div>
                          <span className="text-slate-400">เวลาเรียน: </span>
                          {course.schedule}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500">
                        คะแนนรวม{' '}
                        <strong className="text-slate-800">{course.score}</strong>
                        /100
                      </span>

                      <button
                        type="button"
                        onClick={() => setSelectedCourseModal(course)}
                        className={`px-3 py-1.5 rounded-lg font-medium transition ${
                          course.evaluated
                            ? 'bg-blue-50 text-[#1d4ed8] hover:bg-blue-100'
                            : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                        }`}
                      >
                        {course.evaluated ? 'ดูคะแนนย่อย' : 'ประเมินการสอน'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ==========================================================
              PAGE 3: บันทึกเกรด (ตรงตามภาพหน้าที่ 2 ของคุณ)
          ========================================================== */}
          {activeMenu === 'grades' && (
            <>
              <div>
                <p className="text-xs text-slate-400">จัดการคะแนนและประมวลผล</p>
                <h2 className="text-2xl font-bold text-slate-900 mt-0.5">
                  บันทึกคะแนนรายวิชา
                </h2>
              </div>

              {/* Filter Bar Card */}
              <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(15,23,42,0.03)] grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
                <div className="lg:col-span-5">
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    ภาคการศึกษา
                  </label>
                  <div className="relative">
                    <select
                      value={gradingSemester}
                      onChange={(e) => setGradingSemester(e.target.value)}
                      className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]"
                    >
                      <option value="1/2567">ภาคการศึกษาที่ 1/2567</option>
                      <option value="2/2566">ภาคการศึกษาที่ 2/2566</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    รายวิชา
                  </label>
                  <div className="relative">
                    <select
                      value={gradingCourse}
                      onChange={(e) => setGradingCourse(e.target.value)}
                      className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]"
                    >
                      <option value="CS231 — โครงสร้างข้อมูลและอัลกอริทึม">
                        CS231 — โครงสร้างข้อมูลและอัลกอริทึม
                      </option>
                      <option value="CS245 — ระบบฐานข้อมูล">
                        CS245 — ระบบฐานข้อมูล
                      </option>
                      <option value="CS267 — เครือข่ายคอมพิวเตอร์">
                        CS267 — เครือข่ายคอมพิวเตอร์
                      </option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="rounded-xl bg-blue-50/70 border border-blue-100 px-3.5 py-2 flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-[#1d4ed8] shrink-0" />
                    <div className="leading-tight">
                      <div className="text-[10px] text-slate-400">
                        นักศึกษาทั้งหมด
                      </div>
                      <div className="text-xs font-bold text-[#0b2458]">
                        42 คน
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Score Entry Table Card */}
              <section className="rounded-2xl bg-white border border-slate-200/80 shadow-[0_1px_3px_rgba(15,23,42,0.03)] overflow-hidden">
                <div className="px-6 py-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-base font-bold text-slate-900">
                        ตารางบันทึกคะแนน
                      </h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          gradingStatus === 'ร่าง'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {gradingStatus}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      คะแนนเก็บ 30 · Midterm 30 · Final 40 · รวม 100 คะแนน
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() =>
                        showToast('นำเข้าข้อมูลคะแนนจากไฟล์ CSV สำเร็จ')
                      }
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 transition"
                    >
                      <Upload className="w-3.5 h-3.5" /> Import CSV
                    </button>

                    <button
                      type="button"
                      disabled={gradingStatus === 'ส่งแล้ว'}
                      onClick={() => showToast('บันทึกข้อมูลฉบับร่างเรียบร้อยแล้ว')}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 transition disabled:opacity-50"
                    >
                      <Save className="w-3.5 h-3.5" /> บันทึกร่าง
                    </button>

                    <button
                      type="button"
                      disabled={gradingStatus === 'ส่งแล้ว'}
                      onClick={() => setConfirmSubmitOpen(true)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-semibold shadow-xs transition disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" /> ส่งเกรดเข้าทะเบียน
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#f8fafc] border-b border-slate-100 text-[11px] font-medium text-slate-400">
                        <th className="py-3.5 px-6 w-12">#</th>
                        <th className="py-3.5 px-4">รหัสนักศึกษา</th>
                        <th className="py-3.5 px-4">ชื่อ-นามสกุล</th>
                        <th className="py-3.5 px-3 text-center">
                          คะแนนเก็บ
                          <div className="text-[10px] text-slate-400">(30)</div>
                        </th>
                        <th className="py-3.5 px-3 text-center">
                          Midterm
                          <div className="text-[10px] text-slate-400">(30)</div>
                        </th>
                        <th className="py-3.5 px-3 text-center">
                          Final
                          <div className="text-[10px] text-slate-400">(40)</div>
                        </th>
                        <th className="py-3.5 px-4 text-center">
                          รวม
                          <div className="text-[10px] text-slate-400">(100)</div>
                        </th>
                        <th className="py-3.5 px-6 text-center">เกรด</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {roster.map((st, idx) => {
                        const total = st.assignment + st.midterm + st.final;
                        const grade = calculateLetterGrade(total);
                        return (
                          <tr key={st.id} className="hover:bg-slate-50/70">
                            <td className="py-3.5 px-6 text-slate-400">
                              {idx + 1}
                            </td>
                            <td className="py-3.5 px-4 font-semibold text-slate-700">
                              {st.id}
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-2.5">
                                <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold flex items-center justify-center">
                                  {st.initial}
                                </span>
                                <span className="font-medium text-slate-800">
                                  {st.name}
                                </span>
                              </div>
                            </td>
                            <td className="py-3.5 px-3 text-center">
                              <input
                                type="number"
                                value={st.assignment}
                                disabled={gradingStatus === 'ส่งแล้ว'}
                                onChange={(e) =>
                                  handleRosterScoreChange(
                                    st.id,
                                    'assignment',
                                    e.target.value
                                  )
                                }
                                className="w-16 text-center border border-slate-200 rounded-lg py-1.5 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563eb] disabled:bg-slate-100"
                              />
                            </td>
                            <td className="py-3.5 px-3 text-center">
                              <input
                                type="number"
                                value={st.midterm}
                                disabled={gradingStatus === 'ส่งแล้ว'}
                                onChange={(e) =>
                                  handleRosterScoreChange(
                                    st.id,
                                    'midterm',
                                    e.target.value
                                  )
                                }
                                className="w-16 text-center border border-slate-200 rounded-lg py-1.5 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563eb] disabled:bg-slate-100"
                              />
                            </td>
                            <td className="py-3.5 px-3 text-center">
                              <input
                                type="number"
                                value={st.final}
                                disabled={gradingStatus === 'ส่งแล้ว'}
                                onChange={(e) =>
                                  handleRosterScoreChange(
                                    st.id,
                                    'final',
                                    e.target.value
                                  )
                                }
                                className="w-16 text-center border border-slate-200 rounded-lg py-1.5 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563eb] disabled:bg-slate-100"
                              />
                            </td>
                            <td className="py-3.5 px-4 text-center font-bold text-slate-900">
                              {total}
                            </td>
                            <td className="py-3.5 px-6 text-center">
                              <span
                                className={`inline-flex items-center justify-center w-7 h-7 rounded-lg font-bold ${
                                  GRADE_STYLES[grade] || 'bg-slate-100'
                                }`}
                              >
                                {grade}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="px-6 py-4 bg-[#f8fafc] border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                  <span>แสดง 1-6 จากทั้งหมด 42 คน</span>
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      กรอกแล้ว 6
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-slate-300" />
                      รอดำเนินการ 36
                    </span>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* ==========================================================
              PAGE 4: รายงาน (ออกแบบใหม่เข้าชุดกับระบบ)
          ========================================================== */}
          {activeMenu === 'reports' && (
            <>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs text-slate-400">
                    สถิติและใบรายงานผลการศึกษา
                  </p>
                  <h2 className="text-2xl font-bold text-slate-900 mt-0.5">
                    รายงานและวิเคราะห์ผลการเรียน
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    showToast('กำลังดาวน์โหลดใบรายงานผลการศึกษา (Transcript.pdf)')
                  }
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0b2458] hover:bg-[#133170] text-white text-xs font-semibold shadow-xs transition"
                >
                  <Download className="w-4 h-4" /> ส่งออกใบรายงานผล (PDF)
                </button>
              </div>

              {/* Summary Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(15,23,42,0.03)] flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400">เกรดเฉลี่ยสะสมรวม</div>
                    <div className="text-2xl font-bold text-[#0b2458] mt-1">
                      {currentData.gpax} <span className="text-xs font-normal text-slate-400">/ 4.00</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1d4ed8] flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(15,23,42,0.03)] flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400">หน่วยกิตสะสมที่ผ่าน</div>
                    <div className="text-2xl font-bold text-slate-900 mt-1">
                      {currentData.creditsEarned}{' '}
                      <span className="text-xs font-normal text-slate-400">
                        / {currentData.creditsTotal} หน่วยกิต
                      </span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <BookMarked className="w-5 h-5" />
                  </div>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-[0_1px_3px_rgba(15,23,42,0.03)] flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-400">อัตราการสอบผ่านสะสม</div>
                    <div className="text-2xl font-bold text-emerald-600 mt-1">
                      93.3%
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* GPA Trend Chart */}
                <div className="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-[0_1px_3px_rgba(15,23,42,0.03)] space-y-5">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      แนวโน้ม GPA รายภาคการศึกษา
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      เปรียบเทียบผลการเรียนตั้งแต่ปีการศึกษา 2565 - 2567
                    </p>
                  </div>

                  <div className="grid grid-cols-5 gap-3 pt-4">
                    {GPA_HISTORY.map((item) => {
                      const heightPct = Math.round((item.gpa / 4.0) * 100);
                      return (
                        <div
                          key={item.term}
                          className="flex flex-col items-center gap-2"
                        >
                          <span className="text-xs font-bold text-[#1d4ed8]">
                            {item.gpa.toFixed(2)}
                          </span>
                          <div className="w-full h-36 bg-slate-50 rounded-xl flex items-end justify-center p-2">
                            <div
                              style={{ height: `${heightPct}%` }}
                              className="w-8 rounded-lg bg-gradient-to-t from-[#0b2458] to-[#2563eb] transition-all"
                            />
                          </div>
                          <span className="text-[11px] font-medium text-slate-500">
                            {item.term}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Grade Distribution Chart */}
                <div className="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-[0_1px_3px_rgba(15,23,42,0.03)] space-y-5">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      การกระจายตัวของเกรด ({selectedSemester})
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      จำนวนรายวิชาที่ได้รับในแต่ละระดับเกรด
                    </p>
                  </div>

                  <div className="grid grid-cols-8 gap-2 pt-4">
                    {gradeDistribution.map((item) => (
                      <div
                        key={item.grade}
                        className="flex flex-col items-center gap-2"
                      >
                        <span className="text-xs font-semibold text-slate-700">
                          {item.count}
                        </span>
                        <div className="w-full h-36 bg-slate-50 rounded-xl flex items-end justify-center p-1.5">
                          <div
                            style={{ height: `${item.barPct}%` }}
                            className={`w-6 rounded-md transition-all ${
                              item.grade === 'F'
                                ? 'bg-rose-500'
                                : 'bg-[#1d4ed8]'
                            }`}
                          />
                        </div>
                        <span className="text-[11px] font-bold text-slate-600">
                          {item.grade}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ==========================================================
              PAGE 5: การตั้งค่า (ออกแบบใหม่เข้าชุดกับระบบ)
          ========================================================== */}
          {activeMenu === 'settings' && (
            <>
              <div>
                <p className="text-xs text-slate-400">จัดการบัญชีผู้ใช้และระบบ</p>
                <h2 className="text-2xl font-bold text-slate-900 mt-0.5">
                  การตั้งค่าระบบ
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Settings Sub-menu */}
                <div className="lg:col-span-3 rounded-2xl bg-white border border-slate-200/80 p-3 shadow-[0_1px_3px_rgba(15,23,42,0.03)] h-fit space-y-1">
                  {[
                    { id: 'profile', label: 'ข้อมูลโปรไฟล์', icon: User },
                    { id: 'notifications', label: 'การแจ้งเตือน', icon: Bell },
                    { id: 'grading', label: 'เกณฑ์การตัดเกรด', icon: Sliders },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setSettingsTab(tab.id)}
                        className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition ${
                          settingsTab === tab.id
                            ? 'bg-blue-50 text-[#0b2458] font-semibold'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-[#1d4ed8]" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Settings Content Panel */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    showToast('บันทึกการตั้งค่าเรียบร้อยแล้ว');
                  }}
                  className="lg:col-span-9 rounded-2xl bg-white border border-slate-200/80 p-6 shadow-[0_1px_3px_rgba(15,23,42,0.03)] space-y-5"
                >
                  {settingsTab === 'profile' && (
                    <>
                      <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                        <div className="w-14 h-14 rounded-2xl bg-blue-100 text-[#1d4ed8] font-bold text-lg flex items-center justify-center">
                          กพ
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-900">
                            {userSettings.studentName}
                          </div>
                          <div className="text-xs text-slate-400">
                            รหัสนักศึกษา {userSettings.studentId} • {userSettings.faculty}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block text-slate-500 mb-1.5">
                            ชื่อ-นามสกุล (นักศึกษา)
                          </label>
                          <input
                            type="text"
                            value={userSettings.studentName}
                            onChange={(e) =>
                              setUserSettings((s) => ({
                                ...s,
                                studentName: e.target.value,
                              }))
                            }
                            className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-500 mb-1.5">
                            อาจารย์ที่ปรึกษา / ประจำวิชา
                          </label>
                          <input
                            type="text"
                            value={userSettings.instructorName}
                            onChange={(e) =>
                              setUserSettings((s) => ({
                                ...s,
                                instructorName: e.target.value,
                              }))
                            }
                            className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-slate-500 mb-1.5">
                            อีเมลสถาบัน
                          </label>
                          <input
                            type="email"
                            value={userSettings.email}
                            onChange={(e) =>
                              setUserSettings((s) => ({
                                ...s,
                                email: e.target.value,
                              }))
                            }
                            className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {settingsTab === 'notifications' && (
                    <div className="space-y-4 text-xs">
                      <h3 className="text-sm font-bold text-slate-900">
                        ตั้งค่าการแจ้งเตือนระบบ
                      </h3>
                      {[
                        {
                          key: 'notifyGrade',
                          title: 'แจ้งเตือนเมื่อประกาศผลการเรียนใหม่',
                          desc: 'ส่งการแจ้งเตือนทันทีเมื่อสำนักทะเบียนอนุมัติเกรดรายวิชา',
                        },
                        {
                          key: 'notifyEval',
                          title: 'แจ้งเตือนช่วงเวลาประเมินการสอน',
                          desc: 'แจ้งเตือนก่อนปิดรับแบบประเมินความพึงพอใจอาจารย์ผู้สอน',
                        },
                        {
                          key: 'autoSaveDraft',
                          title: 'บันทึกคะแนนฉบับร่างอัตโนมัติ',
                          desc: 'บันทึกข้อมูลคะแนนระหว่างกรอกลงในระบบอัตโนมัติ',
                        },
                      ].map((item) => (
                        <label
                          key={item.key}
                          className="flex items-center justify-between p-4 rounded-xl border border-slate-200/80 cursor-pointer hover:bg-slate-50"
                        >
                          <div>
                            <div className="font-semibold text-slate-800">
                              {item.title}
                            </div>
                            <div className="text-slate-400 mt-0.5">
                              {item.desc}
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={userSettings[item.key]}
                            onChange={(e) =>
                              setUserSettings((s) => ({
                                ...s,
                                [item.key]: e.target.checked,
                              }))
                            }
                            className="w-4 h-4 rounded text-[#1d4ed8]"
                          />
                        </label>
                      ))}
                    </div>
                  )}

                  {settingsTab === 'grading' && (
                    <div className="space-y-4 text-xs">
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                        <Shield className="w-4 h-4 text-[#1d4ed8]" />
                        <span>เกณฑ์การตัดเกรดมาตรฐาน (อิงเกณฑ์ 8 ระดับ)</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                          { g: 'A', range: '80 - 100 คะแนน' },
                          { g: 'B+', range: '75 - 79 คะแนน' },
                          { g: 'B', range: '70 - 74 คะแนน' },
                          { g: 'C+', range: '65 - 69 คะแนน' },
                          { g: 'C', range: '60 - 64 คะแนน' },
                          { g: 'D+', range: '55 - 59 คะแนน' },
                          { g: 'D', range: '50 - 54 คะแนน' },
                          { g: 'F', range: '0 - 49 คะแนน' },
                        ].map((item) => (
                          <div
                            key={item.g}
                            className="p-3 rounded-xl bg-[#f8fafc] border border-slate-100 flex items-center justify-between"
                          >
                            <span className="font-bold text-[#0b2458]">
                              {item.g}
                            </span>
                            <span className="text-slate-500">{item.range}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0b2458] hover:bg-[#133170] text-white text-xs font-semibold transition"
                    >
                      <Save className="w-4 h-4" /> บันทึกการตั้งค่า
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </main>
      </div>

      {/* ==================== MODAL: COURSE DETAIL & EVALUATION ==================== */}
      {selectedCourseModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/45 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-semibold text-[#1d4ed8]">
                  {selectedCourseModal.code} • {selectedCourseModal.credits} หน่วยกิต
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {selectedCourseModal.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  ผู้สอน: {selectedCourseModal.instructor}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCourseModal(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-xl bg-[#f8fafc] border border-slate-100 p-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div>
                <div className="text-slate-400">คะแนนเก็บ</div>
                <div className="font-bold text-slate-800 mt-0.5">
                  {selectedCourseModal.assignment}/30
                </div>
              </div>
              <div>
                <div className="text-slate-400">Midterm</div>
                <div className="font-bold text-slate-800 mt-0.5">
                  {selectedCourseModal.midterm}/30
                </div>
              </div>
              <div>
                <div className="text-slate-400">Final</div>
                <div className="font-bold text-slate-800 mt-0.5">
                  {selectedCourseModal.final}/40
                </div>
              </div>
            </div>

            {!selectedCourseModal.evaluated ? (
              <form onSubmit={handleSubmitEvaluation} className="space-y-3">
                <div className="text-xs font-medium text-slate-700">
                  ประเมินการสอนรายวิชานี้:
                </div>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setEvalRating(n)}
                      className="p-1.5 rounded-lg hover:bg-amber-50 transition"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          n <= evalRating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={evalComment}
                  onChange={(e) => setEvalComment(e.target.value)}
                  placeholder="ข้อเสนอแนะเพิ่มเติม..."
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#0b2458] hover:bg-[#133170] text-white text-xs font-semibold transition"
                >
                  ส่งแบบประเมินการสอน
                </button>
              </form>
            ) : (
              <div className="text-xs text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>ประเมินการสอนรายวิชานี้เรียบร้อยแล้ว</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== MODAL: CONFIRM SUBMIT GRADES ==================== */}
      {confirmSubmitOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/45 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              ยืนยันการส่งเกรดเข้าทะเบียน
            </h3>
            <p className="text-xs leading-relaxed text-slate-600">
              ต้องการยืนยันส่งผลการเรียนรายวิชา <strong>{gradingCourse}</strong>{' '}
              ภาคการศึกษาที่ <strong>{gradingSemester}</strong> เข้าสู่ระบบทะเบียนใช่หรือไม่?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setConfirmSubmitOpen(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-600 hover:bg-slate-100"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={() => {
                  setGradingStatus('ส่งแล้ว');
                  setConfirmSubmitOpen(false);
                  showToast('ส่งเกรดเข้าสำนักทะเบียนเรียบร้อยแล้ว');
                }}
                className="px-4 py-2 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-semibold"
              >
                ยืนยันส่งเกรด
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MODAL: GUIDE & NOTIFICATIONS ==================== */}
      {infoModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/45 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                {infoModal === 'guide'
                  ? 'คู่มือการใช้งาน GRADE FLOW v2.4.0'
                  : 'การแจ้งเตือนล่าสุด'}
              </h3>
              <button
                type="button"
                onClick={() => setInfoModal(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs leading-relaxed text-slate-600">
              {infoModal === 'guide'
                ? 'เลือกเมนูด้านซ้ายเพื่อสลับดูหน้าหลัก ตรวจสอบรายวิชา บันทึกคะแนน ดูรายงานสถิติผลการเรียน หรือปรับแต่งการตั้งค่าระบบ'
                : 'ประกาศผลการเรียนภาคการศึกษาที่ 1/2567 เรียบร้อยแล้ว กรุณาทำแบบประเมินการสอนในรายวิชาที่ยังค้างอยู่'}
            </p>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setInfoModal(null)}
                className="px-4 py-2 rounded-xl bg-[#0b2458] text-white text-xs font-semibold"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}