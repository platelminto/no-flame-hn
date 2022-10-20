import * as constants from "./constants.js";

// There can be various workarounds to get to a story. We try to remove them.
// CSS classes are added to different groups of components to mark them.
function removePathsToDiscussion(submissions) {
    for (const submission of submissions) {
        if (isControversial(submission)) {
            markContainersControversial(submission);

            const subline = getSubline(submission);

            // We remove any links to the discussion page found in the subline.
            const allDiscussionLinks = subline.querySelectorAll("a[href*='item?id=']");
            for (const link of allDiscussionLinks) {
                removeLink(link, 'controversial-general-link');
            }

            // We mark known links to the discussion individually.
            const commentsDiscussionLink = subline.querySelector(":scope > .controversial-general-link");
            commentsDiscussionLink.classList.add('controversial-comments-link');

            const ageLink = subline.querySelector("span.age > .controversial-general-link");
            ageLink.classList.add('controversial-age-link');

            // Through a user link it is possible to get to the discussion page.
            const userLink = subline.querySelector("a[href*='user?id=']")
            removeLink(userLink, 'controversial-user-link', 'controversial-general-link');

            // Can also get to the discussion page using the from?site= page.
            const fromLink = submission.querySelector("tr.athing span.sitebit > a");
            removeLink(fromLink, 'controversial-from-link', 'controversial-general-link');
        }
    }
}

function getSubline(submission) {
    return submission.querySelector("tr > td.subtext > span.subline");
}

function isControversial(submission) {
    const subline = getSubline(submission);

    const score = getScore(subline);
    const commentsTotal = getCommentsTotal(subline);

    if (commentsTotal === 0) {
        return false;
    }

    const scorePerComment = score / commentsTotal;

    return commentsTotal > constants.COMMENTS_THRESHOLD
        && scorePerComment < constants.SCORE_PER_COMMENT_MINIMUM;
}

function getScore(subline) {
    const scoreText = subline.getElementsByClassName('score')[0].textContent;
    return parseInt(scoreText.split(' ')[0]);
}


function getCommentsTotal(subline) {
    const links = subline.getElementsByTagName('a');
    const commentsText = links[links.length - 1].textContent;
    if (commentsText !== 'discuss') {
        return parseInt(commentsText.split(' ')[0]);
    }
    return 0;
}

// Mark the containers of the submission (the whole submission, just the title,
// the subline) as controversial.
function markContainersControversial(submission) {
    const sublineContainer = submission.querySelector("tr > td.subtext");
    const titleContainer = submission.children[0];

    submission.classList.add('controversial-submission');
    titleContainer.classList.add('controversial-title');
    sublineContainer.classList.add('controversial-subline');
}


// Unused for now, might be useful for doing stuff with Ask HNs/etc.
function isSelfPost(submission) {
    const absoluteUrlRegex = new RegExp('^(?:[a-z+]+:)?//', 'i');
    const postLink = submission.querySelector("tr.athing > td.title > span.titleline > a.href");

    return absoluteUrlRegex.test(postLink.href);
}


function removeLink(linkElement, ...classes) {
    if (linkElement) {
        linkElement.setAttribute("href", "");
        linkElement.classList.add(...classes);
    }
}


export { removePathsToDiscussion };
