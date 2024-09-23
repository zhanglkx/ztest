// document.getElementById('textBox').addEventListener('beforecopy', (event) => {
//     console.log('beforecopy event triggered');
// });

// document.getElementById('textBox').addEventListener('copy', (event) => {
//     console.log('copy event triggered');
// });

// document.getElementById('textBox').addEventListener('beforecut', (event) => {
//     console.log('beforecut event triggered');
// });

// document.getElementById('textBox').addEventListener('cut', (event) => {
//     console.log('cut event triggered');
// });

// document.getElementById('textBox').addEventListener('beforepaste', (event) => {
//     console.log('beforepaste event triggered');
// });

// document.getElementById('textBox').addEventListener('paste', (event) => {
//     console.log('paste event triggered');
// });

// document.getElementById('copyButton').addEventListener('click', () => {
//     const textBox = document.getElementById('textBox');
//     textBox.select();
//     navigator.clipboard.writeText(textBox.value).then(() => {
//         // alert('Text copied to clipboard');
//     }).catch(err => {
//         console.error('Failed to copy text: ', err);
//     });
// });

// document.getElementById('cutButton').addEventListener('click', () => {
//     const textBox = document.getElementById('textBox');
//     textBox.select();
//     navigator.clipboard.writeText(textBox.value).then(() => {
//         textBox.value = '';
//         // alert('Text cut to clipboard');
//     }).catch(err => {
//         console.error('Failed to cut text: ', err);
//     });
// });

// document.getElementById('pasteButton').addEventListener('click', () => {
//     navigator.clipboard.readText().then(text => {
//         document.getElementById('textBox').value = text;
//         // alert('Text pasted from clipboard');
//     }).catch(err => {
//         console.error('Failed to read text from clipboard: ', err);
//     });
// });

const textBox = document.getElementById('textBox');

textBox.addEventListener('beforecopy', (event) => {
    console.log('beforecopy event triggered');
});

textBox.addEventListener('copy', (event) => {
    console.log('copy event triggered');
});

textBox.addEventListener('beforecut', (event) => {
    console.log('beforecut event triggered');
});

textBox.addEventListener('cut', (event) => {
    console.log('cut event triggered');
});

textBox.addEventListener('beforepaste', (event) => {
    console.log('beforepaste event triggered');
});

textBox.addEventListener('paste', (event) => {
    console.log('paste event triggered');
});

document.getElementById('copyButton').addEventListener('click', () => {
    textBox.select();
    document.execCommand('copy');
});

document.getElementById('cutButton').addEventListener('click', () => {
    textBox.select();
    document.execCommand('cut');
});

document.getElementById('pasteButton').addEventListener('click', () => {
    textBox.focus();
    document.execCommand('paste');
});
