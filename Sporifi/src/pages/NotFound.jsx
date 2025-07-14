export default function NotFound() {
  return (
    <div className="text-center">
      <p className="fs-4 fw-semibold text-primary">404</p>
      <h1 className="mt-4 display-1 fw-semibold text-dark">Page not found</h1>
      <p className="mt-4 fs-5 text-muted">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <div className="mt-5 d-flex align-items-center justify-content-center gap-3">
        <a href="#" className="btn btn-primary px-4 py-2 fw-semibold">
          Go back home
        </a>
        <a
          href="#"
          className="btn btn-link text-decoration-none fw-semibold text-dark"
        >
          Contact support <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </div>
  );
}
