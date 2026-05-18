interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

export default function Card({ children, className = '', title, description }: CardProps) {
  return (
    <div className={`bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-premium-lg transition-all duration-300 hover-lift ${className}`}>
      {(title || description) && (
        <div className="p-6 border-b border-gray-200">
          {title && <h3 className="text-xl font-semibold text-[#0a192f] mb-2 tracking-tight">{title}</h3>}
          {description && <p className="text-gray-600 leading-relaxed">{description}</p>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}
