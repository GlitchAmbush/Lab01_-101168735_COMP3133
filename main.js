const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const writerCA = createCsvWriter({
    path: 'canada.txt',
    header: [
        {id: 'country', title: 'country'},
        {id: 'year', title: 'year'},
        {id: 'population', title: 'population'}
    ]
})
const writerUS = createCsvWriter({
    path: 'usa.txt',
    header: [
        {id: 'country', title: 'country'},
        {id: 'year', title: 'year'},
        {id: 'population', title: 'population'}
    ]
})

const arrayCA = [];
const arrayUS = [];

fs.unlink('canada.txt', (err) => {
    if (err) {
        console.error('canada.txt does not exist')
        return
    }

    console.log('canada.txt successfully deleted')
})

fs.unlink('usa.txt', (err) => {
    if (err) {
        console.error('usa.txt does not exist')
        return
    }

    console.log('usa.txt successfully deleted')
})


fs.createReadStream('input_countries.csv')
    .pipe(csv())
    .on('data', (data) => {
        if (data.country == 'Canada') {
            arrayCA.push(data);
        }

        if (data.country == 'United States') {
            arrayUS.push(data);
        }
    })
    .on('end', () => {
        writerCA
            .writeRecords(arrayCA)
            .then(() => console.log('CSV file for Canada was written successfully'));

        writerUS
            .writeRecords(arrayUS)
            .then(() => console.log('CSV file for USA was written successfully'));
    });
