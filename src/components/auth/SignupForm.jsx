export default function SignupForm({
  formData,
  onChange,
}) {
  return (
    <div className="auth-form-fields">
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={onChange}
        className="auth-input"
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={onChange}
        className="auth-input"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={onChange}
        className="auth-input"
      />
    </div>
  );
}
