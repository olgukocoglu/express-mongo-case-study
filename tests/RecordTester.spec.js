const supertest = require('supertest');
const app = require('../app');
const request = supertest(app)
const mongoose = require('mongoose');

describe('Tests for RecordController', () => {   
    test('Success Request', done => {
        request.post('/GetRecords')
            .send({
                startDate: '2016-01-26',
                endDate: '2018-02-02',
                minCount: 2700,
                maxCount: 3000
            })
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });

    test('Error Code -1: Start date missing', done => {
        request.post('/GetRecords')
            .send({
                endDate: '2018-02-02',
                minCount: 2700,
                maxCount: 3000
            })
            .then(response => {
                expect(response.body.code).toBe(-1);
                done();
            });
    });

    test('Error Code -2: Invalid start date', done => {
        request.post('/GetRecords')
            .send({
                startDate: '2016-01-26-25',
                endDate: '2018-02-02',
                minCount: 2700,
                maxCount: 3000
            })
            .then(response => {
                expect(response.body.code).toBe(-2);
                done();
            });
    });

    test('Error Code -3: End date missing', done => {
        request.post('/GetRecords')
            .send({
                startDate: '2016-01-26',
                minCount: 2700,
                maxCount: 3000
            })
            .then(response => {
                expect(response.body.code).toBe(-3);
                done();
            });
    });

    test('Error Code -4: Invalid end date', done => {
        request.post('/GetRecords')
            .send({
                startDate: '2016-01-26',
                endDate: "dasdasdsa",
                minCount: 2700,
                maxCount: 3000
            })
            .then(response => {
                expect(response.body.code).toBe(-4);
                done();
            });
    });

    test('Error Code -5: Start date is later than end date', done => {
        request.post('/GetRecords')
            .send({
                startDate: '2019-01-26',
                endDate: '2018-02-02',
                minCount: 2700,
                maxCount: 3000
            })
            .then(response => {
                expect(response.body.code).toBe(-5);
                done();
            });
    });

    test('Error Code -6: Min count missing', done => {
        request.post('/GetRecords')
            .send({
                startDate: '2016-01-26',
                endDate: '2018-02-02',
                maxCount: 3000
            })
            .then(response => {
                expect(response.body.code).toBe(-6);
                done();
            });
    });

    test('Error Code -7: Invalid min count', done => {
        request.post('/GetRecords')
            .send({
                startDate: '2016-01-26',
                endDate: '2018-02-02',
                minCount: -500,
                maxCount: 3000
            })
            .then(response => {
                expect(response.body.code).toBe(-7);
                done();
            });
    });

    test('Error Code -8: Max count missing', done => {
        request.post('/GetRecords')
            .send({
                startDate: '2016-01-26',
                endDate: '2018-02-02',
                minCount: 2700,
            })
            .then(response => {
                expect(response.body.code).toBe(-8);
                done();
            });
    });

    test('Error Code -9: Invalid max count', done => {
        request.post('/GetRecords')
            .send({
                startDate: '2016-01-26',
                endDate: '2018-02-02',
                minCount: 2700,
                maxCount: "sdsada"
            })
            .then(response => {
                expect(response.body.code).toBe(-9);
                done();
            });
    });

    test('Error Code -10: Min count is greater than max count', done => {
        request.post('/GetRecords')
            .send({
                startDate: '2016-01-26',
                endDate: '2018-02-02',
                minCount: 3500,
                maxCount: 3000
            })
            .then(response => {
                expect(response.body.code).toBe(-10);
                done();
            });
    });

    afterAll(async () => {
        await mongoose.connection.close()
    })
  })