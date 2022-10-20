import { removePathsToDiscussion } from './linkRemoval.js';


for (const subline of document.getElementsByClassName('subline')) {
    wrapSubmission(subline);
}

const submissions = document.getElementsByClassName('submission');

removePathsToDiscussion(submissions);


// Put each submission (title, subline, etc.) in a container div. Simplifies
// stuff throughout.
function wrapSubmission(subline) {
    const sublineContainer = subline.parentNode.parentNode;
    const titleContainer = sublineContainer.previousSibling;
    const spacer = sublineContainer.nextElementSibling;

    let containingDiv = document.createElement('div');
    containingDiv.classList.add('submission')
    sublineContainer.parentNode.insertBefore(containingDiv, titleContainer)

    containingDiv.appendChild(titleContainer);
    containingDiv.appendChild(sublineContainer);
    containingDiv.appendChild(spacer);
}
