type OrderLoaderRes<T> = (ids: string[], items: T[]) => T[];
type ItemMap<T> = { [key: string]: T };

/** Helper for dataloader */
function orderLoaderRes<T>({
  data:
}): T {
  const itemMap: ItemMap<T> = items.reduce((itemMap, item) => ({
    ...itemMap,
    [item.id]: item,
  }), {});

  return ids.map(id => itemMap[id]);
};

export default orderLoaderRes;
