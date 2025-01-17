"use client";

import { useEffect, useMemo, useState } from "react";

import { format } from "date-fns";
import { CalendarIcon, ClockIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

type DatePickerProps = {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  time?: boolean;
};

export const DatePicker = ({
  value,
  onChange,
  placeholder = "Pick a date",
  time = false,
}: DatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(value);

  const handleOnChange = (date: Date | undefined) => {
    const newDate = date ? new Date(date) : new Date();
    newDate.setHours(value?.getHours() ?? 0, value?.getMinutes() ?? 0, 0, 0);
    if (onChange) {
      onChange(newDate);
    } else {
      setDate(newDate);
    }
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !(value ?? date) && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {(value ?? date) ? (
              time ? (
                format((value ?? date) as Date, "PPP HH:mm")
              ) : (
                format((value ?? date) as Date, "PPP")
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value ?? date}
            onSelect={handleOnChange ?? setDate}
            month={date}
            onMonthChange={setDate}
            initialFocus
          />
          {time && (
            <>
              <Separator />
              <div className="flex gap-2 m-4">
                <div className="flex flex-col items-center">
                  <Label htmlFor="hours" className="text-xs">
                    Hours
                  </Label>
                  <TimePickerInput
                    id="hours"
                    name="hours"
                    date={value ?? date}
                    setDate={onChange ?? setDate}
                    picker="hours"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <Label htmlFor="minutes" className="text-xs">
                    Minutes
                  </Label>
                  <TimePickerInput
                    id="minutes"
                    name="minutes"
                    date={value ?? date}
                    setDate={onChange ?? setDate}
                    picker="minutes"
                    step={5}
                  />
                </div>
                <div className="flex items-end mb-2">
                  <ClockIcon className="size-5 ml-2" />
                </div>
              </div>
            </>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

function isValidHour(value: string) {
  return /^(0[0-9]|1[0-9]|2[0-3])$/.test(value);
}
function isValidMinute(value: string) {
  return /^[0-5][0-9]$/.test(value);
}

type GetValidNumberConfig = { max: number; min?: number; loop?: boolean };

function getValidNumber(
  value: string,
  { max, min = 0, loop = false }: GetValidNumberConfig,
) {
  let numericValue = parseInt(value, 10);

  if (!isNaN(numericValue)) {
    if (!loop) {
      if (numericValue > max) numericValue = max;
      if (numericValue < min) numericValue = min;
    } else {
      if (numericValue > max) numericValue = min;
      if (numericValue < min) numericValue = max;
    }
    return numericValue.toString().padStart(2, "0");
  }

  return "00";
}

function getValidHour(value: string) {
  if (isValidHour(value)) return value;
  return getValidNumber(value, { max: 23 });
}

function getValidMinute(value: string) {
  if (isValidMinute(value)) return value;
  return getValidNumber(value, { max: 59 });
}

type GetValidArrowNumberConfig = {
  min: number;
  max: number;
  step: number;
};

function getValidArrowNumber(
  value: string,
  { min, max, step }: GetValidArrowNumberConfig,
) {
  let numericValue = parseInt(value, 10);
  if (!isNaN(numericValue)) {
    numericValue += step;
    return getValidNumber(String(numericValue), { min, max, loop: true });
  }
  return "00";
}

function getValidArrowHour(value: string, step: number) {
  return getValidArrowNumber(value, { min: 0, max: 23, step });
}

function getValidArrowMinute(value: string, step: number) {
  return getValidArrowNumber(value, { min: 0, max: 59, step });
}

function setMinutes(date: Date, value: string) {
  const minutes = getValidMinute(value);
  date.setMinutes(parseInt(minutes, 10));
  return date;
}

function setHours(date: Date, value: string) {
  const hours = getValidHour(value);
  date.setHours(parseInt(hours, 10));
  return date;
}

type TimePickerType = "minutes" | "hours";

function setDateByType(date: Date, value: string, type: TimePickerType) {
  switch (type) {
    case "minutes":
      return setMinutes(date, value);
    case "hours":
      return setHours(date, value);
    default:
      return date;
  }
}

function getDateByType(date: Date, type: TimePickerType) {
  switch (type) {
    case "minutes":
      return getValidMinute(String(date.getMinutes()));
    case "hours":
      return getValidHour(String(date.getHours()));
    default:
      return "00";
  }
}

function getArrowByType(value: string, step: number, type: TimePickerType) {
  switch (type) {
    case "minutes":
      return getValidArrowMinute(value, step);
    case "hours":
      return getValidArrowHour(value, step);
    default:
      return "00";
  }
}

interface TimePickerInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  picker: TimePickerType;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  onRightFocus?: () => void;
  onLeftFocus?: () => void;
}

const TimePickerInput = ({
  className,
  type = "number",
  value,
  id,
  name,
  date = new Date(new Date().setHours(0, 0, 0, 0)),
  setDate,
  onChange,
  onKeyDown,
  picker,
  onLeftFocus,
  onRightFocus,
  ...props
}: TimePickerInputProps) => {
  const [flag, setFlag] = useState<boolean>(false);

  /**
   * allow the user to enter the second digit within 2 seconds
   * otherwise start again with entering first digit
   */
  useEffect(() => {
    if (flag) {
      const timer = setTimeout(() => {
        setFlag(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [flag]);

  const calculatedValue = useMemo(() => {
    return getDateByType(date, picker);
  }, [date, picker]);

  const calculateNewValue = (key: string) => {
    return !flag ? "0" + key : calculatedValue.slice(1, 2) + key;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") return;
    e.preventDefault();
    if (e.key === "ArrowRight") onRightFocus?.();
    if (e.key === "ArrowLeft") onLeftFocus?.();
    if (["ArrowUp", "ArrowDown"].includes(e.key)) {
      const step = e.key === "ArrowUp" ? 1 : -1;
      const newValue = getArrowByType(calculatedValue, step, picker);
      if (flag) setFlag(false);
      const tempDate = new Date(date);
      setDate(setDateByType(tempDate, newValue, picker));
    }
    if (e.key >= "0" && e.key <= "9") {
      const newValue = calculateNewValue(e.key);
      if (flag) onRightFocus?.();
      setFlag((prev) => !prev);
      const tempDate = new Date(date);
      setDate(setDateByType(tempDate, newValue, picker));
    }
  };

  return (
    <Input
      id={id || picker}
      name={name || picker}
      className={cn(
        "w-[48px] text-center font-mono text-base tabular-nums caret-transparent focus:bg-accent focus:text-accent-foreground [&::-webkit-inner-spin-button]:appearance-none",
        className,
      )}
      value={value || calculatedValue}
      onChange={(e) => {
        e.preventDefault();
        onChange?.(e);
      }}
      type={type}
      inputMode="decimal"
      onKeyDown={(e) => {
        onKeyDown?.(e);
        handleKeyDown(e);
      }}
      {...props}
    />
  );
};
