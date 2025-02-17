export default function transformClass<T extends object, U extends object>(source: T): U {
    let transformed: U = {} as U
  
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        if (typeof source[key] === 'string' && key !== "id" && key !== "name") {
          transformed[key] = new Date(source[key]);
        } else {
          transformed[key] = source[key];
        }
      }
    }
    
    return transformed
  }