export interface Employee {
  id: number | string;
  employee_name: string;
  employee_age: number;
  employee_salary: number;
  employee_image?: string;
  employee_department?: string;
  employee_title?: string;
  email?: string;
  phone?: string;
  location?: string;
}

export interface CanteenFoodItem {
  id: string;
  name: string;
  price: number;
  category: 'Snacks' | 'Meals' | 'Beverages' | 'Desserts';
  calories: number;
  icon: string;
  popular?: boolean;
}

export type ActiveModule = 'peoplepulse' | 'canteen' | 'porsche' | 'ltsu-portal' | 'js-lab' | 'explorer';
