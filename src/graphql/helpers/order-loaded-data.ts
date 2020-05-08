type Item = { id: string };
type ItemMap<T> = { [key: string]: T };

interface Opts<T> {
  ids: string[];
  items: T[];
}

/** Helper order dataloader response based on IDs */
function orderLoaderData<T extends Item>(opts: Opts<T>): T[] {
  const { ids, items } = opts;

  // Given list of items, create map in format { id: item }
  const itemMap: ItemMap<T> = items.reduce((itemMap, item) => ({
    ...itemMap,
    [item.id]: item,
  }), {});

  // Returns the same list, but now matches order of ids
  return ids.map(id => itemMap[id]);
}

export default orderLoaderData;
