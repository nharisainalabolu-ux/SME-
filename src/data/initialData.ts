import { Employee, CanteenFoodItem } from '../types';

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 1,
    employee_name: 'Emily Johnson',
    employee_age: 28,
    employee_salary: 32500,
    employee_department: 'Engineering',
    employee_title: 'Frontend Developer',
    email: 'emily.johnson@peoplepulse.io',
    phone: '+91 98765 43210',
    location: 'Bangalore, India'
  },
  {
    id: 2,
    employee_name: 'Michael Williams',
    employee_age: 35,
    employee_salary: 47000,
    employee_department: 'Engineering',
    employee_title: 'Senior Backend Engineer',
    email: 'michael.w@peoplepulse.io',
    phone: '+91 98765 43211',
    location: 'Hyderabad, India'
  },
  {
    id: 3,
    employee_name: 'Sophia Brown',
    employee_age: 31,
    employee_salary: 54000,
    employee_department: 'Product',
    employee_title: 'Product Manager',
    email: 'sophia.brown@peoplepulse.io',
    phone: '+91 98765 43212',
    location: 'Pune, India'
  },
  {
    id: 4,
    employee_name: 'James Rodriguez',
    employee_age: 42,
    employee_salary: 78000,
    employee_department: 'Executive',
    employee_title: 'Director of Technology',
    email: 'james.r@peoplepulse.io',
    phone: '+91 98765 43213',
    location: 'Mumbai, India'
  },
  {
    id: 5,
    employee_name: 'Emma Miller',
    employee_age: 26,
    employee_salary: 38000,
    employee_department: 'Design',
    employee_title: 'UI/UX Designer',
    email: 'emma.miller@peoplepulse.io',
    phone: '+91 98765 43214',
    location: 'Bangalore, India'
  },
  {
    id: 6,
    employee_name: 'Olivia Davis',
    employee_age: 29,
    employee_salary: 42500,
    employee_department: 'Marketing',
    employee_title: 'Growth Strategist',
    email: 'olivia.davis@peoplepulse.io',
    phone: '+91 98765 43215',
    location: 'Delhi NCR, India'
  },
  {
    id: 7,
    employee_name: 'Alexander Garcia',
    employee_age: 38,
    employee_salary: 62000,
    employee_department: 'Finance',
    employee_title: 'Financial Controller',
    email: 'alex.garcia@peoplepulse.io',
    phone: '+91 98765 43216',
    location: 'Mumbai, India'
  },
  {
    id: 8,
    employee_name: 'Mia Martinez',
    employee_age: 24,
    employee_salary: 29000,
    employee_department: 'People Operations',
    employee_title: 'HR Coordinator',
    email: 'mia.martinez@peoplepulse.io',
    phone: '+91 98765 43217',
    location: 'Chandigarh, India'
  },
  {
    id: 9,
    employee_name: 'Daniel Anderson',
    employee_age: 33,
    employee_salary: 51000,
    employee_department: 'Engineering',
    employee_title: 'DevOps & Cloud Architect',
    email: 'daniel.a@peoplepulse.io',
    phone: '+91 98765 43218',
    location: 'Bangalore, India'
  },
  {
    id: 10,
    employee_name: 'Isabella Taylor',
    employee_age: 27,
    employee_salary: 36000,
    employee_department: 'Customer Success',
    employee_title: 'Enterprise Support Lead',
    email: 'isabella.t@peoplepulse.io',
    phone: '+91 98765 43219',
    location: 'Chennai, India'
  },
  {
    id: 11,
    employee_name: 'Ethan Thomas',
    employee_age: 45,
    employee_salary: 85000,
    employee_department: 'Executive',
    employee_title: 'Chief Operating Officer',
    email: 'ethan.thomas@peoplepulse.io',
    phone: '+91 98765 43220',
    location: 'Gurgaon, India'
  },
  {
    id: 12,
    employee_name: 'Ava Jackson',
    employee_age: 30,
    employee_salary: 49000,
    employee_department: 'Data & AI',
    employee_title: 'Machine Learning Specialist',
    email: 'ava.jackson@peoplepulse.io',
    phone: '+91 98765 43221',
    location: 'Hyderabad, India'
  }
];

export const CANTEEN_FOOD_ITEMS: CanteenFoodItem[] = [
  {
    id: 'burger',
    name: 'Burger',
    price: 80,
    category: 'Meals',
    calories: 420,
    icon: '🍔',
    popular: true
  },
  {
    id: 'sandwich',
    name: 'Sandwich',
    price: 60,
    category: 'Snacks',
    calories: 280,
    icon: '🥪',
    popular: true
  },
  {
    id: 'pizza',
    name: 'Pizza',
    price: 120,
    category: 'Meals',
    calories: 580,
    icon: '🍕',
    popular: true
  },
  {
    id: 'fries',
    name: 'French Fries',
    price: 50,
    category: 'Snacks',
    calories: 320,
    icon: '🍟',
    popular: true
  },
  {
    id: 'coffee',
    name: 'Cold Coffee',
    price: 70,
    category: 'Beverages',
    calories: 190,
    icon: '🥤',
    popular: true
  },
  {
    id: 'samosa',
    name: 'Crispy Samosa (2 pcs)',
    price: 30,
    category: 'Snacks',
    calories: 260,
    icon: '🥟'
  },
  {
    id: 'chai',
    name: 'Special Masala Chai',
    price: 20,
    category: 'Beverages',
    calories: 90,
    icon: '☕'
  },
  {
    id: 'brownie',
    name: 'Chocolate Brownie',
    price: 90,
    category: 'Desserts',
    calories: 340,
    icon: '🍫'
  }
];
