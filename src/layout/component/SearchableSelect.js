import React from "react";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import { FormControl, FormLabel } from "@chakra-ui/react";

const SearchableSelect = ({
  label,
  placeholder,
  items,
  selectedItems,
  onSelectedItemsChange,
}) => {
  const handleCreateItem = (item) => {
    onSelectedItemsChange([...selectedItems, item]);
  };

  return (
    <FormControl>
      {/* <FormLabel>{label}</FormLabel> */}
      <CUIAutoComplete
        label={label}
        placeholder={placeholder}
        onCreateItem={handleCreateItem}
        items={items}
        selectedItems={selectedItems}
        onSelectedItemsChange={(changes) =>
          onSelectedItemsChange(changes.selectedItems)
        }
      />
    </FormControl>
  );
};

export default SearchableSelect;
