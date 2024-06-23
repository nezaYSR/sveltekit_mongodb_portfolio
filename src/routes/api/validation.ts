import type { Profile } from "./model"

export  function validateProfileFields(body: Profile): boolean {
    if (typeof body.name !== 'string') {
        return false;
    }
    if (typeof body.description !== 'string') {
        return false;
    }
    if (typeof body.reference !== 'string') {
        return false;
    }
    if (typeof body.level !== 'number') {
        return false;
    }
    return true
}