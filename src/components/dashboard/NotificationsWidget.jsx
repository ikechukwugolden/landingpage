import { useNotifications } from "../../hooks/useFirestoreData";
import { Bell, X, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function NotificationsWidget() {
  const { data: notifications, loading, error } = useNotifications();
  const [expandedId, setExpandedId] = useState(null);

  const getNotificationIcon = (type) => {
    switch (type) {
      case "alert":
        return <AlertCircle size={16} />;
      case "booking":
        return <Bell size={16} />;
      default:
        return <Bell size={16} />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "alert":
        return "notification-alert";
      case "booking":
        return "notification-booking";
      default:
        return "notification-default";
    }
  };

  if (loading) {
    return (
      <div className="notifications-widget glass">
        <div className="notifications-header">
          <h3>
            <Bell size={18} />
            Notifications
          </h3>
        </div>
        <div className="notifications-loading">Loading notifications...</div>
      </div>
    );
  }

  return (
    <div className="notifications-widget glass">
      <div className="notifications-header">
        <h3>
          <Bell size={18} />
          Notifications
          {notifications.length > 0 && (
            <span className="notification-count">{notifications.length}</span>
          )}
        </h3>
      </div>

      <div className="notifications-list">
        {notifications.length === 0 ? (
          <div className="no-notifications">
            <Bell size={32} />
            <p>No notifications yet</p>
          </div>
        ) : (
          notifications.slice(0, 5).map((notif) => (
            <div
              key={notif.id}
              className={`notification-item ${getNotificationColor(notif.type)}`}
            >
              <div className="notification-icon">
                {getNotificationIcon(notif.type)}
              </div>
              <div className="notification-content">
                <p className="notification-title">{notif.title}</p>
                <p className="notification-message">{notif.message}</p>
                <span className="notification-time">
                  {notif.createdAt
                    ? new Date(notif.createdAt.seconds * 1000).toLocaleTimeString(
                        [],
                        { hour: "2-digit", minute: "2-digit" }
                      )
                    : "Just now"}
                </span>
              </div>
              <button
                className="notification-close"
                onClick={() => setExpandedId(null)}
              >
                <X size={14} />
              </button>
            </div>
          ))
        )}
      </div>

      {notifications.length > 5 && (
        <div className="notifications-footer">
          <a href="/notifications" className="view-all-link">
            View all notifications
          </a>
        </div>
      )}
    </div>
  );
}
