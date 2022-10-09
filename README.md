# no-flame-hn
Remove discussion links to more 'controversial' Hacker News items.

Controversional is defined as an item with at least X comments, and a score/comment ratio < Y. 

X and Y are defined in `main.js`.

## To-do

- [x] Can't access an item's discussion if deemed 'controversial'. This includes comments & age links.
- [x] Move comments threshold and ratio minimum to constants file.
- [x] Move html stuff to separate folder.
- [x] Add .css file that changes affected items.
- [ ] Figure out how to style them more.
- [ ] Separate controversial comments link and timestamp link styling.
- [ ] Maybe keep 'click link' cursor, rather than it switching to just text cursor, and point to empty/doing nothing link.
- [ ] Add tests.
- [ ] Handle Ask/Show HNs differently (they tend to have more comments even when not controversial, driving the 'normal' ratio down). 
- [ ] Mess around with ratio/comments threshold. 
- [ ] Make into extension.
