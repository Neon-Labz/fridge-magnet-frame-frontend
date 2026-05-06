export interface Customer {
  id: string;
  name: string;
  initials?: string;
  email: string;
  phone: string;
  address: string;
  [key: string]: unknown; // allow extra fields from backend
}

export interface CustomerStats {
  totalActiveCustomers: number;
  satisfactionRate: number;
  newToday: number;
}

export interface CustomerApiResponse {
  statusCode: number;
  message: string;
  data: Customer[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
