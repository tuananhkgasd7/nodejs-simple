const { expect } = require("chai");
const { assert } = require("console");
const sinon = require("sinon");

describe('Test sql connection', () => {
    it('Should return string if file exist', async () => {
        const email = require('../../config/email');
        const fs = require('fs');
        const ejs = require('ejs');
        const templateVar = require('../data/email/TemplateVar.json');
        const templatePath = 'test template path';
        
        const stubExist = sinon.stub(fs, 'existsSync');
        const stubReadFile = sinon.stub(fs, 'readFileSync');
        const stubRender = sinon.stub(ejs, 'render');

        stubExist.withArgs(templatePath).returns(true);
        stubReadFile.withArgs(templatePath).returns('file not empty');
        stubRender.returns('html string');

        expect(email.bindDataTemplate(templatePath, {product: templateVar})).to.be.a('string');;
    });

    it('Should send mail', async () => {
        const nodemailer = require('nodemailer');
        const stubNodemailer = sinon.stub(nodemailer, 'createTransport')
    });
})