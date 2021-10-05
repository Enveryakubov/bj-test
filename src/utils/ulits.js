export function capitalize(word) {
    const loweredCase = word.toLowerCase();
    return word[0].toUpperCase() + loweredCase.slice(1);
  }

export let debounce = (fn, ms) => {
    let timeout;
    return function(){ 
      const func = () => {
          fn.apply(this, arguments)}
      clearTimeout(timeout)
      timeout = setTimeout(func, ms)
    }   
  }