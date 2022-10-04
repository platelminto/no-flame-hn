# no-flame-hn
Remove discussion links to more 'controversial' Hacker News items.

Controversional is defined as an item with at least X comments, and a score/comment ratio < Y. 

X and Y are defined in `main.js`.

## To-do

- [x] Can't access an item's discussion if deemed 'controversial'. This includes comments & age links.
- [x] Move comments threshold and ratio minimum to constants file.
- [x] Move html stuff to separate folder.
- [ ] Add tests.
- [ ] Add .css file that changes affected items (lighten the whole entry?).
- [ ] Handle Ask/Show HNs differently (they tend to have more comments even when not controversial, driving the 'normal' ratio down). 
- [ ] Mess around with ratio/comments threshold. 
- [ ] Make into extension.
