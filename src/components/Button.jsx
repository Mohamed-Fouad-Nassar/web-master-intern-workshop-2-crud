export default function Button({
  children,
  size = "",
  as: Tag = "button",
  className = "",
  variation = "primary",
  ...props
}) {
  if (!children) return null;

  return (
    <Tag
      {...props}
      className={`rounded cursor-pointer uppercase tracking-wider ${
        variation === "primary"
          ? "bg-primary-btn-bg hover:bg-primary-btn-bg/90 dark:bg-primary-btn-bg-dark dark:hover:bg-primary-btn-bg-dark/90 border border-primary-btn-bg dark:border-primary-btn-bg-dark text-white dark:text-white"
          : variation === "secondary"
          ? "border border-primary-btn-bg dark:border-primary-btn-bg-dark hover:bg-primary-btn-bg/10 dark:hover:bg-primary-btn-bg-dark/10 text-primary-btn-bg dark:text-primary-btn-bg-dark"
          : variation === "danger"
          ? "bg-red-500 hover:bg-red-600 text-white"
          : "hover:bg-primary-btn-bg/10 dark:hover:bg-primary-btn-bg-dark/10 text-primary-btn-bg dark:text-primary-btn-bg-dark"
      } ${
        size === "sm"
          ? "px-2 py-1.5 text-xs"
          : size === "lg"
          ? "px-8 py-3"
          : "px-6 py-2.5 text-sm"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
