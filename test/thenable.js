export default function thenable(object) {
    if (!object) {
        return false
    }
    return !!object.then && typeof object.then === 'function'
}
