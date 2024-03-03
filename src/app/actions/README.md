## What's up with actions?

All actions are meant to be executed server side. Actions stand in place of any type of proper API
route. They are used to access the database. They come in two flavors.

### Unprotected Action

An action that is unprotected does not perform any authentication checks before performing it's
action. These are _usually_ related to login/logout/ect.

### Protected Action

Protected actions on the other hand require an active session and usually for the user to have a
permission or two to perform the action.

These do NOT make use of any middlewere because prisma doesn't run there.