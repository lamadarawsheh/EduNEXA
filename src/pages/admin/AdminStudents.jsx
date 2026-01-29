import React, { useEffect, useMemo, useState } from 'react'
import PageHeader from './components/dashboardComponents/PageHeader';
import Table from './components/dashboardComponents/Table';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminStudents } from "../../ReduxToolkit/slices/AdminStudents"

export default function AdminStudents() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState({ key: "userName", direction: "asc" }); 
  const [filters, setFilters] = useState({
    hasPhone: "all", 
    birthDateValid: "all", 
  });

  const dispatch = useDispatch();
  const { studentsData, isLoading, error } = useSelector(
  (state) => state.adminStudents ?? { studentsData: [], isLoading: false, error: null }
  );

  useEffect(() => {
    dispatch(fetchAdminStudents());
  }, [dispatch]);
  
  useEffect(() => {
  if (studentsData.length > 0) {
    setRecords(studentsData);
  }
}, [studentsData]);


    const processedRecords = useMemo(() => {
    const data = Array.isArray(studentsData) ? [...studentsData] : [];

    const q = search.trim().toLowerCase();
    let result = !q
      ? data
      : data.filter((s) => {
          const userName = (s.userName ?? "").toLowerCase();
          const email = (s.email ?? "").toLowerCase();
          const phone = (s.phoneNumber ?? "").toLowerCase();
          return (
            userName.includes(q) ||
            email.includes(q) ||
            phone.includes(q)
          );
        });
        const hasPhone = (s) => {
      const p = (s.phoneNumber ?? "").toString().trim();
      return p.length > 0;
    };

    const birthValid = (s) => {
      const b = (s.birthDate ?? "").toString().trim();
      if (!b) return false;
      if (b === "0001-01-01") return false;
      return true;
    };

    if (filters.hasPhone === "yes") result = result.filter(hasPhone);
    if (filters.hasPhone === "no") result = result.filter((s) => !hasPhone(s));

    if (filters.birthDateValid === "valid") result = result.filter(birthValid);
    if (filters.birthDateValid === "empty") result = result.filter((s) => !birthValid(s));

    const { key, direction } = sortBy || {};
    const dir = direction === "desc" ? -1 : 1;

    const getVal = (s) => {
      const v = s?.[key];
      return v == null ? "" : String(v);
    };
    result.sort((a, b) => {
      const av = getVal(a).toLowerCase();
      const bv = getVal(b).toLowerCase();

      if (key === "birthDate") {
        const ad = av || "0000-00-00";
        const bd = bv || "0000-00-00";
        if (ad < bd) return -1 * dir;
        if (ad > bd) return 1 * dir;
        return 0;
      }

      return av.localeCompare(bv) * dir;
    });
  return result;
  }, [studentsData, search, filters, sortBy]);

    useEffect(() => {
    setRecords(processedRecords);
  }, [processedRecords]);


  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {typeof error === "string" ? error : "Failed"}</h2>;

  return (
    <div className="p-2 md:p-8 flex-col">
      <PageHeader pageName="Students Records"   input={search}
  onChange={setSearch}
  placeholder="Search by Name, Email or Number..." />
      <Table records={processedRecords} columns={["Student Name", "Email", "Phone", "Date of Birth"]}   sortBy={sortBy}
  onSortChange={setSortBy}  pageName="Students Records" />
    </div>
  )
}
