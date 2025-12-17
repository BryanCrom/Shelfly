import { debouncePromise } from "../utils/SearchBoxUtil";
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
  const forceSearech = useRef<boolean>(false);
  const activeController = useRef<AbortController | null>(null);
  const lastQuery = useRef<string | null>(null);
  const lastResults = useRef<SearchItem[] | null>(null);

  const STALL_THRESHOLD_MS = 500;
  const DEBOUNCE_MS = 200;

  const debouncedRef = useRef(
    debouncePromise(async (query: string): Promise<SearchItem[] | null> => {
      return search(query);
    }, DEBOUNCE_MS),
  );

  async function search(query: string): Promise<SearchItem[] | null> {
    if (!query || query === lastQuery.current) {
      return lastResults.current;
    }

    lastQuery.current = query;

    if (activeController) {
      activeController.current?.abort();
    }

    activeController.current = new AbortController();
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
        stallThreshold: STALL_THRESHOLD_MS,
        getSources(): Array<AutocompleteSource<SearchItem>> {
          return [
            {
              sourceId: "backend",
              getItemInputValue({ item }): string {
                return item.title;
              },
              async getItems({ query }) {
                if (forceSearech.current === true) {
                  forceSearech.current = false;
                  return search(query);
                }

                return debouncedRef.current(query);
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
                  debouncedRef.current.cancel();
                  activeController.current?.abort();
                  forceSearech.current = true;
                  autocomplete.refresh();
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
      <div
        className="aa-Panel mx-auto w-2xl"
        {...autocomplete.getPanelProps({})}
      >
        {autocompleteState.isOpen &&
          autocompleteState.collections.map((collection, index) => {
            const { source, items } = collection;

            return (
              <div
                key={`source-${index}`}
                className="aa-Source rounded-2xl border-2 border-blue-500 p-3 shadow-md"
              >
                {items.length > 0 && (
                  <ul className="aa-List" {...autocomplete.getListProps()}>
                    {items.map((item: SearchItem) => (
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
                        <Result item={item} />
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
