import { useWeeklyAnalysis } from "../../hooks/useFirestoreData";
import { TrendingUp, Calendar } from "lucide-react";

export default function WeeklyAnalysis() {
  const { data: weeklyData, loading, error } = useWeeklyAnalysis();

  if (loading) {
    return (
      <div className="weekly-analysis-card glass">
        <div className="analysis-header">
          <div className="analysis-title">
            <Calendar size={20} />
            <h3>7-Day Analysis</h3>
          </div>
          <TrendingUp size={20} className="trending-icon" />
        </div>
        <div className="analysis-loading">Loading analytics...</div>
      </div>
    );
  }

  const hasData = weeklyData.some((day) => day.events > 0 || day.revenue > 0);
  const totalEvents = weeklyData.reduce((sum, day) => sum + day.events, 0);
  const totalRevenue = weeklyData.reduce((sum, day) => sum + day.revenue, 0);
  const avgDaily = weeklyData.length
    ? (totalEvents / weeklyData.length).toFixed(1)
    : "0";

  const maxEvents = Math.max(...weeklyData.map((d) => d.events), 1);

  const renderEmptyState = () => (
    <div className="analysis-empty">
      <p>No weekly activity found yet.</p>
      <span>Events will appear here once your dashboard receives data.</span>
    </div>
  );

  return (
    <div className="weekly-analysis-card glass">
      <div className="analysis-header">
        <div className="analysis-title">
          <Calendar size={20} />
          <h3>7-Day Analysis</h3>
        </div>
        <TrendingUp size={20} className="trending-icon" />
      </div>

      {!hasData && !loading ? (
        renderEmptyState()
      ) : (
        <>
          <div className="analysis-stats">
            <div className="stat-item">
              <span className="stat-label">Total Events</span>
              <span className="stat-value">{totalEvents}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Avg Daily</span>
              <span className="stat-value">{avgDaily}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Revenue</span>
              <span className="stat-value">₦{totalRevenue.toLocaleString()}</span>
            </div>
          </div>

          <div className="analysis-chart">
            <div className="chart-bars">
              {weeklyData.map((day, index) => (
                <div key={index} className="chart-bar-container">
                  <div
                    className="chart-bar"
                    style={{
                      height:
                        maxEvents > 0
                          ? `${(day.events / maxEvents) * 100}%`
                          : "8%",
                    }}
                    title={`${day.day}: ${day.events} events`}
                  />
                  <span className="bar-label">{day.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="analysis-footer">
            <p className="analysis-text">
              {totalEvents === 0
                ? "No events recorded this week. Start planning!"
                : `You've had ${totalEvents} events this week. Keep going!`}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
