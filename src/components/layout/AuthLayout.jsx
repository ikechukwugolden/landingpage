const AuthLayout = ({ children }) => {

  return (
    <div className="auth-layout">

      {/* LEFT */}

      <div className="auth-layout-copy">

        <h1 className="auth-layout-title">
          The{" "}
          <span className="auth-gradient-text">
            Operating System
          </span>{" "}
          for Events
        </h1>

        <p className="auth-layout-text">
          Plan, manage and scale
          unforgettable events with OMA.
        </p>

      </div>

      {/* RIGHT */}

      <div className="auth-layout-panel">
        {children}
      </div>

    </div>
  );
};

export default AuthLayout;
