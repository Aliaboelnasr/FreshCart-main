import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn btn-primary">
          Go to Home
        </Link>
      </div>
    </div>
  );
}
