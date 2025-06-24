// src/tabs/advancedcookiemanager.tsx
import React, { useState, useEffect, useCallback } from "react";
import "../style.css"; // Correct path to the style.css in src/ directory
import {
  Search as SearchIcon,
  Trash2,
  Edit3,
  Save,
  X,
  Sun,
  Moon,
  CheckCircle,
  XCircle,
  Info as InfoIconLucide, // Renamed to avoid conflict
  Loader2,
  RefreshCw, // Added for refresh button
  Cookie as CookieIconLucide, // Added for header
} from "lucide-react";

// Define Cookie interface
interface Cookie extends chrome.cookies.Cookie {}

interface AdvancedCookieManagerPageProps {
  initialDomain?: string;
  isPopupMode?: boolean; // If this component is ever rendered inside the popup (e.g. in a tab)
  currentGlobalTheme?: "light" | "dark";
  onGlobalThemeToggle?: () => void;
}

const AdvancedCookieManagerPage = ({
  initialDomain,
  isPopupMode = false, // Default to false, as this is primarily a standalone page
  currentGlobalTheme,
  onGlobalThemeToggle,
}: AdvancedCookieManagerPageProps) => {
  const [allCookies, setAllCookies] = useState<Cookie[]>([]);
  const [filteredCookies, setFilteredCookies] = useState<Cookie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<Cookie>>({});
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const [domainFilter, setDomainFilter] = useState<string>("all");
  const [uniqueDomains, setUniqueDomains] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [componentTheme, setComponentTheme] = useState<"light" | "dark">(
    "light"
  );

  const showTimedMessage = useCallback(
    (
      text: string,
      type: "success" | "error" | "info",
      duration: number = 4000
    ) => {
      setMessage({ text, type });
      setTimeout(() => setMessage(null), duration);
    },
    []
  );

  const loadCookies = useCallback(() => {
    setIsLoading(true);
    setMessage(null);
    chrome.cookies.getAll({}, (loadedCookiesFromApi) => {
      if (chrome.runtime.lastError) {
        showTimedMessage(
          `Failed to load cookies: ${chrome.runtime.lastError.message}`,
          "error"
        );
        setIsLoading(false);
        return;
      }
      const typedCookies = loadedCookiesFromApi as Cookie[];
      const sortedCookies = typedCookies.sort((a, b) => {
        const domainComp = a.domain
          .toLowerCase()
          .localeCompare(b.domain.toLowerCase());
        if (domainComp !== 0) return domainComp;
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      });
      setAllCookies(sortedCookies);
      const domains = Array.from(
        new Set(sortedCookies.map((cookie) => cookie.domain.replace(/^\./, "")))
      ).sort();
      setUniqueDomains(domains);
      setIsLoading(false);
    });
  }, [showTimedMessage]);

  useEffect(() => {
    if (isPopupMode && currentGlobalTheme) {
      if (componentTheme !== currentGlobalTheme) {
        setComponentTheme(currentGlobalTheme);
      }
    } else {
      chrome.storage.local.get("theme", (result) => {
        const systemPrefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        const storedTheme =
          result.theme || (systemPrefersDark ? "dark" : "light");
        setComponentTheme(storedTheme);
        document.documentElement.classList.toggle(
          "dark",
          storedTheme === "dark"
        );
      });
    }
    loadCookies();
  }, [isPopupMode, currentGlobalTheme, loadCookies, componentTheme]);

  useEffect(() => {
    let newDomainFilter = domainFilter;
    if (isPopupMode) {
      if (!searchTerm) {
        const proposedFilter =
          initialDomain && initialDomain.trim() !== ""
            ? initialDomain.replace(/^\./, "")
            : "all";
        if (domainFilter !== proposedFilter) {
          newDomainFilter = proposedFilter;
        }
      }
    } else {
      if (
        !searchTerm &&
        domainFilter === "all" &&
        initialDomain &&
        initialDomain.trim() !== ""
      ) {
        newDomainFilter = initialDomain.replace(/^\./, "");
      }
    }

    if (newDomainFilter !== domainFilter) {
      setDomainFilter(newDomainFilter);
    }
  }, [initialDomain, isPopupMode, searchTerm, domainFilter]);

  const applyFilters = useCallback(() => {
    let filtered = [...allCookies];
    if (domainFilter !== "all") {
      filtered = filtered.filter(
        (cookie) =>
          cookie.domain === domainFilter ||
          cookie.domain === `.${domainFilter}` ||
          `.${cookie.domain}` === domainFilter
      );
    }
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (cookie) =>
          cookie.name.toLowerCase().includes(searchLower) ||
          cookie.domain.toLowerCase().includes(searchLower) ||
          (cookie.value && cookie.value.toLowerCase().includes(searchLower))
      );
    }
    setFilteredCookies(filtered);
  }, [allCookies, domainFilter, searchTerm]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const getCookieUniqueKey = (cookie: Cookie) =>
    `${cookie.name}@${cookie.domain}@${cookie.path || "/"}`;

  const startEditing = (cookie: Cookie) => {
    setIsEditing(getCookieUniqueKey(cookie));
    setEditValues({ ...cookie });
  };

  const cancelEditing = () => {
    setIsEditing(null);
    setEditValues({});
  };

  const handleEditChange = (
    field: keyof Cookie | "expirationDateInputString",
    value: any
  ) => {
    setEditValues((prev) => {
      if (field === "expirationDateInputString") {
        const dateTimestamp = value
          ? Math.floor(new Date(value).getTime() / 1000)
          : undefined;
        return { ...prev, expirationDate: dateTimestamp, session: !value };
      }
      if (["secure", "httpOnly", "hostOnly", "session"].includes(field)) {
        return { ...prev, [field]: Boolean(value) };
      }
      return { ...prev, [field]: value };
    });
  };

  const saveCookie = async (originalCookie: Cookie) => {
    if (
      !editValues.name?.trim() ||
      !editValues.domain?.trim() ||
      !editValues.path?.trim()
    ) {
      showTimedMessage("Name, domain, and path are required.", "error");
      return;
    }

    const normalizedDomain = editValues.domain.startsWith(".")
      ? editValues.domain.substring(1)
      : editValues.domain;

    const details: chrome.cookies.SetDetails = {
      url: `http${editValues.secure ? "s" : ""}://${normalizedDomain}${
        editValues.path
      }`,
      name: editValues.name,
      value: editValues.value || "",
      domain: editValues.domain,
      path: editValues.path,
      secure: editValues.secure || false,
      httpOnly: editValues.httpOnly || false,
      sameSite: editValues.sameSite || "unspecified",
      storeId: originalCookie.storeId,
    };

    if (
      typeof editValues.expirationDate === "number" &&
      !isNaN(editValues.expirationDate) &&
      !editValues.session
    ) {
      details.expirationDate = editValues.expirationDate;
    } else if (editValues.session) {
      delete details.expirationDate;
    }

    const oldKey = getCookieUniqueKey(originalCookie);
    const newKey = getCookieUniqueKey({
      ...originalCookie,
      ...editValues,
    } as Cookie);

    if (oldKey !== newKey) {
      const originalUrl = `http${originalCookie.secure ? "s" : ""}://${
        originalCookie.domain.startsWith(".")
          ? originalCookie.domain.substring(1)
          : originalCookie.domain
      }${originalCookie.path || "/"}`;
      try {
        await chrome.cookies.remove({
          url: originalUrl,
          name: originalCookie.name,
          storeId: originalCookie.storeId,
        });
      } catch (e: any) {
        console.warn(
          "Old cookie removal failed during update (key changed):",
          e.message
        );
      }
    }

    try {
      const saved = await chrome.cookies.set(details);
      if (saved) {
        showTimedMessage("Cookie saved!", "success");
        loadCookies();
        cancelEditing();
      } else {
        showTimedMessage(
          chrome.runtime.lastError?.message ||
            "Failed to save cookie. Check console for details.",
          "error"
        );
        console.error(
          "Failed to save cookie, details:",
          details,
          "lastError:",
          chrome.runtime.lastError?.message
        );
      }
    } catch (e: any) {
      showTimedMessage(`Save error: ${e.message}`, "error");
      console.error("Exception during cookie save:", e, "details:", details);
    }
  };

  const deleteCookie = async (cookie: Cookie) => {
    const url = `http${cookie.secure ? "s" : ""}://${
      cookie.domain.startsWith(".") ? cookie.domain.substring(1) : cookie.domain
    }${cookie.path || "/"}`;
    try {
      const d = await chrome.cookies.remove({
        url,
        name: cookie.name,
        storeId: cookie.storeId,
      });
      if (d) {
        showTimedMessage(`Cookie "${d.name}" deleted.`, "success");
        loadCookies();
      } else {
        showTimedMessage(
          chrome.runtime.lastError?.message || "Delete failed.",
          "error"
        );
      }
    } catch (e: any) {
      showTimedMessage(`Delete error: ${e.message}`, "error");
    }
  };

  const deleteAllFilteredCookies = async () => {
    if (filteredCookies.length === 0) {
      showTimedMessage("No cookies selected by filter.", "info");
      return;
    }
    if (
      !window.confirm(
        `Delete ${filteredCookies.length} cookie(s)? This action cannot be undone.`
      )
    )
      return;

    setIsLoading(true);
    let s = 0,
      f = 0;
    const cookiesToDelete = [...filteredCookies];

    for (const c of cookiesToDelete) {
      const url = `http${c.secure ? "s" : ""}://${
        c.domain.startsWith(".") ? c.domain.substring(1) : c.domain
      }${c.path || "/"}`;
      try {
        const d = await chrome.cookies.remove({
          url,
          name: c.name,
          storeId: c.storeId,
        });
        if (d) s++;
        else f++;
      } catch (e) {
        f++;
        console.error("Bulk delete error for:", c.name, e);
      }
    }
    showTimedMessage(
      `Deleted ${s} cookie(s).${f > 0 ? ` ${f} failed.` : ""}`,
      s > 0 ? "success" : f > 0 ? "error" : "info"
    );
    loadCookies();
  };

  const formatDate = (ts?: number): string =>
    ts
      ? new Date(ts * 1000).toLocaleString([], {
          year: "2-digit",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "Session";

  const getExpDateForInput = (ts?: number): string =>
    ts ? new Date(ts * 1000).toISOString().slice(0, 16) : "";

  const togglePageTheme = () => {
    if (isPopupMode && onGlobalThemeToggle) {
      onGlobalThemeToggle();
    } else {
      const newTheme = componentTheme === "light" ? "dark" : "light";
      setComponentTheme(newTheme);
      chrome.storage.local.set({ theme: newTheme });
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    }
  };

  const getMsgIcon = (type: "success" | "error" | "info") => {
    const iconProps = { className: "alert-icon" };
    return {
      success: <CheckCircle {...iconProps} />,
      error: <XCircle {...iconProps} />,
      info: <InfoIconLucide {...iconProps} />,
    }[type];
  };

  const renderCookieFlags = (cookie: Cookie) => (
    <div className="flex flex-col gap-0.5 items-start">
      {cookie.secure && <span className="badge badge-success">Secure</span>}
      {cookie.httpOnly && <span className="badge badge-info">HttpOnly</span>}
      {cookie.hostOnly && <span className="badge badge-purple">HostOnly</span>}
      {cookie.session && <span className="badge badge-warning">Session</span>}
      {cookie.sameSite && cookie.sameSite !== "unspecified" && (
        <span
          className={`badge ${
            {
              lax: "badge-purple",
              strict: "badge-orange",
              no_restriction: "badge-gray",
            }[cookie.sameSite] || "badge-gray"
          }`}
        >
          {cookie.sameSite.charAt(0).toUpperCase() +
            cookie.sameSite.slice(1).replace("_", " ")}
        </span>
      )}
    </div>
  );

  return (
    <div
      className={`theme-transition custom-scrollbar ${
        isPopupMode
          ? "p-1 bg-inherit text-inherit"
          : "min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-4 sm:p-6 lg:p-8"
      }`}
    >
      <header
        className={`cookie-manager-header ${
          isPopupMode ? "pt-0 pb-2" : "mb-6"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          {!isPopupMode && (
            <div className="flex items-center gap-3">
              <CookieIconLucide
                size={32}
                className="text-blue-600 dark:text-blue-400 flex-shrink-0"
              />
              <h1 className="cookie-manager-title text-2xl font-bold">
                Advanced Cookie Manager
              </h1>
            </div>
          )}
          <div
            className={`flex items-center gap-2 ${
              isPopupMode ? "w-full justify-end" : "sm:ml-auto"
            }`}
          >
            <button
              onClick={loadCookies}
              className="btn btn-secondary btn-sm p-1.5"
              title="Refresh Cookies"
              disabled={isLoading}
            >
              <RefreshCw size={16} className={isLoading ? "spin" : ""} />
            </button>
            <button
              onClick={togglePageTheme}
              className="btn btn-secondary btn-sm p-1.5"
              title={`Switch to ${
                componentTheme === "light" ? "dark" : "light"
              } mode`}
            >
              {componentTheme === "light" ? (
                <Moon size={16} />
              ) : (
                <Sun size={16} />
              )}
            </button>
          </div>
        </div>
      </header>

      {message && (
        <div
          className={`alert mb-4 ${
            message.type === "success"
              ? "alert-success"
              : message.type === "error"
              ? "alert-danger"
              : "alert-info"
          }`}
        >
          {getMsgIcon(message.type)}
          <div className="alert-content">
            <p className="text-xs">{message.text}</p>
          </div>
        </div>
      )}

      <section
        className={`filters-panel ${
          isPopupMode ? "mb-3 p-2" : "mb-6 p-4 shadow-md rounded-lg"
        }`}
      >
        <div
          className={`filters-grid ${
            isPopupMode ? "gap-2" : "gap-4 md:grid-cols-3"
          } items-end`}
        >
          <div className="search-input-container">
            {!isPopupMode && (
              <label
                htmlFor="cookieSearch"
                className="search-input-label block mb-1.5 text-xs font-medium text-slate-600 dark:text-slate-300"
              >
                Search Cookies
              </label>
            )}
            <div className="relative">
              <SearchIcon className="search-icon" />
              <input
                type="text"
                id="cookieSearch"
                placeholder="Search name, domain, value..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-sm pl-8 sm:pl-9 w-full"
                aria-label={isPopupMode ? "Search Cookies" : undefined}
              />
            </div>
          </div>

          <div>
            {!isPopupMode && (
              <label
                htmlFor="domainFilter"
                className="domain-filter-label block mb-1.5 text-xs font-medium text-slate-600 dark:text-slate-300"
              >
                Filter by Domain
              </label>
            )}
            <select
              id="domainFilter"
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              className={`domain-select input input-sm w-full ${
                isPopupMode ? "md:w-full" : ""
              }`}
              aria-label={isPopupMode ? "Filter by Domain" : undefined}
            >
              <option value="all">All Domains ({allCookies.length})</option>
              {uniqueDomains.map((d) => (
                <option key={d} value={d}>
                  {d} (
                  {
                    allCookies.filter(
                      (c) => c.domain === d || c.domain === `.${d}`
                    ).length
                  }
                  )
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={deleteAllFilteredCookies}
            disabled={filteredCookies.length === 0 || isLoading}
            className="btn btn-danger btn-sm w-full"
          >
            <Trash2 size={14} className="mr-1.5" /> Del. Filtered (
            {filteredCookies.length})
          </button>
        </div>
      </section>

      {isLoading ? (
        <div className="loading-container py-10">
          <Loader2 size={isPopupMode ? 24 : 36} className="loading-icon" />
          <p
            className={`loading-text ${
              isPopupMode ? "text-sm" : "text-base"
            } mt-2`}
          >
            Loading cookies...
          </p>
        </div>
      ) : (
        <section
          className={`table-container ${
            isPopupMode ? "shadow-md" : "shadow-lg rounded-lg"
          }`}
        >
          <div className="table-scroll-container">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
              <thead className="table-header">
                <tr>
                  <th scope="col" className="table-header-cell">
                    Name
                  </th>
                  <th scope="col" className="table-header-cell">
                    Domain
                  </th>
                  <th scope="col" className="table-header-cell">
                    Value
                  </th>
                  <th scope="col" className="table-header-cell">
                    Expires
                  </th>
                  <th scope="col" className="table-header-cell">
                    Path
                  </th>
                  <th scope="col" className="table-header-cell">
                    Flags
                  </th>
                  <th scope="col" className="table-header-cell-actions">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="table-body">
                {filteredCookies.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="empty-table-message py-8">
                      {searchTerm || domainFilter !== "all"
                        ? "No cookies matching filters."
                        : "No cookies found."}
                    </td>
                  </tr>
                ) : (
                  filteredCookies.map((cookie) => (
                    <tr key={getCookieUniqueKey(cookie)} className="table-row">
                      {isEditing === getCookieUniqueKey(cookie) ? (
                        <>
                          {/* Edit mode cells */}
                          <td className="table-cell py-2 px-2">
                            <input
                              type="text"
                              value={editValues.name || ""}
                              onChange={(e) =>
                                handleEditChange("name", e.target.value)
                              }
                              className="input input-xs w-full min-w-[100px]"
                            />
                          </td>
                          <td className="table-cell py-2 px-2">
                            <input
                              type="text"
                              value={editValues.domain || ""}
                              onChange={(e) =>
                                handleEditChange("domain", e.target.value)
                              }
                              className="input input-xs w-full min-w-[120px]"
                            />
                          </td>
                          <td className="table-cell py-2 px-2">
                            <textarea
                              value={editValues.value || ""}
                              onChange={(e) =>
                                handleEditChange("value", e.target.value)
                              }
                              className="input input-xs w-full min-w-[150px] h-16 resize-y"
                            />
                          </td>
                          <td className="table-cell py-2 px-2">
                            <input
                              type="datetime-local"
                              disabled={!!editValues.session}
                              value={getExpDateForInput(
                                editValues.expirationDate
                              )}
                              onChange={(e) =>
                                handleEditChange(
                                  "expirationDateInputString",
                                  e.target.value
                                )
                              }
                              className="input input-xs w-full min-w-[150px]"
                            />
                            <label className="checkbox-label mt-1.5 text-xs">
                              <input
                                type="checkbox"
                                checked={!!editValues.session}
                                onChange={(e) =>
                                  handleEditChange("session", e.target.checked)
                                }
                                className="form-checkbox mr-1"
                              />
                              Session
                            </label>
                          </td>
                          <td className="table-cell py-2 px-2">
                            <input
                              type="text"
                              value={editValues.path || ""}
                              onChange={(e) =>
                                handleEditChange("path", e.target.value)
                              }
                              className="input input-xs w-full min-w-[70px]"
                            />
                          </td>
                          <td className="table-cell py-2 px-2 whitespace-nowrap align-top">
                            <div className="space-y-1">
                              <label className="checkbox-label text-xs">
                                <input
                                  type="checkbox"
                                  checked={!!editValues.secure}
                                  onChange={(e) =>
                                    handleEditChange("secure", e.target.checked)
                                  }
                                  className="form-checkbox mr-1"
                                />
                                Secure
                              </label>
                              <label className="checkbox-label text-xs">
                                <input
                                  type="checkbox"
                                  checked={!!editValues.httpOnly}
                                  onChange={(e) =>
                                    handleEditChange(
                                      "httpOnly",
                                      e.target.checked
                                    )
                                  }
                                  className="form-checkbox mr-1"
                                />
                                HttpOnly
                              </label>
                              <label className="checkbox-label text-xs">
                                <input
                                  type="checkbox"
                                  checked={!!editValues.hostOnly}
                                  onChange={(e) =>
                                    handleEditChange(
                                      "hostOnly",
                                      e.target.checked
                                    )
                                  }
                                  className="form-checkbox mr-1"
                                />
                                HostOnly
                              </label>
                            </div>
                            <label className="select-label text-xs mt-1.5">
                              SameSite:
                            </label>
                            <select
                              value={editValues.sameSite || "unspecified"}
                              onChange={(e) =>
                                handleEditChange(
                                  "sameSite",
                                  e.target
                                    .value as chrome.cookies.SameSiteStatus
                                )
                              }
                              className="input input-xs w-full mt-0.5"
                            >
                              <option value="unspecified">Unspecified</option>
                              <option value="no_restriction">
                                No Restriction
                              </option>
                              <option value="lax">Lax</option>
                              <option value="strict">Strict</option>
                            </select>
                          </td>
                          <td className="table-cell-actions py-2 px-2">
                            <div className="editing-actions flex flex-col items-stretch gap-1.5">
                              <button
                                onClick={() => saveCookie(cookie)}
                                className="btn btn-success btn-xs"
                              >
                                <Save size={12} className="mr-1" /> Save
                              </button>
                              <button
                                onClick={cancelEditing}
                                className="btn btn-secondary btn-xs"
                              >
                                <X size={12} className="mr-1" /> Cancel
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="table-cell-name">{cookie.name}</td>
                          <td className="table-cell">{cookie.domain}</td>
                          <td className="table-cell-value" title={cookie.value}>
                            <span className="table-cell-value-content">
                              {cookie.value}
                            </span>
                          </td>
                          <td className="table-cell">
                            {formatDate(cookie.expirationDate)}
                          </td>
                          <td className="table-cell-path" title={cookie.path}>
                            {cookie.path}
                          </td>
                          <td className="table-cell align-top">
                            {renderCookieFlags(cookie)}
                          </td>
                          <td className="table-cell-actions">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => startEditing(cookie)}
                                className="action-button-edit"
                                title="Edit Cookie"
                              >
                                <Edit3 size={16} />
                              </button>
                              <button
                                onClick={() => deleteCookie(cookie)}
                                className="action-button-delete"
                                title="Delete Cookie"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}
      {!isPopupMode && (
        <footer
          className={`cookie-manager-footer mt-8 pt-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 text-center`}
        >
          Total Cookies: {allCookies.length} | Displaying:{" "}
          {filteredCookies.length}
        </footer>
      )}
    </div>
  );
};

export default AdvancedCookieManagerPage;
