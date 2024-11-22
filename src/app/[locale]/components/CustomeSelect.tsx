"use client";
import { Control, Controller } from "react-hook-form";
import { useTranslations } from "next-intl";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  name: string;
  control: Control<any>;
  options: Option[];
  placeholder: string;
  className?: string;
  translationKey?: string;
}

export default function CustomSelect({
  name,
  control,
  options,
  placeholder,
  className = "w-5/6 p-2 my-2 border-zinc-400 border rounded",
  translationKey = "translations",
}: CustomSelectProps) {
  const t = useTranslations(translationKey);

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: "This is required" }}
      render={({ field, fieldState: { error } }) => (
        <>
          <select {...field} className={className}>
            <option value="">{t(placeholder)}</option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {error && (
            <small className="block text-center text-red-950">
              {error.message}
            </small>
          )}
        </>
      )}
    />
  );
}
