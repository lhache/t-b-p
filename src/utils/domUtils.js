const createElementWithId = (elementType, attributes) => {
  let el = document.createElement(elementType)
  el.setAttribute('id', attributes.id)
  document.body.appendChild(el);

  return el
}

export const getOrCreateElementById = (elementType, attributes) => {
  // create the element if it's not there
  // mainly a temp hack for development setup
  const wrapper = document.getElementById(attributes.id) || createElementWithId(elementType, attributes)

  return wrapper
}
