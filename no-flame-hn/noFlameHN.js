const COMMENTS_THRESHOLD = 30;
const SCORE_PER_COMMENT_MINIMUM = 1.25;


const submissions = document.getElementsByClassName('athing');

removePathsToDiscussion(submissions);


// There can be various workarounds to get to a story. We try to remove them.
// CSS classes are added to different groups of components to mark them.
function removePathsToDiscussion(submissions) {
    for (const submission of submissions) {
        if (isControversial(submission) && !isShowHN(submission)) {
            markContainersControversial(submission);

            const subtext = getSubtext(submission);

            // We remove any links to the discussion page found in the subtext.
            const allDiscussionLinks = subtext.querySelectorAll("a[href*='item?id=']");
            for (const link of allDiscussionLinks) {
                removeLink(link, 'controversial-general-link');
            }

            // We mark known links to the discussion individually.
            const commentsDiscussionLink = subtext.querySelector("span.subline > .controversial-general-link");
            commentsDiscussionLink.classList.add('controversial-comments-link');

            const ageLink = subtext.querySelector("span.age > .controversial-general-link");
            ageLink.classList.add('controversial-age-link');

            // Through a user link it is possible to get to the discussion page.
            const userLink = subtext.querySelector("a[href*='user?id=']")
            removeLink(userLink, 'controversial-user-link', 'controversial-general-link');

            // Can also get to the discussion page using the from?site= page.
            const fromLink = submission.querySelector("span.sitebit > a");
            removeLink(fromLink, 'controversial-from-link', 'controversial-general-link');
        }
    }
}

function getSubtext(submission) {
    return submission.nextSibling.querySelector("td.subtext");
}

function isControversial(submission) {
    const subtext = getSubtext(submission);

    const score = getScore(subtext);
    const commentsTotal = getCommentsTotal(subtext);

    if (commentsTotal === 0) {
        return false;
    }

    const scorePerComment = score / commentsTotal;

    return commentsTotal > COMMENTS_THRESHOLD
        && scorePerComment < SCORE_PER_COMMENT_MINIMUM;
}

function getScore(subtext) {
    const scoreText = subtext.getElementsByClassName('score')[0].textContent;
    return parseInt(scoreText.split(' ')[0]);
}


function getCommentsTotal(subtext) {
    const links = subtext.getElementsByTagName('a');
    const commentsText = links[links.length - 1].textContent;
    if (commentsText !== 'discuss') {
        return parseInt(commentsText.split(' ')[0]);
    }
    return 0;
}


function markContainersControversial(submission) {
    const subtextContainer = submission.nextSibling;

    submission.classList.add('controversial-title');
    subtextContainer.classList.add('controversial-subtext');
}


function isShowHN(submission) {
    const postTitle = submission.querySelector("td.title > span.titleline > a").textContent;

    return postTitle.startsWith("Show HN: ");
}


function removeLink(linkElement, ...classes) {
    if (linkElement) {
        linkElement.removeAttribute('href');
        linkElement.classList.add(...classes);
    }
}
