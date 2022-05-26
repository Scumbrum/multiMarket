export function getCategoryIndex(categories, selected) {
    const current = window.location.pathname.split("/")[1]
    let index = 0
    if(current==="cart" || current==="") {
        return index
    }
    if(categories[selected]&&categories[selected].name===current) {
        return selected
    }
    for(let category of categories) {
        if(category.name === current) {
            break
        }
        index++
    }
    return index!==categories.length ? index : -1
}