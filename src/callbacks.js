
function direct(objects, action) {
    return objects.filter((obj)=>!!obj[action] &&
            typeof obj[action] === 'function')
        .map((obj)=>obj[action])
}

function nested(objects, action) {
    const index = action.indexOf('.')
    if (index === -1) {
        return []
    }
    const current = action.substr(0, index)
    const next = objects.filter(function(object){
        return object[current] && typeof object[current] !== 'function'
    }).map(function(object){return object[current]})
    return callbacks(next, action.substr(index + 1))
}

export default function callbacks(objects, action) {
    return direct(objects, action).concat(nested(objects, action))
}
