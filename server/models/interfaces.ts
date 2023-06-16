export interface User {
  name: string;
  email: string;
  password: string;
  notif_due: boolean;
  notif_opt: boolean;
  notif_freq: number;
  categories: Category[];
}

export interface Category {
  name: string;
  color: string;
  items: Item[];
  owner: User;
}
export interface Item {
  start_date: Date;
  checked: boolean;
  freq_weeks: number;
}
