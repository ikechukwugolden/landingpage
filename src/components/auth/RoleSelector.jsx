import {
  BriefcaseBusiness,
  Building2,
  CalendarHeart,
  Store,
} from "lucide-react";

const roles = [
  {
    title: "Event Client",
    value: "client",
    icon: CalendarHeart,
  },
  {
    title: "Vendor",
    value: "vendor",
    icon: Store,
  },
  {
    title: "Planner",
    value: "planner",
    icon: BriefcaseBusiness,
  },
  {
    title: "Organization",
    value: "organization",
    icon: Building2,
  },
];

const RoleSelector = ({
  onSelect,
  selectedRole,
}) => {
  return (
    <div className="role-selector-grid">
      {roles.map((role) => {
        const Icon = role.icon;
        const isSelected = selectedRole === role.value;

        return (
          <button
            key={role.value}
            type="button"
            className={`role-card glass${isSelected ? " selected" : ""}`}
            onClick={() => onSelect?.(role.value)}
          >
            <div className="role-card-icon">
              <Icon size={24} />
            </div>

            <h3 className="role-card-title">
              {role.title}
            </h3>
          </button>
        );
      })}
    </div>
  );
};

export default RoleSelector;
