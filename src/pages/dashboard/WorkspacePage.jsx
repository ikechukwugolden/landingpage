import DashboardLayout from "../../components/layout/DashboardLayout";

export default function WorkspacePage({
  description,
  highlights = [],
  title,
}) {
  return (
    <DashboardLayout>
      <div className="dashboard-page">
        <div className="dashboard-topbar">
          <div className="dashboard-header">
            <div className="dashboard-badge">
              Workspace Section
            </div>

            <h1>{title}</h1>
            <p>{description}</p>
          </div>
        </div>

        <div className="dashboard-cards">
          {highlights.map((item) => (
            <div key={item.title} className="dashboard-card">
              <h3>{item.title}</h3>
              <h2>{item.value}</h2>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
