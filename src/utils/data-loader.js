import testData from '../data/products.json';

export default class DataLoader {
    async getTestData() {
        return testData;
    }

    async getData(url) {
        const res = await fetch(url);
        const data = await res.json();
        return await data;
    }
}