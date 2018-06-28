import React from 'react';
import { puppeteer } from 'puppeteer';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

describe('Index', () => {
  expect.extend({ toMatchImageSnapshot });
  const puppeteer = require('puppeteer');

  let browser;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });

  it('there is no visual regression', async () => {
    const page = await browser.newPage();
    await page.goto('http://localhost:8080/');
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot();
  });

  afterAll(async () => {
    await browser.close();
  });
});
