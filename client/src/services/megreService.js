export function mergeObjects(newObj, fullObj) {
    return {
      ...fullObj,
      ...Object.fromEntries(
        Object.entries(newObj).map(([key, value]) => {
          return [key, value || fullObj[key]];
        })
      )
    };
  }
  