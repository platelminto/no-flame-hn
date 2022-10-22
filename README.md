# no-flame-hn
Remove discussion links to more 'controversial' Hacker News items, leaving the item itself accessible.

Controversial is defined as an item with at least X comments, and a score/comment ratio < Y. 

X and Y are defined at the top of the js file.

Self posts (e.g. Ask HNs) will still be accessible through the main submission link. This is intended, since the content of a self post is the discussion page. 

Show HNs are also always accessible. 

## To-do

- [x] Can't access an item's discussion if deemed 'controversial'. This includes comments & age links.
- [x] Add .css file that changes affected items.
- [x] Figure out how to style them more.
- [x] Separate controversial comments link and timestamp link styling.
- [x] Maybe keep 'click link' cursor, rather than it switching to just text cursor, and point to empty/doing nothing link.
- [x] ~~Add tests.~~ Eh we don't need them.
- [x] Make into extension.
- [ ] Mess around with ratio/comments threshold. 
- [ ] Mess around with styling based on usage.
- [ ] Make extension configurable (hide/not-hides, pre-defined styles on/off)
- [ ] Make extension per-CSS-class configurable.
