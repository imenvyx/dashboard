import {
  User,
  Company,
  UserCompanyAssignment,
  UserReportAssignment,
  Report,
} from "@/types/index";

// Keys para localStorage
const USERS_KEY = "bi-dashboard-users";
const COMPANIES_KEY = "bi-dashboard-companies";
const REPORTS_KEY = "bi-dashboard-reports";
const USER_COMPANY_ASSIGNMENTS_KEY = "bi-user-company-assignments";
const USER_REPORT_ASSIGNMENTS_KEY = "bi-user-report-assignments";

// Funciones CRUD para usuarios
export const getUsers = (): User[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveUser = (user: User): User[] => {
  const users = getUsers();
  const existingIndex = users.findIndex((u) => u.id === user.id);

  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }

  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return users;
};

export const deleteUser = (id: string): User[] => {
  const users = getUsers().filter((user) => user.id !== id);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  // Eliminar asignaciones relacionadas
  const userCompanyAssignments = getUserCompanyAssignments().filter(
    (a) => a.userId !== id
  );
  localStorage.setItem(
    USER_COMPANY_ASSIGNMENTS_KEY,
    JSON.stringify(userCompanyAssignments)
  );

  const userReportAssignments = getUserReportAssignments().filter(
    (a) => a.userId !== id
  );
  localStorage.setItem(
    USER_REPORT_ASSIGNMENTS_KEY,
    JSON.stringify(userReportAssignments)
  );

  return users;
};

// Funciones CRUD para empresas
export const getCompanies = (): Company[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(COMPANIES_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveCompany = (company: Company): Company[] => {
  const companies = getCompanies();
  const existingIndex = companies.findIndex((c) => c.id === company.id);

  if (existingIndex >= 0) {
    companies[existingIndex] = company;
  } else {
    companies.push(company);
  }

  localStorage.setItem(COMPANIES_KEY, JSON.stringify(companies));
  return companies;
};

export const deleteCompany = (id: string): Company[] => {
  const companies = getCompanies().filter((company) => company.id !== id);
  localStorage.setItem(COMPANIES_KEY, JSON.stringify(companies));

  // Eliminar asignaciones relacionadas
  const userCompanyAssignments = getUserCompanyAssignments().filter(
    (a) => a.companyId !== id
  );
  localStorage.setItem(
    USER_COMPANY_ASSIGNMENTS_KEY,
    JSON.stringify(userCompanyAssignments)
  );

  return companies;
};

// Funciones para reportes
export const getReports = (): Report[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(REPORTS_KEY);
  return data ? JSON.parse(data) : [];
};

// Funciones para asignaciones
export const getUserCompanyAssignments = (): UserCompanyAssignment[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(USER_COMPANY_ASSIGNMENTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveUserCompanyAssignment = (
  assignment: UserCompanyAssignment
): UserCompanyAssignment[] => {
  const assignments = getUserCompanyAssignments();
  const existingIndex = assignments.findIndex(
    (a) =>
      a.userId === assignment.userId && a.companyId === assignment.companyId
  );

  if (existingIndex >= 0) {
    assignments[existingIndex] = assignment;
  } else {
    assignments.push(assignment);
  }

  localStorage.setItem(
    USER_COMPANY_ASSIGNMENTS_KEY,
    JSON.stringify(assignments)
  );
  return assignments;
};

export const deleteUserCompanyAssignment = (
  userId: string,
  companyId: string
): UserCompanyAssignment[] => {
  const assignments = getUserCompanyAssignments().filter(
    (a) => !(a.userId === userId && a.companyId === companyId)
  );
  localStorage.setItem(
    USER_COMPANY_ASSIGNMENTS_KEY,
    JSON.stringify(assignments)
  );
  return assignments;
};

export const getUserReportAssignments = (): UserReportAssignment[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(USER_REPORT_ASSIGNMENTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveUserReportAssignment = (
  assignment: UserReportAssignment
): UserReportAssignment[] => {
  const assignments = getUserReportAssignments();
  const existingIndex = assignments.findIndex(
    (a) => a.userId === assignment.userId && a.reportId === assignment.reportId
  );

  if (existingIndex >= 0) {
    assignments[existingIndex] = assignment;
  } else {
    assignments.push(assignment);
  }

  localStorage.setItem(
    USER_REPORT_ASSIGNMENTS_KEY,
    JSON.stringify(assignments)
  );
  return assignments;
};

export const deleteUserReportAssignment = (
  userId: string,
  reportId: string
): UserReportAssignment[] => {
  const assignments = getUserReportAssignments().filter(
    (a) => !(a.userId === userId && a.reportId === reportId)
  );
  localStorage.setItem(
    USER_REPORT_ASSIGNMENTS_KEY,
    JSON.stringify(assignments)
  );
  return assignments;
};

// Funciones para obtener datos relacionados
export const getUserCompanies = (userId: string): Company[] => {
  const assignments = getUserCompanyAssignments().filter(
    (a) => a.userId === userId
  );
  const companyIds = assignments.map((a) => a.companyId);
  return getCompanies().filter((company) => companyIds.includes(company.id));
};

export const getUserReports = (userId: string): Report[] => {
  const assignments = getUserReportAssignments().filter(
    (a) => a.userId === userId
  );
  const reportIds = assignments.map((a) => a.reportId);
  return getReports().filter((report: Report) => reportIds.includes(report.id));
};

export const getCompanyUsers = (companyId: string): User[] => {
  const assignments = getUserCompanyAssignments().filter(
    (a) => a.companyId === companyId
  );
  const userIds = assignments.map((a) => a.userId);
  return getUsers().filter((user) => userIds.includes(user.id));
};

export const getReportUsers = (reportId: string): User[] => {
  const assignments = getUserReportAssignments().filter(
    (a) => a.reportId === reportId
  );
  const userIds = assignments.map((a) => a.userId);
  return getUsers().filter((user) => userIds.includes(user.id));
};
