# Yaux

Yaux is a very lightweight dispatcher that provides a backing action processing
for Yaux-React (and future Yaux-Vue) implementations.

It exports one main function - `dispatch`, that recives
the lists of *action factories*, *stores* and current
*application state*, and returns a new state or a promise
that will resolve to the new state.
