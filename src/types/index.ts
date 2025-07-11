export type UserType = {
  email: string;
  companies: string[];
  reports: string[];
};

export interface AuthStoreType {
  user: UserType | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export interface Report {
  id: string;
  name: string;
  cards: {
    total: number;
    average: number;
  };
  line: {
    date: string;
    value: number;
  }[];
  bar: {
    category: string;
    value: number;
  }[];
}

export interface ReportsData {
  reports: Report[];
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
}

export interface UserCompanyAssignment {
  userId: string;
  companyId: string;
}

export interface UserReportAssignment {
  userId: string;
  reportId: string;
}
