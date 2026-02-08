const safeParseJson = (value) => {
  if (!value) {
    return null;
  }
  try {
    return JSON.parse(value);
  } catch (error) {
    return null;
  }
};

const normalizeId = (value) => {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim();
};

const decodeJwtPayload = (token) => {
  if (!token) {
    return null;
  }
  const parts = token.split(".");
  if (parts.length !== 3) {
    return null;
  }
  const raw = parts[1].replace(/-/g, "+").replace(/_/g, "/");
  const padded = raw + "=".repeat((4 - (raw.length % 4)) % 4);
  if (typeof atob !== "function") {
    return null;
  }
  try {
    return JSON.parse(atob(padded));
  } catch (error) {
    return null;
  }
};

export const getStudentIdCandidates = (primaryId) => {
  const ids = [];
  const pushId = (value) => {
    const normalized = normalizeId(value);
    if (normalized) {
      ids.push(normalized);
    }
  };

  pushId(primaryId);

  const payload = decodeJwtPayload(localStorage.getItem("token"));
  pushId(payload?.sub);
  pushId(payload?.id);
  pushId(payload?.studentId);

  const storedUser = safeParseJson(localStorage.getItem("user"));
  pushId(storedUser?.id);
  pushId(storedUser?.studentId);
  pushId(storedUser?.sub);
  pushId(storedUser?.user?.id);
  pushId(storedUser?.user?.studentId);
  pushId(storedUser?.user?.sub);

  return Array.from(new Set(ids));
};

export const getStudentIdFromStorage = () => {
  const [firstId] = getStudentIdCandidates();
  return firstId || null;
};
