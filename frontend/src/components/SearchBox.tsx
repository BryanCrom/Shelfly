import { autocomplete } from "@algolia/autocomplete-js";
import { createElement, Fragment, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

import type { AutocompleteApi } from "@algolia/autocomplete-js";
import type { AutocompleteOptions } from "@algolia/autocomplete-js";
import type { BaseItem } from "@algolia/autocomplete-core";
import type { Root } from "react-dom/client";

type SearchBoxProps<TItem extends BaseItem> = Omit<
  AutocompleteOptions<TItem>,
  "container"
>;

export function SearchBox<TItem extends BaseItem>(
  props: SearchBoxProps<TItem>,
) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelRootRef = useRef<Root | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const search: AutocompleteApi<TItem> = autocomplete<TItem>({
      container: containerRef.current,
      renderer: { createElement, Fragment, render: () => {} },
      render({ children }, root) {
        const divRoot = root as HTMLDivElement;

        if (!panelRootRef.current || rootRef.current !== root) {
          rootRef.current = divRoot;

          panelRootRef.current?.unmount();
          panelRootRef.current = createRoot(root);
        }

        panelRootRef.current.render(children);
      },
      ...props,
    });

    return () => {
      search.destroy();
    };
  }, [props]);

  return <div ref={containerRef} />;
}
