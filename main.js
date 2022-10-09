import * as constants from './constants.js';

removeControversialDiscussionLinks(
    document.getElementsByClassName('subline')
);


function removeControversialDiscussionLinks(sublines) {
    for (let subline of sublines) {
        wrapSubmission(subline)
        const score = getScore(subline);
        const commentsTotal = getCommentsTotal(subline);

        if (isControversial(score, commentsTotal)) {
            markControversialSubline(subline)

            let discussionLinks = getDiscussionLinks(subline);
            removeLinks(discussionLinks);
        }
    }
}


function wrapSubmission(subline) {
    const sublineContainer = subline.parentNode.parentNode;
    const titleContainer = sublineContainer.previousSibling;

    let containingDiv = document.createElement('div');
    sublineContainer.parentNode.insertBefore(containingDiv, titleContainer)

    containingDiv.appendChild(titleContainer);
    containingDiv.appendChild(sublineContainer);
}


function getScore(item) {
    const scoreText = item.getElementsByClassName('score')[0].textContent;
    return parseInt(scoreText.split(' ')[0]);
}


function getCommentsTotal(item) {
    const links = item.getElementsByTagName('a');
    const commentsText = links[links.length - 1].textContent;
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


function markControversialSubline(subline) {
    const sublineContainer = subline.parentNode.parentNode;
    const titleContainer = sublineContainer.previousElementSibling;
    const containingDiv = titleContainer.parentNode;

    containingDiv.classList.add('controversial-submission');
    titleContainer.classList.add('controversial-title');
    sublineContainer.classList.add('controversial-subline');
}


function getDiscussionLinks(item) {
    const links = item.getElementsByTagName('a');
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
        const linkText = document.createTextNode(linkElement.textContent)
        const linkSpan = document.createElement("span")
        linkSpan.classList.add('controversial-comments-text')

        linkSpan.appendChild(linkText)

        linkElement.parentNode.replaceChild(
            linkSpan,
            linkElement
        );
    }
}
