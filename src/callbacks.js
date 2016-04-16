export default function callbacks(objects, action) {
    if (action.indexOf('.') === -1 ){
        return objects.filter(function(obj) {return !!obj[action] && typeof obj[action] == 'function'})
        .map(function(obj) {return obj[action]})
    } else {
        const index = action.indexOf('.')
        const current = action.substr(0, index)
        const next = objects.filter(function(object){
            return object[current] && typeof object[current] !== 'function'
        }).map(function(object){return object[current]})
        return callbacks(next, action.substr(index + 1))
    }
}
