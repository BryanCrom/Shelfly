import { createAutocomplete } from "@algolia/autocomplete-core";
import { useState, useMemo, useRef } from "react";

import type {
  AutocompleteSource,
  AutocompleteState,
} from "@algolia/autocomplete-core";

type SearchItem = {
  objectID: string;
  title: string;
  url: string;
};

export function Autocomplete() {
  const [autocompleteState, setAutocompleteState] = useState<
    AutocompleteState<SearchItem>
  >({
    collections: [],
    isOpen: false,
    query: "",
    activeItemId: null,
    completion: null,
    context: {},
    status: "idle",
  });

  const inputRef = useRef(null);

  const autocomplete = useMemo(
    () =>
      createAutocomplete<SearchItem>({
        onStateChange({ state }) {
          setAutocompleteState(state);
        },
        getSources(): Array<AutocompleteSource<SearchItem>> {
          return [
            {
              sourceId: "backend",
              getItemInputValue({ item }): string {
                return item.title;
              },
              async getItems({ query }) {
                console.log("Query typed:", query);
                const response = await fetch(`/search?q=${query}`);
                const data = await response.json();
                console.log("Data from backend:", data);
                return data.hits;
              },
              getItemUrl({ item }) {
                return item.url;
              },
            },
          ];
        },
      }),
    [],
  );

  return (
    <div className="aa-Autocomplete" {...autocomplete.getRootProps({})}>
      {/* @ts-expect-error Algolia uses native DOM events instead of React.ChangeEvent */}
      <form
        className="aa-Form"
        {...autocomplete.getFormProps({ inputElement: inputRef.current })}
      >
        <div className="aa-InputWrapperPrefix">
          <label
            className="aa-Label"
            {...autocomplete.getLabelProps({})}
          ></label>
        </div>
        <div className="aa-InputWrapper">
          {/* @ts-expect-error Algolia uses native DOM events instead of React.ChangeEvent */}
          <input
            className="aa-Input"
            ref={inputRef}
            {...autocomplete.getInputProps({ inputElement: inputRef.current })}
          />
        </div>
      </form>
      {/* @ts-expect-error Algolia uses native DOM events instead of React.ChangeEvent */}
      <div className="aa-Panel" {...autocomplete.getPanelProps({})}>
        {autocompleteState.isOpen &&
          autocompleteState.collections.map((collection, index) => {
            const { source, items } = collection;

            return (
              <div key={`source-${index}`} className="aa-Source">
                {items.length > 0 && (
                  <ul className="aa-List" {...autocomplete.getListProps()}>
                    {items.map((item) => (
                      <li
                        key={item.objectID}
                        className="aa-Item"
                        role="option"
                        aria-selected={false}
                        onMouseMove={(e) =>
                          autocomplete
                            .getItemProps({ item, source })
                            .onMouseMove?.(e.nativeEvent)
                        }
                        onMouseDown={(e) =>
                          autocomplete
                            .getItemProps({ item, source })
                            .onMouseDown?.(e.nativeEvent)
                        }
                        onClick={(e) =>
                          autocomplete
                            .getItemProps({ item, source })
                            .onClick?.(e.nativeEvent)
                        }
                      >
                        {item.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
