import {
  Check,
  ChevronDown,
  Filter,
  SlidersHorizontal,
} from "lucide-react";

import type { OrderStatus } from "@/types/order";

type OrderFilterStatus = "all" | OrderStatus;

type OrderSortBy =
  | "default"
  | "id-asc"
  | "id-desc"
  | "name-asc"
  | "name-desc"
  | "qty-asc"
  | "qty-desc";

const ORDER_FILTER_OPTIONS: {
  value: OrderFilterStatus;
  label: string;
}[] = [
  { value: "all", label: "All Orders" },
  { value: "shipped", label: "Shipped" },
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "delivered", label: "Delivered" },
  { value: "canceled", label: "Canceled" },
];

const ORDER_SORT_OPTIONS: {
  value: OrderSortBy;
  label: string;
}[] = [
  { value: "default", label: "Default" },
  { value: "id-asc", label: "Order ID (A → Z)" },
  { value: "id-desc", label: "Order ID (Z → A)" },
  { value: "name-asc", label: "Customer (A → Z)" },
  { value: "name-desc", label: "Customer (Z → A)" },
  { value: "qty-asc", label: "Qty (Low → High)" },
  { value: "qty-desc", label: "Qty (High → Low)" },
];

interface OrderFiltersProps {
  filterStatus: OrderFilterStatus;
  sortBy: OrderSortBy;
  filterOpen: boolean;
  sortOpen: boolean;
  onFilterToggle: () => void;
  onSortToggle: () => void;
  onFilterSelect: (filter: OrderFilterStatus) => void;
  onSortSelect: (sort: OrderSortBy) => void;
  startItem: number;
  endItem: number;
  totalItems: number;
}

export default function OrderFilters({
  filterStatus,
  sortBy,
  filterOpen,
  sortOpen,
  onFilterToggle,
  onSortToggle,
  onFilterSelect,
  onSortSelect,
}: OrderFiltersProps) {
  return (
    <div>
      {/* Left Controls */}
      <div className="flex w-full items-center justify-end gap-2 sm:gap-4 pr-5">
        <div className="relative">
          <button
            type="button"
            onClick={onFilterToggle}
            className="
              flex items-center
              gap-1.5 sm:gap-2
              rounded-lg
              px-2.5 py-1.5 sm:px-3
              text-xs sm:text-sm
              font-bold
              transition
              hover:opacity-80
            "
            style={{
              color: filterStatus !== "all" ? "#002B73" : "#475569",
              background:
                filterStatus !== "all" ? "#EFF6FF" : "transparent",
              border:
                filterStatus !== "all"
                  ? "1px solid #BFDBFE"
                  : "1px solid transparent",
            }}
            aria-expanded={filterOpen}
            aria-haspopup="listbox"
          >
            <Filter size={14} className="shrink-0" />

            <span className="whitespace-nowrap">
              {filterStatus === "all"
                ? "Filter"
                : ORDER_FILTER_OPTIONS.find(
                    (option) => option.value === filterStatus,
                  )?.label}
            </span>

            <ChevronDown
              size={13}
              className="shrink-0 transition-transform duration-150"
              style={{
                transform: filterOpen
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
              }}
            />
          </button>

          {filterOpen && (
            <div
              className="
                absolute right-0 top-full z-[100]
                mt-1
                w-[180px] sm:w-44
                overflow-hidden
                rounded-[10px]
                bg-white
                shadow-[0px_8px_16px_rgba(0,0,0,0.10)]
              "
              style={{
                border: "1px solid #E2E8F0",
              }}
            >
              {ORDER_FILTER_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onFilterSelect(option.value)}
                  className="
                    flex w-full
                    items-center justify-between
                    px-4 py-2.5
                    text-left
                    text-sm font-medium
                    transition
                    hover:bg-slate-50
                  "
                  style={{
                    color:
                      filterStatus === option.value
                        ? "#002B73"
                        : "#475569",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <span className="whitespace-nowrap">
                    {option.label}
                  </span>

                  {filterStatus === option.value && (
                    <Check
                      size={14}
                      color="#002B73"
                      className="shrink-0"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="relative">
          <button
            type="button"
            onClick={onSortToggle}
            className="
              flex items-center
              gap-1.5 sm:gap-2
              rounded-lg
              px-2.5 py-1.5 sm:px-3
              text-xs sm:text-sm
              font-bold
              transition
              hover:opacity-80
            "
            style={{
              color: sortBy !== "default" ? "#002B73" : "#475569",
              background:
                sortBy !== "default" ? "#EFF6FF" : "transparent",
              border:
                sortBy !== "default"
                  ? "1px solid #BFDBFE"
                  : "1px solid transparent",
            }}
            aria-expanded={sortOpen}
            aria-haspopup="listbox"
          >
            <SlidersHorizontal size={14} className="shrink-0" />

            <span className="max-w-[100px] truncate whitespace-nowrap sm:max-w-none">
              {sortBy === "default"
                ? "Sort"
                : ORDER_SORT_OPTIONS.find(
                    (option) => option.value === sortBy,
                  )?.label}
            </span>

            <ChevronDown
              size={13}
              className="shrink-0 transition-transform duration-150"
              style={{
                transform: sortOpen
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
              }}
            />
          </button>

          {sortOpen && (
            <div
              className="
                absolute right-0 top-full z-[100]
                mt-1
                w-[210px] sm:w-52
                max-w-[calc(100vw-24px)]
                overflow-hidden
                rounded-[10px]
                bg-white
                shadow-[0px_8px_16px_rgba(0,0,0,0.10)]
              "
              style={{
                border: "1px solid #E2E8F0",
              }}
            >
              {ORDER_SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onSortSelect(option.value)}
                  className="
                    flex w-full
                    items-center justify-between
                    gap-3
                    px-4 py-2.5
                    text-left
                    text-sm font-medium
                    transition
                    hover:bg-slate-50
                  "
                  style={{
                    color:
                      sortBy === option.value
                        ? "#002B73"
                        : "#475569",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <span className="whitespace-nowrap">
                    {option.label}
                  </span>

                  {sortBy === option.value && (
                    <Check
                      size={14}
                      color="#002B73"
                      className="shrink-0"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pagination Info */}
      {/*
      <p className="hidden text-sm font-medium text-[#434652] sm:block">
        Showing {startItem}–{endItem} of {totalItems} orders
      </p>
      */}
    </div>
  );
}

export type { OrderFilterStatus, OrderSortBy };