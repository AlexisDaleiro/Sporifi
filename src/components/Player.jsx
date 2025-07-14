import ReactHowler from "react-howler";

export default function Player() {
  return (
    <div
      className="col-md-12 position-fixed bottom-0 start-0 text-white d-flex align-items-center justify-content-between px-4 py-3 shadow-lg player-container"
      style={{ zIndex: 1050 }}
    >
      {/* Song Info */}
      <div className="d-flex align-items-center flex-shrink-0">
        <img
          src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228"
          alt="Album Art"
          className="rounded me-3"
          style={{ width: "48px", height: "48px", objectFit: "cover" }}
        />
        <div className="text-truncate">
          <div className="fw-semibold text-truncate">Nombre de la canción</div>
          <div className="small text-muted text-truncate">Artista</div>
        </div>
      </div>

      {/* Player Controls */}
      <div className="d-flex flex-column align-items-center flex-grow-1 mx-4">
        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-link text-decoration-none p-0 btn-player"
            style={{ color: "inherit" }}
          >
            <svg width="20" height="20" fill="currentColor">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            className="btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center btn-player"
            style={{ width: "48px", height: "48px" }}
          >
            <svg width="28" height="28" fill="currentColor">
              <polygon points="6,4 24,14 6,24" />
            </svg>
          </button>
          <button
            className="btn btn-link text-decoration-none p-0 btn-player"
            style={{ color: "inherit" }}
          >
            <svg width="20" height="20" fill="currentColor">
              <path d="M5 6l6 6-6 6" />
            </svg>
          </button>
        </div>
        {/* Progress Bar */}
        <div className="d-flex align-items-center gap-2 w-100 mt-2">
          <span className="small text-muted">1:23</span>
          <div className="progress flex-grow-1" style={{ height: "4px" }}>
            <div
              className="progress-bar bg-success"
              style={{ width: "40%" }}
            ></div>
          </div>
          <span className="small text-muted">3:45</span>
        </div>
      </div>

      {/* Volume & Extras */}
      <div className="d-flex align-items-center gap-3">
        <button
          className="btn btn-link text-decoration-none p-0 btn-player"
          style={{ color: "inherit" }}
        >
          <svg width="20" height="20" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3z" />
          </svg>
        </button>
        <div className="progress" style={{ width: "96px", height: "4px" }}>
          <div
            className="progress-bar bg-success"
            style={{ width: "60%" }}
          ></div>
        </div>
        <button
          className="btn btn-link text-decoration-none p-0 btn-player"
          style={{ color: "inherit" }}
        >
          <svg width="20" height="20" fill="currentColor">
            <circle cx="10" cy="10" r="2" />
            <circle cx="16" cy="10" r="2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
