"use client";
import React, { useState } from "react";
import { FilterChecboxProps, FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui/input";
import { TFilter } from "./filter";

type Items = Omit<FilterChecboxProps, "formData" | "setFormData">;

interface Props {
  className?: string;
  formData: TFilter;
  setFormData: (formData: TFilter) => void;
  allItems: Items[];
  limit: number;
  defaultItems: Items[];
}
export const CheckboxIngridients: React.FC<Props> = ({
  formData,
  setFormData,
  className,
  allItems,
  limit,
  defaultItems,
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filteredArray = searchInput
    ? allItems.filter((item) =>
        item.text.toLowerCase().startsWith(searchInput.toLowerCase())
      )
    : [];

  const displayedItems = showAll ? allItems : defaultItems.slice(0, limit);

  return (
    <div className={className}>
      {/* Search input */}
      <div className={`${!showAll && "hidden"}`}>
        <Input
          type="text"
          value={searchInput}
          className="border-none rounded bg-gray-50"
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search..."
        />
      </div>

      <div className={`mt-5 flex flex-col max-h-[248px] gap-3 overflow-y-auto`}>
        {(filteredArray.length ? filteredArray : displayedItems).map(
          (item, id) => (
            <FilterCheckbox
              key={id}
              formData={formData}
              setFormData={setFormData}
              text={item.text}
              value={item.value}
              name={item.text}
            />
          )
        )}
      </div>

      {limit < allItems.length && !searchInput && (
        <button
          type="button"
          className={`text-primary mt-4 ${showAll && "hidden"}`}
          onClick={() => setShowAll(true)}
        >
          + Show all
        </button>
      )}
      {showAll && !searchInput && (
        <button
          type="button"
          className="text-primary mt-4"
          onClick={() => setShowAll(false)}
        >
          Close
        </button>
      )}
    </div>
  );
};
