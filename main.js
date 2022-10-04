import * as constants from './constants.js';

removeControversialDiscussionLinks(
    document.getElementsByClassName('subline')
);


function removeControversialDiscussionLinks(sublines) {
    for (let subline of sublines) {
        const score = getScore(subline);
        const commentsTotal = getCommentsTotal(subline);

        if (isControversial(score, commentsTotal)) {
            let discussionLinks = getDiscussionLinks(subline);

            removeLinks(discussionLinks);
        }
    }
}


function getScore(item) {
    let scoreText = item.getElementsByClassName('score')[0].textContent;
    return parseInt(scoreText.split(' ')[0]);
}


function getCommentsTotal(item) {
    let links = item.getElementsByTagName('a');
    let commentsText = links[links.length - 1].textContent;
    if (commentsText !== 'discuss') {
        return parseInt(commentsText.split(' ')[0]);
    }
    return 0;
}


function isControversial(score, nComments) {
    const ratio = score / nComments;

    return nComments > constants.COMMENTS_THRESHOLD
        && ratio < constants.RATIO_MINIMUM;
}


function getDiscussionLinks(item) {
    let links = item.getElementsByTagName('a');
    let discussionLinks = [];
    for (let link of links) {
        if (/item\?id=\d+$/.test(link.href)) {
            discussionLinks.push(link);
        }
    }
    return discussionLinks;
}


function removeLinks(linkElements) {
    for (let linkElement of linkElements) {
        linkElement.parentNode.replaceChild(
            document.createTextNode(linkElement.textContent),
            linkElement
        );
    }
}
