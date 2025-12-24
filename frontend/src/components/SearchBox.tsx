import Result from "./Result";

import { createAutocomplete } from "@algolia/autocomplete-core";
import { useState, useMemo, useRef } from "react";
import { IconX } from "@tabler/icons-react";

import type {
  AutocompleteSource,
  AutocompleteState,
} from "@algolia/autocomplete-core";
import type { SearchItem } from "../types/SearchTypes";

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

  const inputRef = useRef<HTMLInputElement | null>(null);
  const lastQuery = useRef<string | null>(null);
  const lastResults = useRef<SearchItem[]>([]);

  async function search(query: string): Promise<SearchItem[]> {
    if (!query || query === lastQuery.current) {
      return lastResults.current;
    }

    lastQuery.current = query;

    const response = await fetch(`/search?q=${query}`);
    const data = await response.json();
    const hits = data.hits;
    lastResults.current = hits;
    return hits;
  }

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
                return search(query);
              },
              // getItemUrl({ item }) {
              //   return item.url;
              // },
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

        <div className="relative mx-auto w-2xl">
          <div className="aa-InputWrapper my-10 h-14 flex-row">
            {/* @ts-expect-error Algolia uses native DOM events instead of React.ChangeEvent */}
            <input
              ref={inputRef}
              className="aa-Input h-full w-full rounded-full border-2 border-black/20 py-2 pr-10 pl-4 shadow-md outline-none focus:border-blue-500"
              {...autocomplete.getInputProps({
                inputElement: inputRef.current,
                onFocus() {
                  autocomplete.setIsOpen(true); // reopen results
                },
              })}
              onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                const inputProps =
                  autocomplete.getInputProps as React.InputHTMLAttributes<HTMLInputElement>;
                inputProps.onKeyDown?.(event);

                if (event.key === "Enter") {
                  event.preventDefault();
                }
              }}
              placeholder="Search books..."
            />
          </div>
          {autocompleteState.query && (
            <div className="aa-InputWrapperSuffix">
              <button
                className="aa-ClearButton absolute top-1/2 right-2 -translate-x-1 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => {
                  autocomplete.setQuery("");
                  requestAnimationFrame(() => {
                    inputRef.current?.focus();
                  });
                }}
              >
                <IconX />
              </button>
            </div>
          )}
        </div>
      </form>

      {/* @ts-expect-error Algolia uses native DOM events instead of React.ChangeEvent */}
      <div className="aa-Panel mx-10" {...autocomplete.getPanelProps({})}>
        {autocompleteState.isOpen &&
          autocompleteState.collections.map((collection, index) => {
            const { items } = collection;

            return (
              <>
                {items.length > 0 && (
                  <div
                    key={`source-${index}`}
                    className="aa-Source grid grid-cols-3 rounded-2xl border-2 border-blue-500 p-3 shadow-md"
                  >
                    {items.map((item: SearchItem) => (
                      <Result item={item} />
                    ))}
                  </div>
                )}
              </>
            );
          })}
      </div>
    </div>
  );
}
