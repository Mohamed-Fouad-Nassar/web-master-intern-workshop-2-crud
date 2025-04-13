export default function Heading({ children, className = "" }) {
  return (
    <h2
      className={`text-2xl font-bold text-gray-900 dark:text-white mb-2 ${className}`}
    >
      {children}
    </h2>
  );
}
