import React from "react";
import { cn } from "../../utils/cn";

const Input = React.forwardRef(
  ({ className, type = "text", label, description, error, required = false, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const baseInputClasses =
      "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed";

    return (
      <div className="space-y-1">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-600">*</span>}
          </label>
        )}

        <input
          id={inputId}
          type={type}
          ref={ref}
          className={cn(baseInputClasses, className)}
          {...props}
        />

        {description && !error && (
          <p className="text-xs text-gray-500">{description}</p>
        )}
        {error && (
          <p className="text-xs text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
