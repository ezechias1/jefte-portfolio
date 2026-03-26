export function FormField({ label, error, children, required }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-mono tracking-widest uppercase text-silver">
        {label}{required && <span className="text-gold ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}

export function Input({ register, error, ...props }) {
  return (
    <input
      {...register}
      {...props}
      className={`input-field ${error ? 'border-red-500' : ''}`}
    />
  );
}

export function Select({ register, error, children, ...props }) {
  return (
    <select
      {...register}
      {...props}
      className={`input-field ${error ? 'border-red-500' : ''} bg-graphite`}
    >
      {children}
    </select>
  );
}

export function Textarea({ register, error, rows = 4, ...props }) {
  return (
    <textarea
      {...register}
      rows={rows}
      {...props}
      className={`input-field resize-none ${error ? 'border-red-500' : ''}`}
    />
  );
}
