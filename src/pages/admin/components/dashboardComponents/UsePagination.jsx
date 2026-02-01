import { useMemo, useState } from "react";

export default function UsePagination(items = [], pageSize = 12) {
  const [page, setPage] = useState(1);

  const totalItems = items?.length ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const currentItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return (items ?? []).slice(start, start + pageSize);
  }, [items, page, pageSize]);

  const goTo = (p) => {
    const next = Math.min(Math.max(1, p), totalPages);
    setPage(next);
  };

  const next = () => goTo(page + 1);
  const prev = () => goTo(page - 1);
  const reset = () => setPage(1);

  return { page, totalPages, totalItems, pageSize, currentItems, goTo, next, prev, reset };
}
