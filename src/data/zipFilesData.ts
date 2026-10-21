export interface ZipFileItem {
  id: string;
  path: string;
  name: string;
  category: 'HTML Page' | 'JavaScript' | 'CSS Stylesheet' | 'Image Asset';
  description: string;
  size: string;
  runnable: boolean;
  runUrl?: string;
  isImage?: boolean;
}

export const ZIP_FILES: ZipFileItem[] = [
  // Frontend PeoplePulse
  {
    id: 'frontend-index',
    path: 'SME-main/frontend/index.html',
    name: 'index.html',
    category: 'HTML Page',
    description: 'PeoplePulse Workforce Intelligence main dashboard with analytics and directory markup',
    size: '10.4 KB',
    runnable: true,
    runUrl: '/SME-main/frontend/index.html'
  },
  {
    id: 'frontend-script',
    path: 'SME-main/frontend/script.js',
    name: 'script.js',
    category: 'JavaScript',
    description: 'PeoplePulse core client logic: DummyJSON integration, Chart.js salary visualization, and CRUD operations',
    size: '23.8 KB',
    runnable: false
  },
  {
    id: 'frontend-style',
    path: 'SME-main/frontend/style.css',
    name: 'style.css',
    category: 'CSS Stylesheet',
    description: 'PeoplePulse complete styling sheet, CSS variables, sidebar layouts, and modal designs',
    size: '17.5 KB',
    runnable: false
  },

  // Case Study Canteen
  {
    id: 'casestudy-html',
    path: 'SME-main/casestudy/casestudy.html',
    name: 'casestudy.html',
    category: 'HTML Page',
    description: 'Smart Canteen Meal Planner interface: food item checklist, budget input, and bill calculator',
    size: '1.4 KB',
    runnable: true,
    runUrl: '/SME-main/casestudy/casestudy.html'
  },
  {
    id: 'casestudy-js',
    path: 'SME-main/casestudy/casestudy.js',
    name: 'casestudy.js',
    category: 'JavaScript',
    description: 'Canteen calculation engine: item summation loops, 10% discount on orders > ₹300, and budget affordability diagnostics',
    size: '3.4 KB',
    runnable: false
  },
  {
    id: 'casestudy-css',
    path: 'SME-main/casestudy/casestudy.css',
    name: 'casestudy.css',
    category: 'CSS Stylesheet',
    description: 'Styling for Smart Canteen Meal Planner card container, food items, and result highlights',
    size: '1.5 KB',
    runnable: false
  },

  // Porsche Web-Page
  {
    id: 'porsche-index',
    path: 'SME-main/index.html',
    name: 'index.html',
    category: 'HTML Page',
    description: 'Porsche Luxury Brand Showcase: Stuttgart heritage, 356 Roadster history, 911 debut, and vehicle gallery',
    size: '2.5 KB',
    runnable: true,
    runUrl: '/SME-main/index.html'
  },

  // LTSU Auth & Forms
  {
    id: 'login-html',
    path: 'SME-main/login.html',
    name: 'login.html',
    category: 'HTML Page',
    description: 'Lamrin Tech Skills University portal authentication login form',
    size: '829 B',
    runnable: true,
    runUrl: '/SME-main/login.html'
  },
  {
    id: 'signup-html',
    path: 'SME-main/signup.html',
    name: 'signup.html',
    category: 'HTML Page',
    description: 'LTSU student registration form with live inline uppercase transform and interactive focus styles',
    size: '6.3 KB',
    runnable: true,
    runUrl: '/SME-main/signup.html'
  },
  {
    id: 'signup-css',
    path: 'SME-main/signup.css',
    name: 'signup.css',
    category: 'CSS Stylesheet',
    description: 'Styles for student signup form, inputs, labels, and action buttons',
    size: '1.2 KB',
    runnable: false
  },
  {
    id: 'root-style',
    path: 'SME-main/style.css',
    name: 'style.css',
    category: 'CSS Stylesheet',
    description: 'Styles for login portal layouts and university header typography',
    size: '826 B',
    runnable: false
  },
  {
    id: 'javascript-js',
    path: 'SME-main/javascript.js',
    name: 'javascript.js',
    category: 'JavaScript',
    description: 'Form validation routines: name, roll number, email regex, and password confirmation',
    size: '987 B',
    runnable: false
  },

  // JavaScript Lab & Algorithms
  {
    id: 'script-html',
    path: 'SME-main/script.html',
    name: 'script.html',
    category: 'HTML Page',
    description: 'Interactive JavaScript Lab: Student Grade Calculator, Age Check, Number Sign, Even/Odd, Day Check, Factorial, and Loops',
    size: '2.8 KB',
    runnable: true,
    runUrl: '/SME-main/script.html'
  },
  {
    id: 'script-js',
    path: 'SME-main/script.js',
    name: 'script.js',
    category: 'JavaScript',
    description: 'Comprehensive JavaScript algorithms: DOM manipulation, arithmetic calculator, Factorial, Fibonacci, and Grade computation',
    size: '5.8 KB',
    runnable: false
  },
  {
    id: 'array-html',
    path: 'SME-main/array.html',
    name: 'array.html',
    category: 'HTML Page',
    description: 'Array Engineering Workbench: Min element, Max element, Sum, Even filter, Vowel extractor, and Array Search',
    size: '3.4 KB',
    runnable: true,
    runUrl: '/SME-main/array.html'
  },

  // jQuery Animation Demos
  {
    id: 'jquery-html',
    path: 'SME-main/jquery.html',
    name: 'jquery.html',
    category: 'HTML Page',
    description: 'jQuery slideToggle animation demo with collapsible panel and header button',
    size: '842 B',
    runnable: true,
    runUrl: '/SME-main/jquery.html'
  },
  {
    id: 'jquery2-html',
    path: 'SME-main/jquery2.html',
    name: 'jquery2.html',
    category: 'HTML Page',
    description: 'jQuery staged fadeIn() and fadeOut() demonstration with multi-colored visual timing blocks',
    size: '1.1 KB',
    runnable: true,
    runUrl: '/SME-main/jquery2.html'
  },

  // Image Assets
  {
    id: 'img-ltsu',
    path: 'SME-main/imgs/ltsu_logo.jpg',
    name: 'ltsu_logo.jpg',
    category: 'Image Asset',
    description: 'Official university crest badge for Lamrin Tech Skills University',
    size: '21.0 KB',
    runnable: false,
    isImage: true,
    runUrl: '/SME-main/imgs/ltsu_logo.jpg'
  },
  {
    id: 'img-porsche1',
    path: 'SME-main/imgs/porsche1.jpg',
    name: 'porsche1.jpg',
    category: 'Image Asset',
    description: 'Porsche high-performance sports car photo (Porsche 911 GT3 RS)',
    size: '27.1 KB',
    runnable: false,
    isImage: true,
    runUrl: '/SME-main/imgs/porsche1.jpg'
  },
  {
    id: 'img-porsche2',
    path: 'SME-main/imgs/porsche2.jpg',
    name: 'porsche2.jpg',
    category: 'Image Asset',
    description: 'Porsche performance sports car photo (Porsche Taycan Turbo S)',
    size: '213.3 KB',
    runnable: false,
    isImage: true,
    runUrl: '/SME-main/imgs/porsche2.jpg'
  },
  {
    id: 'img-porsche3',
    path: 'SME-main/imgs/porsche3.avif',
    name: 'porsche3.avif',
    category: 'Image Asset',
    description: 'Porsche mid-engine coupe photo (Porsche 718 Cayman GT4)',
    size: '18.5 KB',
    runnable: false,
    isImage: true,
    runUrl: '/SME-main/imgs/porsche3.avif'
  },
  {
    id: 'img-linkedin',
    path: 'SME-main/imgs/linkdein.png',
    name: 'linkdein.png',
    category: 'Image Asset',
    description: 'LinkedIn brand icon for social contact links',
    size: '1.1 KB',
    runnable: false,
    isImage: true,
    runUrl: '/SME-main/imgs/linkdein.png'
  },
  {
    id: 'img-instagram',
    path: 'SME-main/imgs/intagram.jpg',
    name: 'intagram.jpg',
    category: 'Image Asset',
    description: 'Instagram brand photo icon for social contact links',
    size: '23.0 KB',
    runnable: false,
    isImage: true,
    runUrl: '/SME-main/imgs/intagram.jpg'
  }
];
