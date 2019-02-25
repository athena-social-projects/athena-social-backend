import {createError} from "apollo-errors";

// Any internal errors
export const UnknownError = createError('UnknownError', {
    message: 'An unknown error has occured.'
});

// User should be logged in (but isn't)
export const UnauthorizedError = createError('UnauthorizedError', {
    message: 'You must login to do that.'
});

// User already logged in, but is a dumbass.
export const AlreadyLoggedInError = createError('AlreadyLoggedInError', {
    message: "You're already logged in."
});

// Regular user is trying to perform an admin action
export const ForbiddenError = createError('ForbiddenError', {
    message: 'Unauthorized action.'
});

// Regular user is trying to perform an admin action
export const InvalidEmail = createError('ForbiddenError', {
    message: 'Unauthorized action.'
});

