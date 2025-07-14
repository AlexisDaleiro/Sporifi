import { React, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    console.log("Searching for:", searchQuery);
  };

  const handleAction1 = () => {
    console.log("Action 1 clicked");
  };

  const handleAction2 = () => {
    console.log("Action 2 clicked");
  };

  return (
    <div>
      <div className="mb-5">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <Link to={"/"}>
                    <img
                      className="img-fluid"
                      style={{ width: "32px", height: "32px" }}
                      src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </Link>
                </div>
                <div className="d-none d-md-block">
                  <div className="ms-4 d-flex align-items-baseline gap-3">
                    <a
                      href="#"
                      className="btn btn-dark rounded px-3 py-2 text-decoration-none"
                      aria-current="page"
                    >
                      Dashboard
                    </a>
                  </div>
                </div>
              </div>

              <div
                className="d-none d-md-block flex-grow-1 mx-auto"
                style={{ maxWidth: "400px" }}
              >
                <form onSubmit={handleSearch} className="position-relative">
                  <div className="position-relative">
                    <div className="position-absolute top-50 start-0 translate-middle-y ps-3 d-flex align-items-center">
                      <svg
                        className="text-muted"
                        style={{ width: "20px", height: "20px" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="form-control ps-5 pe-3 py-2 border-secondary bg-dark text-white"
                      placeholder="Search..."
                    />
                  </div>
                </form>
              </div>

              <div className="d-none d-md-block">
                <div className="ms-4 d-flex align-items-center gap-4">
                  <button
                    type="button"
                    onClick={handleAction1}
                    className="btn btn-primary px-3 py-2"
                  >
                    Action 1
                  </button>

                  <button
                    type="button"
                    onClick={handleAction2}
                    className="btn btn-secondary px-3 py-2"
                  >
                    Action 2
                  </button>

                  <button
                    type="button"
                    className="btn btn-link text-decoration-none p-1 rounded-circle"
                  >
                    <span className="visually-hidden">View notifications</span>
                    <svg
                      style={{ width: "24px", height: "24px" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                      />
                    </svg>
                  </button>

                  <div className="dropdown">
                    <button
                      type="button"
                      className="btn btn-link text-decoration-none p-0 rounded-circle"
                      id="user-menu-button"
                      data-bs-toggle="dropdown"
                      aria-expanded={isProfileOpen}
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                    >
                      <span className="visually-hidden">Open user menu</span>
                      <img
                        className="rounded-circle"
                        style={{ width: "32px", height: "32px" }}
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </button>

                    <ul
                      className={`dropdown-menu profile-dropdown ${
                        isProfileOpen ? "show" : ""
                      }`}
                      role="menu"
                      aria-labelledby="user-menu-button"
                    >
                      <li>
                        <a
                          href="#"
                          className="dropdown-item"
                          role="menuitem"
                          id="user-menu-item-0"
                        >
                          Your Profile
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="dropdown-item"
                          role="menuitem"
                          id="user-menu-item-1"
                        >
                          Settings
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="dropdown-item"
                          role="menuitem"
                          id="user-menu-item-2"
                        >
                          Sign out
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="d-md-none">
                <button
                  type="button"
                  className="btn btn-link text-decoration-none p-2 rounded"
                  aria-controls="mobile-menu"
                  aria-expanded={isMobileMenuOpen}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <span className="visually-hidden">Open main menu</span>

                  <svg
                    className={`${isMobileMenuOpen ? "d-none" : "d-block"}`}
                    style={{ width: "24px", height: "24px" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>

                  <svg
                    className={`${isMobileMenuOpen ? "d-block" : "d-none"}`}
                    style={{ width: "24px", height: "24px" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="d-md-none w-100" id="mobile-menu">
              <div className="px-3 pt-3 pb-3">
                <form onSubmit={handleSearch} className="position-relative">
                  <div className="position-relative">
                    <div className="position-absolute top-50 start-0 translate-middle-y ps-3 d-flex align-items-center">
                      <svg
                        className="text-muted"
                        style={{ width: "20px", height: "20px" }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="form-control ps-5 pe-3 py-2 border-secondary bg-dark text-white"
                      placeholder="Search..."
                    />
                  </div>
                </form>
              </div>

              <div className="px-3 pb-3">
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    onClick={handleAction1}
                    className="btn btn-primary flex-fill px-3 py-2"
                  >
                    Action 1
                  </button>
                  <button
                    type="button"
                    onClick={handleAction2}
                    className="btn btn-secondary flex-fill px-3 py-2"
                  >
                    Action 2
                  </button>
                </div>
              </div>

              <div className="px-3 pb-3">
                <a
                  href="#"
                  className="btn btn-dark w-100 text-start px-3 py-2 mb-2"
                  aria-current="page"
                >
                  Dashboard
                </a>
                <a
                  href="#"
                  className="btn btn-link w-100 text-start px-3 py-2 mb-2 text-decoration-none"
                >
                  Team
                </a>
                <a
                  href="#"
                  className="btn btn-link w-100 text-start px-3 py-2 mb-2 text-decoration-none"
                >
                  Projects
                </a>
                <a
                  href="#"
                  className="btn btn-link w-100 text-start px-3 py-2 mb-2 text-decoration-none"
                >
                  Calendar
                </a>
                <a
                  href="#"
                  className="btn btn-link w-100 text-start px-3 py-2 mb-2 text-decoration-none"
                >
                  Reports
                </a>
              </div>
              <div className="border-top border-secondary pt-4 pb-3">
                <div className="d-flex align-items-center px-4">
                  <div className="flex-shrink-0">
                    <img
                      className="rounded-circle"
                      style={{ width: "40px", height: "40px" }}
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ms-3">
                    <div className="fw-medium text-white">Tom Cook</div>
                    <div className="small text-muted">tom@example.com</div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-link text-decoration-none p-1 rounded-circle ms-auto"
                  >
                    <span className="visually-hidden">View notifications</span>
                    <svg
                      style={{ width: "24px", height: "24px" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mt-3 px-3">
                  <a
                    href="#"
                    className="btn btn-link w-100 text-start px-3 py-2 mb-2 text-decoration-none"
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="btn btn-link w-100 text-start px-3 py-2 mb-2 text-decoration-none"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="btn btn-link w-100 text-start px-3 py-2 mb-2 text-decoration-none"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}
