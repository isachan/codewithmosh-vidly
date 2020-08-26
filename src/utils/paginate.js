import _ from "lodash";

//pagination on client side
//server-side is another whole new thing by itself
export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
  // _(items) << convert items array to a lodash wrapper (object)
  // _.slice(items, startIndex)
  // _.take()
  // .value << convert back to a regular array
}
