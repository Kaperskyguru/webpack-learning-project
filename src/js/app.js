import RandomStringGenerator from '../utilities/random';
import copyToClipboard from '../utilities/copyToClipboard'
import securityIllustration from '../images/security.svg';
import '../scss/style.scss';
import passwordIcon from '../images/lock-solid.svg';
import copyIcon from '../images/copy-solid.svg';

const copyIconElem = document.getElementById('copy_icon');
document.getElementById('password_icon').src = passwordIcon;
document.getElementById('header_image').src = securityIllustration;


copyIconElem.src = copyIcon;
copyIconElem.onclick = () => {
    copyToClipboard(document.getElementById('random_password').innerText);
    alert('Copied to clipboard!');
};

document.addEventListener("DOMContentLoaded", function () {
    const randomStringGenerator = new RandomStringGenerator();
    let randomString = `Random String <span>${randomStringGenerator.generate()}</span>`
    // window.setTimeout(function () {
    document.getElementById('random_password').innerHTML = randomString;
    // }, 1000);
});