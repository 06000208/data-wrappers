# data-wrappers

Simple instanced defaulting for flat javascript objects.

This package provides:

- a `FlatDataWrapper` class which wraps your objects, referred to as data. This class takes a parameter for a set of default properties, referred to as a defaults object. It provides those defaults, your data, and a [proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) as properties. Accessing properties using the wrapper's proxy will seamlessly "fall back" to the provided defaults when the property is undefined, while setting properties, keys, methods, and other use works as normal.

- Classes which act as key/value data stores, `FlatDataStore` and `AsyncFlatDataStore`. For any key, they always return an instance of the data wrapping classes, and they can store your data however you wish using an adapter (by default, a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) is used).

⚠️ "Flat" refers to operating on flat or single-depth objects, and means property access for nested objects won't be proxied, and properties which are arrays or objects will be+ overwritten with new values rather than deep merging when using a wrapper's merge() or a data store's patch()

Example use cases:

- Simple settings for apps/browser extensions
- Javascript code where users have associated user data or settings

## Planned

- [ ] Documentation
- [ ] Deep data wrappers & data stores
    - Unfortunately writing a proxy for this isn't a trival problem, and would introduce a dependency on [deepmerge](https://www.npmjs.com/package/deepmerge)
