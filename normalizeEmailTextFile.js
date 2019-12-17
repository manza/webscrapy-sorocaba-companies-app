const readline = require('readline');
const fs = require('fs');

const emails = [];

const readInterface = readline.createInterface({
    input: fs.createReadStream('Y:\\MailChimp\\emails-sorocaba.com.br.txt')
});

readInterface
.on('line', function(line) {
    const emailFormatted = line.trim().toLocaleLowerCase();
    if (emails.indexOf(emailFormatted) === -1) {
        emails.push(emailFormatted);
    }
})
.on('close', function(line) {
    console.log(emails.length + ' emails normalized.');
    emails.forEach(email => {
        console.log(email);
    });
});